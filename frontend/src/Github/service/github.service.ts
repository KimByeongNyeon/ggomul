import { Commit, CommitDay, GithubOverview, LanguageStat, Repository } from "../types";

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Java: "#b07219",
  "C#": "#178600",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Rust: "#dea584",
  Lea: "#a8d5a2",
  Png: "#aec6e8",
  PsP: "#e8b4a0",
  Lan: "#1e3a5f",
};

export const getMockGithubOverview = (): GithubOverview => ({
  repositories: getMockRepositories(),
  commitHistory: getMockCommitHistory(),
  recentCommits: getMockRecentCommits(),
  languages: getMockLanguages(),
});

const getMockRepositories = (): Repository[] => [
  {
    id: 1,
    name: "Kkomul-i-Web",
    description: "Kkomul-i-Web is a website code on web dozing your repository.",
    stars: 4300,
    forks: 1,
    language: "TypeScript",
    languageColor: LANGUAGE_COLORS["TypeScript"],
    updatedAt: "2025-03-20",
  },
  {
    id: 2,
    name: "Data-Structures",
    description: "Data-Structures and preparing cracks on tutorial",
    stars: 2500,
    forks: 1,
    language: "C#",
    languageColor: LANGUAGE_COLORS["C#"],
    updatedAt: "2025-03-15",
  },
  {
    id: 3,
    name: "Algorithm-Practice",
    description: "Electricoral coverations of algorithm-Practice for Algorithm-Practice.",
    stars: 2210,
    forks: 1,
    language: "Python",
    languageColor: LANGUAGE_COLORS["Python"],
    updatedAt: "2025-03-10",
  },
  {
    id: 4,
    name: "ggomoo-frontend",
    description: "Frontend for the Ggomoo growth tracking service.",
    stars: 180,
    forks: 3,
    language: "TypeScript",
    languageColor: LANGUAGE_COLORS["TypeScript"],
    updatedAt: "2025-03-28",
  },
  {
    id: 5,
    name: "leetcode-solutions",
    description: "My personal LeetCode solution archive.",
    stars: 95,
    forks: 0,
    language: "Python",
    languageColor: LANGUAGE_COLORS["Python"],
    updatedAt: "2025-03-25",
  },
  {
    id: 6,
    name: "go-microservices",
    description: "Microservices boilerplate written in Go.",
    stars: 310,
    forks: 12,
    language: "Go",
    languageColor: LANGUAGE_COLORS["Go"],
    updatedAt: "2025-03-01",
  },
];

const getMockRecentCommits = (): Commit[] => [
  {
    id: "1",
    message: "feat: 랜딩 페이지 히어로 섹션 구현",
    repo: "ggomoo-frontend",
    sha: "a1b2c3d",
    date: "2025-03-28T10:30:00",
    additions: 142,
    deletions: 8,
  },
  {
    id: "2",
    message: "fix: 사이드바 Pretendard 폰트 적용 이슈 수정",
    repo: "ggomoo-frontend",
    sha: "e4f5a6b",
    date: "2025-03-27T18:12:00",
    additions: 34,
    deletions: 21,
  },
  {
    id: "3",
    message: "refactor: AuthGuard 로직 단순화",
    repo: "ggomoo-frontend",
    sha: "c7d8e9f",
    date: "2025-03-27T14:05:00",
    additions: 28,
    deletions: 45,
  },
  {
    id: "4",
    message: "feat: GitHub 커밋 히트맵 컴포넌트 추가",
    repo: "ggomoo-frontend",
    sha: "f1a2b3c",
    date: "2025-03-26T20:44:00",
    additions: 210,
    deletions: 0,
  },
  {
    id: "5",
    message: "chore: 의존성 업데이트 및 불필요한 패키지 제거",
    repo: "Kkomul-i-Web",
    sha: "d4e5f6a",
    date: "2025-03-25T09:00:00",
    additions: 5,
    deletions: 120,
  },
  {
    id: "6",
    message: "solve: 두 수의 합 (Two Sum) - O(n) 해법",
    repo: "leetcode-solutions",
    sha: "b7c8d9e",
    date: "2025-03-24T22:30:00",
    additions: 38,
    deletions: 2,
  },
  {
    id: "7",
    message: "docs: README 업데이트 및 스크린샷 추가",
    repo: "Data-Structures",
    sha: "a9b0c1d",
    date: "2025-03-23T11:15:00",
    additions: 22,
    deletions: 8,
  },
  {
    id: "8",
    message: "feat: gRPC 서비스 기본 구조 설정",
    repo: "go-microservices",
    sha: "e2f3a4b",
    date: "2025-03-20T16:00:00",
    additions: 185,
    deletions: 10,
  },
];

const getMockCommitHistory = (): CommitDay[] => {
  const days: CommitDay[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const rand = Math.random();
    const count =
      rand < 0.35 ? 0 : rand < 0.55 ? 1 : rand < 0.72 ? 2 : rand < 0.85 ? 3 : rand < 0.93 ? 4 : 5;
    days.push({ date: dateStr, count });
  }
  return days;
};

const getMockLanguages = (): LanguageStat[] => [
  { name: "TypeScript", percentage: 30, color: "#a8d5a2" },
  { name: "Python", percentage: 28.5, color: "#aec6e8" },
  { name: "C#", percentage: 17.5, color: "#f7e08a" },
  { name: "Go", percentage: 10, color: "#e8b4a0" },
  { name: "기타", percentage: 14, color: "#d4d4d4" },
];

export const formatStars = (count: number): string => {
  if (count >= 1000) return (count / 1000).toFixed(1) + "k";
  return String(count);
};

export const getCommitColor = (count: number): string => {
  if (count === 0) return "#eaf5ea";
  if (count === 1) return "#b6e0b6";
  if (count === 2) return "#7dc47d";
  if (count === 3) return "#4da64d";
  if (count === 4) return "#2d8a2d";
  return "#1a5c1a";
};

export const formatRelativeDate = (dateStr: string): string => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}일 전`;
  return new Date(dateStr).toLocaleDateString("ko-KR");
};
