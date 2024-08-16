import React, { useState, useEffect } from 'react';
import styles from "./styles.module.css";

function PlayerPunch  ()  {
  const [heroAnimation, setHeroAnimation] = useState(false);

  useEffect(() => {
    setHeroAnimation(true);
    setTimeout(() => {
      setHeroAnimation(false);
    }, 1000);
  }, []);

  return (
    <div
      className={`hero ${heroAnimation ? 'animate' : ''}`}
      style={{
        backgroundImage: 'linear-gradient(to bottom, #ffffff, #cccccc)',
        backgroundSize: '100% 300px',
        backgroundPosition: '0% 100%',
        transition: 'background-position 1s ease-in-out',
      }}
    >
      {/* Рыцарь */}
    </div>
  );
}

function EnemyPunch () {
  const [enemyAnimation, setEnemyAnimation] = useState(false);

  useEffect(() => {
    setEnemyAnimation(true);
    setTimeout(() => {
      setEnemyAnimation(false);
    }, 1000);
  }, []);

  return (
    <div
      className={`enemy ${enemyAnimation ? 'animate' : ''}`}
      style={{
        backgroundImage: 'linear-gradient(to bottom, #ff9900, #ff0000)',
        backgroundSize: '100% 300px',
        backgroundPosition: '0% 100%',
        transition: 'background-position 1s ease-in-out',
      }}
    >
      {/* Враг, выглядит как огонь */}
    </div>
  );
}



export  {EnemyPunch, PlayerPunch};