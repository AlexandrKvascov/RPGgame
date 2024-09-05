// src/GamePage.js
import React, { useState, useEffect } from 'react';
import ButtonMove from './ButtonMove';
import { useNavigate } from 'react-router-dom';
import { initPlayer } from './api';
import KnightImage from "./image/KnightState.gif"
import './styles/GamePage.css'

const GamePage = () => {

 

  const [playerUpdate, setPlayerUpdate] = useState()
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();
  const npc = JSON.parse(localStorage.getItem('npc'));

  const [isInCombat, setIsInCombat] = useState(false);
  useEffect(() =>{
    async function loadPlayers() {
    const playerId = JSON.parse(localStorage.getItem('playerId'))
    const playerUpdate = await initPlayer(playerId);
    setPlayerUpdate(playerUpdate);
    localStorage.setItem('player', JSON.stringify(playerUpdate));
  }
    loadPlayers();
  },[]);

  useEffect(() => {
    const direction = JSON.parse(localStorage.getItem('direction'));

    if (direction) {
      setLocation(direction);
    }
  }, []);

  const handleAcceptCombat = () => {
    setIsInCombat(true);
    const status = {
        enemyHp: npc[0].Health,
        enemyDamge: npc[0].Strength,
        Hp:playerUpdate.Health,
        damage:playerUpdate.Strenght,
        EnemyId: npc[0].Id_npc,
        MeId: playerUpdate.Id,
        exp: playerUpdate.Exp
    }
  
   
    navigate('/battle', {state: status})
  };

  const handleDeclineCombat = () => {
    setLocation(null);
    setIsInCombat(false);
  };

  return (
    <body className='GamePage'>
    <div>
      <div className='StatusContainer'>

      <h3 className='Personh2'>Параметры персонажа:</h3>
      <ul className='StatusPlayer'>
        <li>Имя: {playerUpdate?.Name}</li>
        <li className='Health'>Здоровье: {playerUpdate?.Health}</li>
        <li>Сила: {playerUpdate?.Strenght}</li>
        <li>Уровень: {playerUpdate?.Lvl}</li>
        <li>HP: {playerUpdate?.Hp}</li>
        <li className='Exp'>Exp: {playerUpdate?.Exp}/100</li>
      </ul>
      </div>
      <div>
        <img src={KnightImage}/> 
      </div>
      {location ? (
        <div className='NpcInfo'>
          <p>Вы находитесь в {location[0]}</p>
          <li>Соперник: {npc[0].Type}</li>
          <li>Здоровье: {npc[0].Health}</li>
          <li>Сила: {npc[0].Strength}</li>
          <li>Уровень: {npc[0].Lvl}</li>
          <li>Ореаол обитания : {npc[0].Location}</li>
          {isInCombat ? (
            <p>Вы в бою!</p>
          ) : (
            <div>
              <button onClick={handleAcceptCombat}>Принять бой</button>
              <button onClick={handleDeclineCombat}>Отказаться от боя</button>
            </div>
          )}
        </div>
      ) : (
        <ButtonMove setLocation={setLocation} />
      )}
    </div>
    </body>
  );
};

export default GamePage;