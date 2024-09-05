import React from 'react';
import KnightImage from "./image/KnightState.gif"
import { useNavigate } from 'react-router-dom';
import {reLife} from './api.js'

const LosePage = () => {
  const playerData = localStorage.getItem('player');
  let playerUpdate = {};
  if (playerData) {
    playerUpdate = JSON.parse(playerData);
  }
  const navigate = useNavigate();
  const NewGame = () =>{
    navigate('/start')
  }
  const ReLife = () =>{
    const playerId = JSON.parse(localStorage.getItem('playerId'))
    reLife(playerId)
    setTimeout(()=>
    
        {navigate('/game')},1500
    )
  }
  const Loser = () =>{
    alert("ну и иди ты нахуй\n Слабак")
    navigate('/start')
  }
  return (
    <div className="container">
      <h1>Поздравляем! Вы - проиграли! 🎉</h1>
      <img src={KnightImage} alt="Knight" />
      <p>
        <strong>{playerUpdate.Name}</strong>, вы выиграли абсолютно нихуя! 🏆
      </p>
      <p>
       Проиграл и проиграл, что бубнить то, у тебя есть три варианта
        на выбор:
        <ul>
          <li>Начать заново с другим персонажем</li>
          <li>Начать заново, но с этим же,хз зачем, при создание можешь тоже самое имя выбрать</li>
          <li>Или прекратить играть, мне конечно будет не приятно, но это твоя жизнь</li>
        </ul>
      </p>
      <p>
       
      </p>
      <button onClick={NewGame}>Новая игра</button>
      <button onClick={ReLife}>С тем же персонажем</button>
      <button onClick={Loser}>Выход</button>
    </div>
  );
};

export default LosePage;