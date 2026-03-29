import { LanguageStat } from "../types";
import { P } from "./P";
import { PieChart } from "./PieChart";

interface Props {
  languages: LanguageStat[];
}

export const LanguageChart = ({ languages }: Props) => (
  <div
    className="rounded-2xl p-5 flex flex-col gap-4"
    style={{
      backgroundColor: "#fff",
      border: "1px solid #e5e7eb",
      minWidth: 220,
    }}
  >
    <span className="font-bold text-base text-gray-800" style={P}>
      자주 사용한 언어
    </span>
    <div className="flex justify-center">
      <PieChart languages={languages} />
    </div>
    <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
      {languages.map((lang) => (
        <div key={lang.name} className="flex items-center gap-1.5">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: lang.color }}
          />
          <span className="text-xs text-gray-600" style={P}>
            {lang.name}
          </span>
        </div>
      ))}
    </div>
  </div>
);
