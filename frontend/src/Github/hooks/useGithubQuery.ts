import { useQuery } from "@tanstack/react-query";
import {
  getGithubCommits,
  getGithubContributions,
  getGithubRepos,
} from "../api/github.api";

export const useGetRepository = () => {
  return useQuery({
    queryKey: ["repository"],
    queryFn: () => getGithubRepos(),
  });
};

export const useGetCommit = () => {
  return useQuery({
    queryKey: ["commits"],
    queryFn: () => getGithubCommits(),
  });
};

export const useGetContribution = () => {
  return useQuery({
    queryKey: ["contribution"],
    queryFn: () => getGithubContributions(),
  });
};
