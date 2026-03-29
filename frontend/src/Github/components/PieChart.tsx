import { LanguageStat } from "../types";
import { P } from "./P";


export const PieChart = ({ languages }: { languages: LanguageStat[] }) => {
  const total = languages.reduce((sum, l) => sum + l.percentage, 0);
  let cumulative = 0;

  const slices = languages.map((lang) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += lang.percentage;
    const endAngle = (cumulative / total) * 360;
    return { ...lang, startAngle, endAngle };
  });

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const cx = 80;
  const cy = 80;
  const r = 70;

  const describeArc = (start: number, end: number) => {
    const s = toRad(start - 90);
    const e = toRad(end - 90);
    const x1 = cx + r * Math.cos(s);
    const y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e);
    const y2 = cy + r * Math.sin(e);
    const large = end - start > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
  };

  const labelPos = (start: number, end: number) => {
    const mid = toRad((start + end) / 2 - 90);
    const dist = r * 0.65;
    return {
      x: cx + dist * Math.cos(mid),
      y: cy + dist * Math.sin(mid),
    };
  };

  return (
    <svg width={160} height={160} viewBox="0 0 160 160">
      {slices.map((s, i) => (
        <g key={i}>
          <path
            d={describeArc(s.startAngle, s.endAngle)}
            fill={s.color}
            stroke="#fff"
            strokeWidth={1.5}
          />
          {s.endAngle - s.startAngle > 15 && (
            <text
              x={labelPos(s.startAngle, s.endAngle).x}
              y={labelPos(s.startAngle, s.endAngle).y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={9}
              fill="#fff"
              fontWeight={600}
              style={P}
            >
              {s.percentage}%
            </text>
          )}
        </g>
      ))}
    </svg>
  );
};
