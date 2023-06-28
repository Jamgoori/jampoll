import React, { useEffect, useState } from "react";
import auth from "../firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthDetail = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("로그아웃 성공");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>{`${authUser.email}님 환영합니다.`}</p>
          <button onClick={userSignOut}>로그아웃</button>
        </>
      ) : (
        <p>로그인 되지 않았습니다.</p>
      )}
    </div>
  );
};

export default AuthDetail;
