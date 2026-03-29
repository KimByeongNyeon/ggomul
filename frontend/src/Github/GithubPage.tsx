import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RecentCommitsSection } from "./components/RecentCommitsSection";
import { RepositoriesSection } from "./components/RepositoriesSection";
import { HeatmapSection } from "./components/HeatmapSection";

const P: React.CSSProperties = { fontFamily: "'Pretendard', sans-serif" };

export const GithubPage = () => {
  return (
    <div className="flex flex-col gap-2 w-full" style={P}>
      <Routes>
        <Route path="/" element={<Navigate to="commits" replace />} />
        <Route path="commits" element={<RecentCommitsSection />} />
        <Route path="repos" element={<RepositoriesSection />} />
        <Route path="heatmap" element={<HeatmapSection />} />
      </Routes>
    </div>
  );
};
