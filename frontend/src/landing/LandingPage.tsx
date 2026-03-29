import { Cloud, Flower, Leaf, Sparkle } from "./components/index";

export const LandingPage = () => {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #fdf6ec 0%, #fce8d5 50%, #fdf0e0 100%)",
      }}
    >
      {/* 구름들 */}
      <Cloud className="top-6 left-8 opacity-90" />
      <Cloud className="top-4 right-16 opacity-80" />
      <Cloud className="top-16 left-1/2 -translate-x-1/2 opacity-60 scale-75" />

      {/* 바닥 잔디 물결 */}
      <svg
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ height: 100 }}
      >
        <path
          d="M0,60 C120,30 240,90 360,60 C480,30 600,80 720,55 C840,30 960,85 1080,55 C1200,25 1320,75 1440,50 L1440,120 L0,120 Z"
          fill="#a8d8a0"
          opacity={0.5}
        />
        <path
          d="M0,80 C100,55 220,100 360,75 C500,50 620,95 760,70 C900,45 1020,90 1180,68 C1300,50 1380,80 1440,65 L1440,120 L0,120 Z"
          fill="#c3e8bb"
          opacity={0.55}
        />
        <path
          d="M0,95 C180,75 360,105 540,88 C720,70 900,100 1080,85 C1260,68 1380,95 1440,82 L1440,120 L0,120 Z"
          fill="#d9f0d2"
          opacity={0.6}
        />
      </svg>

      {/* 꽃들 */}
      <Flower style={{ bottom: 80, left: "10%" }} color="#f9a8d4" size={26} />
      <Flower style={{ bottom: 72, left: "18%" }} color="#fde68a" size={18} />
      <Flower style={{ bottom: 90, left: "28%" }} color="#c4b5fd" size={22} />
      <Flower style={{ bottom: 68, right: "12%" }} color="#fdba74" size={20} />
      <Flower style={{ bottom: 85, right: "22%" }} color="#f9a8d4" size={24} />
      <Flower style={{ bottom: 75, right: "32%" }} color="#86efac" size={18} />

      {/* 반짝이 */}
      <Sparkle style={{ top: "18%", left: "22%" }} />
      <Sparkle style={{ top: "12%", right: "28%" }} />
      <Sparkle style={{ top: "30%", right: "15%" }} />
      <Sparkle style={{ top: "25%", left: "48%" }} />

      {/* 잎사귀들 */}
      <Leaf style={{ top: "20%", left: "38%" }} rotate={-30} />
      <Leaf style={{ top: "15%", right: "38%" }} rotate={45} />
      <Leaf style={{ top: "35%", left: "14%" }} rotate={20} />

      {/* 메인 콘텐츠 */}
      <div className="relative flex flex-row items-center w-full h-full px-24 gap-20">
        {/* 오른쪽: 캐릭터 이미지 */}
        <div className="flex flex-1 items-center justify-center h-full pb-16">
          <img
            src="/assets/landing.png"
            alt="꼬물이 캐릭터"
            className="object-contain drop-shadow-lg"
            style={{ maxHeight: "58vh", maxWidth: "100%" }}
          />
        </div>
        {/* 왼쪽: 텍스트 & 버튼 */}
        <div
          className="flex flex-1 flex-col justify-center gap-6 pb-8"
          style={{ fontFamily: "'Pretendard', sans-serif" }}
        >
          <h1
            className="font-bold leading-tight"
            style={{ color: "#3d3426", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            꿈틀꿈틀, 코딩으로
            <br />
            성장하는 나만의 친구
          </h1>
          <p
            className="leading-relaxed"
            style={{
              color: "#7a6e5f",
              fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)",
              fontFamily: "'Pretendard', sans-serif",
            }}
          >
            깃허브와 백준 활동으로 꼬물이를 성장시키고
            <br />
            나만의 나비를 완성해보세요.
          </p>
          <button
            onClick={() =>
              (window.location.href = "http://localhost:3000/api/auth/github")
            }
            className="mt-2 rounded-full text-white font-semibold w-fit transition-all hover:opacity-90 hover:scale-105 shadow-md"
            style={{
              backgroundColor: "#d4926a",
              padding: "clamp(0.6rem, 1.2vw, 1rem) clamp(1.5rem, 3vw, 2.5rem)",
              fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)",
            }}
          >
            GitHub으로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};
