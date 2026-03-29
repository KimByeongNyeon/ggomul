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
      <nav className="flex items-center gap-2">
        {NAV_ITEMS.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              to={href}
              className={`text-base px-4 py-1.5 rounded-full transition-colors ${
                isActive
                  ? "bg-[#f5c9a0] text-gray-900 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Avatar */}
      <div className="ml-auto flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 shrink-0">
          <img
            src="/assets/logo.png"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-base text-gray-800">User123</span>
      </div>
    </header>
  );
};
