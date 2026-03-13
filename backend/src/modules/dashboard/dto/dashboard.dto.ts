export interface GithublanguageStat {
  language: string;
  bytes: number;
  percent: number;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface GithubStats {
  login: string;
  repoCount: number;
  followers: number;
}

export interface GitHubContributionStat {
  totalCommits: number;
  currentStreak: number;
  heatmap: ContributionDay[];
}

export interface GithubResponse {
  stats: GithubStats;
  languages: GithublanguageStat[];
  contributions: GitHubContributionStat;
}

export interface BaekjoonUserStats {
  handle: string;
  tier: number;
  rating: number;
  solvedCount: number;
  rank: number;
}

export interface BaekjoonTierStat {
  level: number;
  solved: number;
  total: number;
}

export interface BaekjoonResponse {
  userStats: BaekjoonUserStats;
  tierStats: BaekjoonTierStat[];
}

export interface DashboardResponse {
  github: GithubResponse;
  baekjoon: BaekjoonResponse;
}
