import React from 'react';
import KnightImage from "./image/KnightState.gif"
import { useNavigate } from 'react-router-dom';

const WinPage = () => {
  const playerData = localStorage.getItem('player');
  let playerUpdate = {};
  if (playerData) {
    playerUpdate = JSON.parse(playerData);
  }
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate('/start')
  }
  return (
    <div className="container">
      <h1>Поздравляем! Вы - победитель! 🎉</h1>
      <img src={KnightImage} alt="Knight" />
      <p>
        <strong>{playerUpdate.Name}</strong>, вы выиграли абсолютно нихуя! 🏆
      </p>
      <p>
        Мы хотим поздравить вас с этой блестящей победой! Вы
        продемонстрировали, что можете потратить своё время на игру, которая сделана на коленке, и ваш успех является
        заслуженным.
      </p>
      <p>
       
      </p>
      <button onClick={handleClick}>Получить приз! 🎁</button>
    </div>
  );
};

export default WinPage;