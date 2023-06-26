import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import auth from '../firebase';
import { useNavigate } from 'react-router-dom';

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
        console.log('로그아웃 성공');
        navigate('/');
      })
      .catch((error) => {
        console.log("에러 :", error);
      });
  };

  return (
    <header className='header'>
      <Link to='/'>
        <img src="../img/logo.png" alt="" />
      </Link>
      <div className='menuList'>
        <div>메뉴</div>
        <div>메뉴</div>
        <div>메뉴</div>
        <div>메뉴</div>
        <div>메뉴</div>
      </div>
      <div className='sign'>
        {authUser ? (
          <>
            <p>{`${authUser.email}님 환영합니다.`}</p>
            <Link to="/mypage">마이페이지</Link>
            <button onClick={handleSignOut}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/signin">로그인</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
