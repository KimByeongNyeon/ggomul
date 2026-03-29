import { useGetRepository } from "../hooks/useGithubQuery";
import { LanguageStat, Repository } from "../types";
import { LANGUAGE_COLORS } from "../service/github.service";
import { LanguageChart } from "./LanguageChart";
import { P } from "./P";
import { RepoCard } from "./RepoCard";
import { Skeleton } from "./Skeleton";

export const RepositoriesSection = () => {
  const { data, isLoading } = useGetRepository();

  if (isLoading || !data) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-4 w-44" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Array(4).fill(null).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 flex flex-col gap-3 border"
              style={{ borderColor: "#e5e7eb", backgroundColor: "#fff" }}
            >
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-8 w-full" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-16 ml-auto" />
              </div>
              <Skeleton className="h-3 w-28" />
            </div>
          ))}
        </div>
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    );
  }

  const repos: Repository[] = data.repos.map((r, i) => ({
    id: i,
    name: r.name,
    description: r.description ?? "",
    stars: r.stargazers_count,
    forks: r.forks_count,
    language: r.language ?? "기타",
    languageColor: LANGUAGE_COLORS[r.language ?? ""] ?? "#d4d4d4",
    updatedAt: r.updated_at,
  }));

  const languages: LanguageStat[] = data.languageStats.map((l) => ({
    name: l.language,
    percentage: l.percent,
    color: LANGUAGE_COLORS[l.language] ?? "#d4d4d4",
  }));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800" style={P}>
            레포지토리
          </h2>
          <p className="text-sm text-gray-500 mt-1" style={P}>
            내 GitHub 레포지토리 목록
          </p>
        </div>
        <span
          className="text-xs px-3 py-1.5 rounded-full font-medium"
          style={{ backgroundColor: "#e8f5f0", color: "#2d7a5a", ...P }}
        >
          총 {repos.length}개
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
      <div>
        <LanguageChart languages={languages} />
      </div>
    </div>
  );
};
