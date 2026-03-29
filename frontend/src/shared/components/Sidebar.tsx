import { Link, useLocation, useNavigate } from "react-router-dom";
import { House, Swords, Settings, Smile, LogOut } from "lucide-react";
import { handleLogoutSuccess } from "../../auth/service/auth.service";

const NAV_ITEMS = [
  { label: "전체보기", href: "/", icon: House },
  { label: "My Character", href: "/character", icon: Smile },
  { label: "Challenges", href: "/challenges", icon: Swords },
  { label: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    handleLogoutSuccess();
    navigate("/login");
  };

  return (
    <aside className="w-48 min-h-screen bg-[#f5e6d0] rounded-2xl flex flex-col pt-6 pb-4 px-3 relative">
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              to={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-base transition-colors ${
                isActive
                  ? "bg-white text-gray-900 font-semibold shadow-sm"
                  : "text-gray-600 hover:bg-white/50"
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* 하단 */}
      <div className="mt-auto flex flex-col gap-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-base text-gray-500 hover:bg-white/50 transition-colors w-full"
        >
          <LogOut size={18} />
          로그아웃
        </button>
        <div className="flex justify-end pr-2">
          <img
            src="/assets/logo.png"
            alt="꼬물이"
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>
    </aside>
  );
};
