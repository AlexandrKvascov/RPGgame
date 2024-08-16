// src/GamePage.js
import React, { useState, useEffect } from 'react';
import ButtonMove from './ButtonMove';
import { useNavigate } from 'react-router-dom';

const GamePage = () => {
  const player = JSON.parse(localStorage.getItem('player'));
  console.log(player)
  const [location, setLocation] = useState(null);
  const npc = JSON.parse(localStorage.getItem('npc'));
  const [isInCombat, setIsInCombat] = useState(false);
  const navigate = useNavigate();

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
        Hp:player.Health,
        damage:player.Strenght,
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
        <li>Имя: {player.Name}</li>
        <li>Здоровье: {player.Health}</li>
        <li>Сила: {player.Strenght}</li>
        <li>Уровень: {player.Lvl}</li>
        <li>HP: {player.Hp}</li>
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