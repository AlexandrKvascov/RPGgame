// src/GamePage.js
import React, { useState, useEffect } from 'react';
import ButtonMove from './ButtonMove';
import { useNavigate } from 'react-router-dom';
import { initPlayer } from './api';

const GamePage = () => {

 

  const [playerUpdate, setPlayerUpdate] = useState()
  const [location, setLocation] = useState(null);
  const npc = JSON.parse(localStorage.getItem('npc'));
  const [isInCombat, setIsInCombat] = useState(false);
  const navigate = useNavigate();
  useEffect(() =>{
    async function loadPlayers() {
    const playerUpdate = await initPlayer();
    console.log(playerUpdate)
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
        enemyHp: npc.Health,
        enemyDamge: npc.Strength,
        Hp:playerUpdate.Health,
        damage:playerUpdate.Strenght,
        EnemyId: npc.Id,
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
    <div>
      <h2>Параметры персонажа:</h2>
      <ul>
        <li>Имя: {playerUpdate?.Name}</li>
        <li>Здоровье: {playerUpdate?.Health}</li>
        <li>Сила: {playerUpdate?.Strenght}</li>
        <li>Уровень: {playerUpdate?.Lvl}</li>
        <li>HP: {playerUpdate?.Hp}</li>
        <li>Exp: {playerUpdate?.Exp}/100</li>
      </ul>
      {location ? (
        <div>
          <p>Вы находитесь в {location[0]}</p>
          <li>Соперник: {npc.Type}</li>
          <li>Здоровье: {npc.Health}</li>
          <li>Сила: {npc.Strength}</li>
          <li>Уровень: {npc.Lvl}</li>
          <li>Ореаол обитания : {npc.Location}</li>
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
  );
};

export default GamePage;