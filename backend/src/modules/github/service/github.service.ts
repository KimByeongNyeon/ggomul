import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GithubApi } from '../infrastructure/github.api';
import axios from 'axios';
import {
  GitHubContributionStat,
  GithubStats,
} from 'src/modules/dashboard/dto/dashboard.dto';
import { GithubLanguageStat } from '../dto/github-language-stat-dto';
import {
  GithubRepoItem,
  GithubCommitItem,
  GithubReposResponse,
  GithubCommitsResponse,
  GithubContributionsResponse,
  GithubLanguageStatItem,
  GithubContributionDay,
} from '../dto/github-my-dto';

/**
 * 서비스 내부에 외부 API 통신 로직을 넣지 않고 외부에 어댑터 계층을 두어
 * 외부 API에 서비스가 직접 의존하지 않도록 설계함
 */
@Injectable()
export class GithubService {
  // 생성자에 외부 API를 가져오기만 할 뿐 외부 API가 어떻게 생겼는 지는 모름
  constructor(private readonly githubApi: GithubApi) {}

  async getStats(username: string): Promise<GithubStats> {
    // 생성자에서 가져온 githubApi의 getUser 메소드를 사용하여 user 정보 가져오기
    try {
      const user = await this.githubApi.getUser(username);
      return {
        login: user.login,
        repoCount: user.public_repos,
        followers: user.followers,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new NotFoundException('깃허브 유저를 찾을 수 없어요..ㅠㅠ');
      }
      throw new InternalServerErrorException(
        '깃 허브 API 불러오는 중에 오류가 발생했어요..ㅠㅠ',
      );
    }
  }

  async getLanguageStats(username: string): Promise<GithubLanguageStat[]> {
    // repository 정보를 가져오는 함수 호출
    const repos = await this.githubApi.getRepos(username);
    // 언어 상태를 뽑아주기 위한 key, value 형태의 객체 생성
    const languageStats: Record<string, number> = {};
    // 레포지토리의 언어 정보를 가져오기 위한 새로운 배열 생성
    const languagePromises = repos.map((repo) =>
      // 현재 가져온 repository의 이름을 활용하여 해당 repositry 언어 비율 추출
      this.githubApi.getRepoLanguages(username, repo.name),
    );
    // 순차적으로 레포지토리를 돌면서 언어를 가져오는 것이 아닌 동시에 실행하기 위한 Promise.all 사용
    const languageList = await Promise.all(languagePromises);
    // 언어 리스트를 순회하면서 {언어 : 작성 수}의 형태를 갖는 배열 생성
    for (const languages of languageList) {
      for (const [lang, bytes] of Object.entries(languages)) {
        languageStats[lang] = (languageStats[lang] || 0) + bytes;
      }
    }
    const totalBytes = Object.values(languageStats).reduce(
      (sum, bytes) => sum + bytes,
      0,
    );

    const result = Object.entries(languageStats)
      .map(([language, bytes]) => ({
        language,
        bytes,
        percent: Number(((bytes / totalBytes) * 100).toFixed(1)),
      }))
      .sort((a, b) => b.percent - a.percent);
    // [{언어: 작성 수}]의 형태로 반환
    return result;
  }

  async getContributionStats(
    username: string,
  ): Promise<GitHubContributionStat> {
    const data = await this.githubApi.getContributions(username);
    const calendar =
      data.data.user.contributionsCollection.contributionCalendar;

    const weeks = calendar.weeks;
    const days = weeks.flatMap((week) => week.contributionDays);

    const totalCommits = days.reduce(
      (sum, day) => sum + day.contributionCount,
      0,
    );

    let currentStreak = 0;

    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].contributionCount > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    return { totalCommits, currentStreak, heatmap: days };
  }

  async getMyRepos(username: string): Promise<GithubReposResponse> {
    const repos = await this.githubApi.getRepos(username);

    const languagePromises = repos.map((repo) =>
      this.githubApi.getRepoLanguages(username, repo.name),
    );
    const languageList = await Promise.all(languagePromises);

    const languageBytes: Record<string, number> = {};
    for (const languages of languageList) {
      for (const [lang, bytes] of Object.entries(languages)) {
        languageBytes[lang] = (languageBytes[lang] || 0) + bytes;
      }
    }

    const totalBytes = Object.values(languageBytes).reduce(
      (sum, bytes) => sum + bytes,
      0,
    );

    const languageStats: GithubLanguageStatItem[] = Object.entries(
      languageBytes,
    )
      .map(([language, bytes]) => ({
        language,
        bytes,
        percent: Number(((bytes / totalBytes) * 100).toFixed(1)),
      }))
      .sort((a, b) => b.percent - a.percent);

    const repoItems: GithubRepoItem[] = repos.map((repo) => ({
      name: repo.name,
      html_url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at,
    }));

    return { repos: repoItems, languageStats };
  }

  async getMyCommits(username: string): Promise<GithubCommitsResponse> {
    const data = await this.githubApi.getRecentCommits(username);

    const commits: GithubCommitItem[] = data.items.map((item) => ({
      repo: item.repository.full_name,
      message: item.commit.message,
      date: item.commit.committer.date,
    }));

    return { commits };
  }

  async getMyContributions(
    username: string,
  ): Promise<GithubContributionsResponse> {
    const data = await this.githubApi.getContributions(username);
    const calendar =
      data.data.user.contributionsCollection.contributionCalendar;

    const days: GithubContributionDay[] = calendar.weeks.flatMap(
      (week) => week.contributionDays,
    );

    const totalCommits = days.reduce(
      (sum, day) => sum + day.contributionCount,
      0,
    );

    const activeDays = days.filter((day) => day.contributionCount > 0).length;

    let currentStreak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].contributionCount > 0) currentStreak++;
      else break;
    }

    let longestStreak = 0;
    let streak = 0;
    for (const day of days) {
      if (day.contributionCount > 0) {
        streak++;
        if (streak > longestStreak) longestStreak = streak;
      } else {
        streak = 0;
      }
    }

    return {
      totalCommits,
      activeDays,
      longestStreak,
      currentStreak,
      heatmap: days,
    };
  }
}
