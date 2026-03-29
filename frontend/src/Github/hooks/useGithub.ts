import { useState, useEffect } from "react";
import { GithubOverview } from "../types";
import { getMockGithubOverview } from "../service/github.service";

export const useGithubOverview = () => {
  const [data, setData] = useState<GithubOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: replace with getGithubOverview() when API is ready
    const mock = getMockGithubOverview();
    setData(mock);
    setIsLoading(false);
  }, []);

  return { data, isLoading };
};
