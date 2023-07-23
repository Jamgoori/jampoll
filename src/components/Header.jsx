import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Header2,
  FlexBetweenDiv,
  FlexDiv,
  Logo,
} from "./style/Container.style";
import { Routes, Route } from "react-router-dom";
import Food from "../pages/Food";
const Header = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("로그아웃 성공");
        navigate("/");
      })
      .catch((error) => {
        console.log("에러 :", error);
      });
  };

  return (
    <Header2 className="header">
      <FlexBetweenDiv width="1200">
        <Link to="/">
          <Logo src="../img/logo.png" alt="" />
        </Link>
        <Link to="/food">
          <div>음식</div>
        </Link>
        <Link to="/travel">
          <div>여행</div>
        </Link>
        <Link to="/invest">
          <div>투자</div>
        </Link>
        <FlexDiv>
          {authUser ? (
            <>
              <Link to="/mypage">마이페이지</Link>
              <Button onClick={handleSignOut}>로그아웃</Button>
            </>
          ) : (
            <>
              <Link to="/signin">로그인</Link>
            </>
          )}
        </FlexDiv>
      </FlexBetweenDiv>
    </Header2>
  );
};

export default Header;
