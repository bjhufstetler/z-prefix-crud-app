import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Bar, Posts, CreateAccount } from './components';
import './App.css';

export const App = () => {
  return(
    <>
      <Bar />
      <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/create' element={<CreateAccount />} />
      </Routes>
    </>
  );
};