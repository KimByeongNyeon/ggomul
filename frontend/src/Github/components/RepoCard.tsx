import { Clock, GitFork, Star } from "lucide-react";
import { P } from "./P";
import { Repository } from "../types";
import { formatStars } from "../service/github.service";

export const RepoCard = ({ repo }: { repo: Repository }) => (
  <div
    className="rounded-2xl p-5 flex flex-col gap-3 border hover:shadow-sm transition-shadow"
    style={{ borderColor: "#e5e7eb", backgroundColor: "#fff" }}
  >
    <div className="flex items-start gap-2">
      <svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="#6b7280"
        className="mt-0.5 flex-shrink-0"
      >
        <path d="M2 2.5A2.5 2.5 0 014.5 0h7A2.5 2.5 0 0114 2.5v11a.5.5 0 01-.777.416L8 10.101l-5.223 3.815A.5.5 0 012 13.5V2.5z" />
      </svg>
      <span className="font-bold text-sm text-gray-800 leading-tight" style={P}>
        {repo.name}
      </span>
    </div>
    <p
      className="text-xs text-gray-500 leading-relaxed"
      style={{ ...P, minHeight: 34 }}
    >
      {repo.description}
    </p>
    <div className="flex items-center gap-4 mt-auto">
      <div className="flex items-center gap-1 text-xs text-gray-500" style={P}>
        <Star size={12} />
        {formatStars(repo.stars)}
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-500" style={P}>
        <GitFork size={12} />
        {repo.forks}
      </div>
      <div className="flex items-center gap-1.5 ml-auto">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: repo.languageColor }}
        />
        <span className="text-xs text-gray-500" style={P}>
          {repo.language}
        </span>
      </div>
    </div>
    <div
      className="flex items-center gap-1 text-xs text-gray-400 pt-1 border-t"
      style={{ borderColor: "#f3f4f6", ...P }}
    >
      <Clock size={11} />
      <span>Updated {repo.updatedAt}</span>
    </div>
  </div>
);
