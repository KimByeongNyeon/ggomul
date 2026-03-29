import { Injectable } from '@nestjs/common';
import { GithubService } from 'src/modules/github/service/github.service';
import { BaekjoonService } from 'src/modules/baekjoon/service/baekjoon.service';
import { DashboardResponse } from '../dto/dashboard.dto';
import {
  GithubReposResponse,
  GithubCommitsResponse,
  GithubContributionsResponse,
} from 'src/modules/github/dto/github-my-dto';

@Injectable()
export class DashboardFacade {
  constructor(
    private readonly githubService: GithubService,
    private readonly baekjoonService: BaekjoonService,
  ) {}

  async getDashboard(
    githubUsername: string,
    baekjoonHandle: string,
  ): Promise<DashboardResponse> {
    const [stats, languages, contributions, userStats, tierStats] =
      await Promise.all([
        this.githubService.getStats(githubUsername),
        this.githubService.getLanguageStats(githubUsername),
        this.githubService.getContributionStats(githubUsername),
        this.baekjoonService.getUserStats(baekjoonHandle),
        this.baekjoonService.getProblemTierStats(baekjoonHandle),
      ]);

    return {
      github: { stats, languages, contributions },
      baekjoon: { userStats, tierStats },
    };
  }

  async getMyRepos(username: string): Promise<GithubReposResponse> {
    return this.githubService.getMyRepos(username);
  }

  async getMyCommits(username: string): Promise<GithubCommitsResponse> {
    return this.githubService.getMyCommits(username);
  }

  async getMyContributions(
    username: string,
  ): Promise<GithubContributionsResponse> {
    return this.githubService.getMyContributions(username);
  }
}
