import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StartPage from './StartPage';
import GamePage from './GamePage';
import BattlePage from './BattlePage';
import AuthPage from './LoginPage'
import WinPage  from './WinPage';
import LosePage from './LosePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage/>}/>
        <Route path="/start" element={<StartPage/>} />
        <Route path="/game" element={<GamePage/>} />
        <Route path="/battle" element={<BattlePage/>}/>
        <Route path="/win" element={<WinPage/>}/>
        <Route path="/game-over" element={<LosePage/>}/>

      </Routes>
    </BrowserRouter>
  );
};

export default App;