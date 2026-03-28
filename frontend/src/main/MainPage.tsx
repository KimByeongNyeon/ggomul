export const MainPage = () => {
  return (
    <div>
      MainPage
      <button
        onClick={() => {
          window.location.href = "http://localhost:3000/auth/github";
        }}
      >
        깃 허브 로그인
      </button>
    </div>
  );
};
