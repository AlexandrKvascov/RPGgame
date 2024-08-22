import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {getPlayer} from './api';

const StartPage = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = async () => {
    await getPlayer(name);
    // console.log(player)
    // localStorage.setItem('player', JSON.stringify(player));
    navigate('/game'); // Переход на страницу GamePage
  };

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите имя персонажа" />
      <button onClick={handleStart}>Старт</button>
    </div>
  );
};

export default StartPage;