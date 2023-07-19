import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Main from "./pages/Main";
import AuthDetail from "./components/AuthDetail";
import "./App.css";
import { AppContainer } from "./components/style/Container.style";
import Food from "./pages/Food";
const App = () => {
  return (
    <div className="App">
      <Header />
      <AppContainer>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<AuthDetail />} />
          <Route path="/food" element={<Food />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </AppContainer>
    </div>
  );
};

export default App;
