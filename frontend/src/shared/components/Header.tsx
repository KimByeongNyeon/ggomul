import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "GitHub", href: "/github" },
  { label: "Baekjoon", href: "/baekjoon" },
  { label: "Profile", href: "/profile" },
];

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="w-full bg-white border-b border-gray-200 px-3 flex items-center gap-5">
      {/* Logo */}
      <Link to="/" className="flex flex-col items-start shrink-0">
        <img src="/assets/logo.png" alt="꼬물이" className="h-16 w-auto" />
      </Link>

      {/* Nav */}
      <nav className="flex items-center gap-6">
        {NAV_ITEMS.map(({ label, href }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              to={href}
              className="text-sm text-gray-600 py-1 transition-colors hover:text-gray-900"
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#111827" : undefined,
                borderBottom: isActive
                  ? "2px solid #C7F7CE"
                  : "2px solid transparent",
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
