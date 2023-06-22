import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Signin from './pages/Signin';
import './App.css';
import Signup from './pages/Signup';
import Main from './pages/Main';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signin" element={<Signin />} />        
        <Route path="/signup" element={<Signup />} />        
      </Routes>
      <Main/>
    </div>
  );
};

export default App;
