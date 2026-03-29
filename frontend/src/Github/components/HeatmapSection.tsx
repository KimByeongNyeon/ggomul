import React from "react";
import { CommitDay } from "../types";
import { getCommitColor } from "../service/github.service";
import { useGetContribution } from "../hooks/useGithubQuery";

import { Skeleton } from "./Skeleton";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const P: React.CSSProperties = { fontFamily: "'Pretendard', sans-serif" };
const CELL = 16;
const GAP = 3;

export const HeatmapSection = () => {
  const { data, isLoading } = useGetContribution();

  if (isLoading || !data) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-52" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Array(3).fill(null).map((_, i) => (
            <div key={i} className="rounded-2xl p-5 flex flex-col gap-2" style={{ backgroundColor: "#e8f5f0" }}>
              <Skeleton className="h-3 w-16" style={{ backgroundColor: "#c8e8d8" }} />
              <Skeleton className="h-8 w-24" style={{ backgroundColor: "#c8e8d8" }} />
            </div>
          ))}
        </div>
        <Skeleton className="h-56 w-full rounded-2xl" />
      </div>
    );
  }

  const commitData: CommitDay[] = data.heatmap.map((d) => ({
    date: d.date,
    count: d.contributionCount,
  }));

  const firstDow = new Date(commitData[0]?.date).getDay();
  const padded: (CommitDay | null)[] = Array(firstDow).fill(null).concat(commitData);

  const weeks: (CommitDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }

  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstValid = week.find((d) => d !== null);
    if (firstValid) {
      const m = new Date((firstValid as CommitDay).date).getMonth();
      if (m !== lastMonth) {
        monthLabels.push({ label: MONTHS[m], col: wi });
        lastMonth = m;
      }
    }
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800" style={P}>
          커밋 이력 (잔디)
        </h2>
        <p className="text-sm text-gray-500 mt-1" style={P}>
          최근 1년간 커밋 활동 현황
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "총 커밋", value: data.totalCommits.toLocaleString(), unit: "회" },
          { label: "활동 일수", value: data.activeDays.toLocaleString(), unit: "일" },
          { label: "최장 연속", value: data.longestStreak.toLocaleString(), unit: "일" },
        ].map(({ label, value, unit }) => (
          <div
            key={label}
            className="rounded-2xl p-5 flex flex-col gap-1"
            style={{ backgroundColor: "#e8f5f0" }}
          >
            <span className="text-xs text-gray-500" style={P}>{label}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-800" style={P}>{value}</span>
              <span className="text-sm text-gray-500" style={P}>{unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 히트맵 */}
      <div
        className="rounded-2xl p-6 w-full"
        style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
      >
        <div className="flex items-center justify-between mb-5">
          <span className="font-bold text-base text-gray-800" style={P}>Commit History</span>
          <span
            className="text-xs px-3 py-1 rounded-full text-gray-600"
            style={{ backgroundColor: "#e8f5f0", ...P }}
          >
            Past year
          </span>
        </div>

        <div className="overflow-x-auto pb-2">
          <div style={{ display: "inline-block", minWidth: "100%" }}>
            {/* 월 레이블 */}
            <div style={{ display: "flex", marginLeft: 36, marginBottom: 6 }}>
              {weeks.map((_, wi) => {
                const ml = monthLabels.find((m) => m.col === wi);
                return (
                  <div key={wi} style={{ width: CELL + GAP }}>
                    {ml && (
                      <span style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap", ...P }}>
                        {ml.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 요일 + 셀 */}
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {/* 요일 레이블 */}
              <div style={{ display: "flex", flexDirection: "column", gap: GAP, marginRight: 6, width: 30 }}>
                {DAYS.map((d, i) => (
                  <div
                    key={i}
                    style={{ height: CELL, fontSize: 10, color: "#9ca3af", lineHeight: `${CELL}px`, textAlign: "right", ...P }}
                  >
                    {i % 2 === 1 ? d : ""}
                  </div>
                ))}
              </div>

              {/* 셀 */}
              <div style={{ display: "flex", gap: GAP }}>
                {weeks.map((week, wi) => (
                  <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                    {Array(7).fill(null).map((_, di) => {
                      const day = week[di];
                      return (
                        <div
                          key={di}
                          title={day ? `${(day as CommitDay).date}: ${(day as CommitDay).count}회` : ""}
                          style={{
                            width: CELL,
                            height: CELL,
                            borderRadius: 3,
                            backgroundColor: day ? getCommitColor((day as CommitDay).count) : "transparent",
                            cursor: day ? "pointer" : "default",
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 범례 */}
        <div
          className="flex items-center justify-between mt-5 pt-4"
          style={{ borderTop: "1px solid #f3f4f6" }}
        >
          <span style={{ fontSize: 12, color: "#9ca3af", ...P }}>Commit density over the past year</span>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: 12, color: "#9ca3af", ...P }}>Less</span>
            {[0, 1, 2, 3, 4, 5].map((c) => (
              <div key={c} style={{ width: CELL, height: CELL, borderRadius: 3, backgroundColor: getCommitColor(c) }} />
            ))}
            <span style={{ fontSize: 12, color: "#9ca3af", ...P }}>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};
