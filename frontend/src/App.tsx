import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { MainPage } from "./main/MainPage";
import { LoginPage } from "./auth/pages/LoginPage";
import { CallbackPage } from "./auth/pages/CallbackPage";
import { Header } from "./shared/components/Header";
import { Sidebar } from "./shared/components/Sidebar";

const NO_LAYOUT_PATHS = ["/login", "/auth/callback"];

function App() {
  const { pathname } = useLocation();
  const showLayout = !NO_LAYOUT_PATHS.some((p) => pathname.startsWith(p));

  if (!showLayout) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<CallbackPage />} />
      </Routes>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* 상단 고정 헤더 */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* 헤더 높이만큼 밀어내기 */}
      <div className="flex flex-1 pt-[72px]">
        {/* 좌측 고정 사이드바 */}
        <div className="fixed top-[72px] left-0 bottom-0 z-40">
          <Sidebar />
        </div>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 ml-[204px] overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
