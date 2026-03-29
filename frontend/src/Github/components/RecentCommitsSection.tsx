import { GitCommitHorizontal } from "lucide-react";
import { Commit } from "../types";
import { formatRelativeDate } from "../service/github.service";
import { P } from "./P";
import { useGetCommit } from "../hooks/useGithubQuery";
import { Skeleton } from "./Skeleton";

const commitTypeColor = (message: string) => {
  if (message.startsWith("feat")) return { bg: "#e8f5e8", text: "#2d7a2d" };
  if (message.startsWith("fix")) return { bg: "#fff3e0", text: "#b86a00" };
  if (message.startsWith("refactor")) return { bg: "#e8f0fb", text: "#1a56db" };
  if (message.startsWith("chore")) return { bg: "#f3f4f6", text: "#6b7280" };
  if (message.startsWith("docs")) return { bg: "#fdf3ff", text: "#7e22ce" };
  if (message.startsWith("solve")) return { bg: "#fef2f2", text: "#b91c1c" };
  return { bg: "#f3f4f6", text: "#6b7280" };
};

const commitTypeLabel = (message: string) => {
  const type = message.split(":")[0];
  return type.length <= 10 ? type : "etc";
};

export const RecentCommitsSection = () => {
  const { data, isLoading } = useGetCommit();

  if (isLoading || !data) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-56" />
        </div>
        <div className="flex flex-col gap-4">
          {Array(6).fill(null).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-5 rounded-2xl border"
              style={{ borderColor: "#e5e7eb", backgroundColor: "#fff", padding: "20px 24px" }}
            >
              <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const commits: Commit[] = data.commits.map((c, i) => ({
    id: String(i),
    message: c.message,
    repo: c.repo,
    sha: "",
    date: c.date,
    additions: 0,
    deletions: 0,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800" style={P}>
          최근 커밋
        </h2>
        <p className="text-base text-gray-500 mt-1" style={P}>
          내 레포지토리의 최신 커밋 활동
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {commits.map((commit) => {
          const { bg, text } = commitTypeColor(commit.message);
          const label = commitTypeLabel(commit.message);
          const msgBody = commit.message.includes(":")
            ? commit.message.split(":").slice(1).join(":").trim()
            : commit.message;

          return (
            <div
              key={commit.id}
              className="flex items-center gap-5 rounded-2xl border"
              style={{
                borderColor: "#e5e7eb",
                backgroundColor: "#fff",
                padding: "20px 24px",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: bg }}
              >
                <GitCommitHorizontal size={24} color={text} />
              </div>

              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span
                    className="font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: bg, color: text, fontSize: 13, ...P }}
                  >
                    {label}
                  </span>
                  <span
                    className="font-medium text-gray-800 truncate"
                    style={{ fontSize: 15, ...P }}
                  >
                    {msgBody}
                  </span>
                </div>
                <div className="flex items-center gap-3" style={{ fontSize: 13, ...P }}>
                  <span
                    className="px-2.5 py-1 rounded-md font-mono"
                    style={{ backgroundColor: "#f3f4f6", color: "#6b7280" }}
                  >
                    {commit.repo}
                  </span>
                  <span className="text-gray-400">
                    {formatRelativeDate(commit.date)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
