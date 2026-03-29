export interface GithubRepoItem {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export interface GithubCommitItem {
  repo: string;
  message: string;
  date: string;
}

export interface GithubLanguageStatItem {
  language: string;
  bytes: number;
  percent: number;
}

export interface GithubReposResponse {
  repos: GithubRepoItem[];
  languageStats: GithubLanguageStatItem[];
}

export interface GithubCommitsResponse {
  commits: GithubCommitItem[];
}

export interface GithubContributionDay {
  date: string;
  contributionCount: number;
}

export interface GithubContributionsResponse {
  totalCommits: number;
  activeDays: number;
  longestStreak: number;
  currentStreak: number;
  heatmap: GithubContributionDay[];
}
