export interface GithubRepoDto {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}
