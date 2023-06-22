import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
      <div>
        <img src="../img/logo.png" alt="" />
      </div>
      <div className='menuList'>
        <div>메뉴</div>
        <div>메뉴</div>
        <div>메뉴</div>
        <div>메뉴</div>
        <div>메뉴</div>
      </div>
      <div className='sign'>
        <Link to="/signin">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </div>
    </header>
  );
};

export default Header;
