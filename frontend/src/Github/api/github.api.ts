import axiosClient from "../../lib/axiosClient";
import {
  GithubCommitsResponse,
  GithubContributionsResponse,
  GithubOverview,
  GithubReposResponse,
} from "../types";

export const getGithubOverview = (): Promise<GithubOverview> =>
  axiosClient.get<GithubOverview>("/github/overview").then((res) => res.data);

export const getGithubRepos = (): Promise<GithubReposResponse> =>
  axiosClient
    .get<GithubReposResponse>("/dashboard/me/repos")
    .then((res) => res.data);

export const getGithubCommits = (): Promise<GithubCommitsResponse> =>
  axiosClient
    .get<GithubCommitsResponse>("/dashboard/me/commits")
    .then((res) => res.data);

export const getGithubContributions =
  (): Promise<GithubContributionsResponse> =>
    axiosClient
      .get<GithubContributionsResponse>("/dashboard/me/contributions")
      .then((res) => res.data);
