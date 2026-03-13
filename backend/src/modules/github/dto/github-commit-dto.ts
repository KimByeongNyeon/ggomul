export interface GithubContributionDto {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: GithubWeek[];
        };
      };
    };
  };
}

export interface GithubWeek {
  contributionDays: GithubContributionDay[];
}

export interface GithubContributionDay {
  date: string;
  contributionCount: number;
}
