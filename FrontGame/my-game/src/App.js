import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StartPage from './StartPage';
import GamePage from './GamePage';
import BattlePage from './BattlePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage/>} />
        <Route path="/game" element={<GamePage/>} />
        <Route path="/battle" element={<BattlePage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;