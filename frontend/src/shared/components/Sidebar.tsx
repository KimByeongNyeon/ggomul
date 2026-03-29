import { Link, useLocation } from "react-router-dom";
import {
  GitCommitHorizontal,
  BookMarked,
  BarChart2,
  Trophy,
  BookOpen,
  TrendingUp,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  Bot,
} from "lucide-react";
import { useLogout } from "../../auth/hooks/useAuth";

const P: React.CSSProperties = { fontFamily: "'Pretendard', sans-serif" };

const SECTION_NAV: Record<
  string,
  { label: string; href: string; icon: React.ElementType }[]
> = {
  github: [
    { label: "최근 커밋", href: "/github/commits", icon: GitCommitHorizontal },
    { label: "레포지토리", href: "/github/repos", icon: BookMarked },
    { label: "커밋 이력 (잔디)", href: "/github/heatmap", icon: BarChart2 },
  ],
  baekjoon: [
    { label: "문제 풀이 현황", href: "/baekjoon/status", icon: Trophy },
    { label: "푼 문제 목록", href: "/baekjoon/solved", icon: BookOpen },
    { label: "티어 변화", href: "/baekjoon/tier", icon: TrendingUp },
    { label: "문제 추천", href: "/baekjoon/recommend", icon: Bot },
  ],
  profile: [
    { label: "내 정보", href: "/profile/info", icon: User },
    { label: "설정", href: "/profile/settings", icon: Settings },
  ],
};

const SECTION_LABELS: Record<string, string> = {
  github: "GitHub",
  baekjoon: "Baekjoon",
  profile: "Profile",
};

const DEFAULT_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

const BOTTOM_ITEMS = [{ label: "세팅", href: "/settings", icon: Settings }];

export const Sidebar = () => {
  const { pathname } = useLocation();
  const { logout } = useLogout();

  const section = ["github", "baekjoon", "profile"].find((s) =>
    pathname.startsWith("/" + s),
  );
  const navItems = section ? SECTION_NAV[section] : DEFAULT_NAV;
  const sectionLabel = section ? SECTION_LABELS[section] : null;

  return (
    <aside
      className="w-56 h-full bg-white flex flex-col py-5 px-3"
      style={{ borderRight: "1px solid #e5e7eb" }}
    >
      {/* 유저 카드 */}
      <div
        className="rounded-2xl p-4 mb-6 flex flex-col gap-3"
        style={{ backgroundColor: "#e8f5f0" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center"
            style={{ backgroundColor: "#c8e6d8" }}
          >
            <img
              src="/assets/logo.png"
              alt="캐릭터"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-sm text-gray-800" style={P}>
              Kkomui-l User
            </span>
            <span className="text-xs text-gray-500" style={P}>
              LV. 12 EXP 85%
            </span>
          </div>
        </div>
        <button
          className="w-full rounded-xl py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-white/80"
          style={{ backgroundColor: "rgba(255,255,255,0.6)", ...P }}
        >
          Grow My Code
        </button>
      </div>

      {/* 섹션 레이블 */}
      {sectionLabel && (
        <span
          className="text-xs font-semibold text-gray-400 px-3 mb-2 uppercase tracking-wider"
          style={P}
        >
          {sectionLabel}
        </span>
      )}

      {/* 섹션별 네비게이션 */}
      <nav className="flex flex-col gap-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              to={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                isActive
                  ? "font-semibold text-gray-800"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              style={isActive ? { backgroundColor: "#d4ece3", ...P } : { ...P }}
            >
              <Icon size={17} strokeWidth={isActive ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* 하단 */}
      <div className="mt-auto flex flex-col">
        <div
          style={{ borderTop: "1px solid #e5e7eb" }}
          className="pt-3 flex flex-col gap-1"
        >
          {BOTTOM_ITEMS.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive
                    ? "font-semibold text-gray-800"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                style={
                  isActive ? { backgroundColor: "#d4ece3", ...P } : { ...P }
                }
              >
                <Icon size={17} strokeWidth={isActive ? 2.5 : 2} />
                {label}
              </Link>
            );
          })}
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-100 transition-colors w-full"
            style={P}
          >
            <LogOut size={17} strokeWidth={2} />
            로그아웃
          </button>
        </div>
      </div>
    </aside>
  );
};
