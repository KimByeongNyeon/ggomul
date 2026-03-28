import { Route, Routes } from "react-router-dom";
import "./App.css";
import { MainPage } from "./main/MainPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
