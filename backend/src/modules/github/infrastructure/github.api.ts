import { Inject, Injectable } from '@nestjs/common';
import { GithubUserDto } from '../dto/github-user-dto';
import { GithubRepoDto } from '../dto/github-repo-dto';
import { GithubLanguageDto } from '../dto/github-language.dto';
import { GithubContributionDto } from '../dto/github-commit-dto';
import type { AxiosInstance } from 'axios';

@Injectable()
export class GithubApi {
  constructor(
    @Inject('GITHUB_CLIENT')
    private readonly githubClient: AxiosInstance,
  ) {}

  //   private readonly graphqlUrl = 'https://api.github.com/graphql';
  // 깃 허브 유저를 가져오기 위한 함수 Promise<response> 형식의 반환 값을 가짐
  async getUser(username: string): Promise<GithubUserDto> {
    const res = await this.githubClient.get<GithubUserDto>(
      `/users/${username}`,
    );
    return res.data;
  }
  // 깃 허브 레포지토리 정보를 가저오기 위한 함수 Promise<response[]> 형식의 반환 값을 가짐
  async getRepos(username: string): Promise<GithubRepoDto[]> {
    const res = await this.githubClient.get<GithubRepoDto[]>(
      `/users/${username}/repos?per_page=20`,
    );

    return res.data;
  }
  // 깃 허브 레포지토리의 언어 사용 비율을 가져오기 위한 함수 Promse<respons> 형식의 반환 값을 가짐
  async getRepoLanguages(
    owner: string,
    repo: string,
  ): Promise<GithubLanguageDto> {
    const res = await this.githubClient.get<GithubLanguageDto>(
      `/repos/${owner}/${repo}/languages`,
    );
    return res.data;
  }

  async getContributions(username: string) {
    const query = `
    query($login: String!) {
        user(login: $login) {
            contributionsCollection {
                contributionCalendar {
                    totalContributions
                    weeks {
                        contributionDays {
                            date
                            contributionCount
                        }
                    }
                }
            }
        }
    }
    `;

    const res = await this.githubClient.post<GithubContributionDto>(
      '/graphql',
      {
        query,
        variables: {
          login: username,
        },
      },
    );
    return res.data;
  }
}
