import React, { useState, useEffect } from 'react';
import styles from "./styles.module.css";
import KnightGet from "./image/KnightFight.gif"
import EnemyTake from "./image/OgreTakeDamage.gif"
import KnightTake from"./image/KnightTakeDamage.gif"
import EnemeyGet from "./image/OgreSetDamage.gif"

function PlayerPunch  ()  {
  const [heroAnimation, setHeroAnimation] = useState(false);

  useEffect(() => {
    setHeroAnimation(true);
    setTimeout(() => {
      setHeroAnimation(false);
    }, 1000000);
  }, []);

  return (
    <div
      className={`hero ${heroAnimation ? 'animate' : ''}`}
      style={{
       
       
        backgroundPosition: '0% 100%',
        transition: 'background-position 1s ease-in-out',
      }}
    >
      
      <img src={KnightGet} alt="Knight"/>
      <img src={EnemyTake}/>
      
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

       
        backgroundPosition: '0% 100%',
        transition: 'background-position 1s ease-in-out',
      }}
    >
      {/* Враг, выглядит как огонь */}
      <img src={KnightTake} alt="Knight"/>
      <img src={EnemeyGet}/>
    </div>
  );
}



export  {EnemyPunch, PlayerPunch};