export interface GithubSearchCommitItem {
  sha: string;
  commit: {
    message: string;
    committer: {
      date: string;
    };
  };
  repository: {
    full_name: string;
  };
}

export interface GithubSearchCommitsDto {
  total_count: number;
  items: GithubSearchCommitItem[];
}
