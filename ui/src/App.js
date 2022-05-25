import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Bar, Posts, CreateAccount, NewPost } from './components';
import './App.css';

export const App = () => {
  return(
    <>
      <Bar />
      <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/user/:username' element={<Posts />} />
        <Route path='/create' element={<CreateAccount />} />
        <Route path='/newpost' element={<NewPost/> } />
      </Routes>
    </>
  );
};