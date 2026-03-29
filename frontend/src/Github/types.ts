export interface Repository {
  id: number;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  updatedAt: string;
}

export interface CommitDay {
  date: string;
  count: number;
}

export interface Commit {
  id: string;
  message: string;
  repo: string;
  sha: string;
  date: string;
  additions: number;
  deletions: number;
}

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

export interface GithubOverview {
  repositories: Repository[];
  commitHistory: CommitDay[];
  recentCommits: Commit[];
  languages: LanguageStat[];
}

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
