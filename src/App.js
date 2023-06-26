import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Main from './pages/Main';
import AuthDetail from './components/AuthDetail';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<AuthDetail/>}/>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
};

export default App;
