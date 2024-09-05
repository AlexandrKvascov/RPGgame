import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SetExp, setStartBattle } from "./api.js";
import { EnemyPunch, PlayerPunch } from "./AnimationPuch.js";

import KnightImage from "./image/KnightState.gif"
import OgreImage from "./image/OgreState.gif"
import './styles/BattlePage.css'
const BattlePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hp, setHp] = useState(location.state.Hp);
  const [enemyHp, setEnemyHp] = useState(location.state.enemyHp);
  const [damage, setDamage] = useState(location.state.damage);
  const [enemyDamage, setEnemyDamage] = useState(location.state.enemyDamge);
  const [showPlayerPunch, setShowPlayerPunch] = useState(false);
  const [showEnemyPunch, setShowEnemyPunch] = useState(false);

  const startBattle = async () => {
    const response = await setStartBattle("battle");
    const battleResult = response;
 
    let Myhp = hp;
    let enemyhp = enemyHp;

    if (battleResult > 10) {
      enemyhp = enemyHp - damage;
      setShowPlayerPunch(true);
      setTimeout(() => setShowPlayerPunch(false), 1000);
      setEnemyHp(enemyHp - damage);
    } else {
      Myhp = hp - enemyDamage;
      setShowEnemyPunch(true);
      setTimeout(() => setShowEnemyPunch(false), 1000);
      setHp(hp - enemyDamage);
    }


    if (enemyhp <= 0) {
      await setStartBattle("win");
      const playerId = JSON.parse(localStorage.getItem('playerId'))
      const lvl = await SetExp(location.state.EnemyId, location.state.MeId, location.state.exp, playerId)
      localStorage.getItem("direction", JSON.stringify(lvl))
    } else if (Myhp <= 0) {
      await setStartBattle("lose");
    }
  };

  return (
    <body className="BattlePage">

    <div>
      <h2>Battle Page</h2>
      <div className="BattleStats">
      <p>Player HP: {hp}</p>
      <div className="hp-bar">
      <div className="hp-bar-fill" style={{ width: `${(hp / 100) * 100}%` }}></div>
      </div>
      
      <p>Enemy HP: {enemyHp}</p>
      <div className="hp-bar">
      <div className="hp-bar-fill" style={{ width: `${(enemyHp / 100) * 100}%` }}></div>
      </div>
      </div>
      <div className="BattleImages">

      <p>Battle State: </p>
      {!showPlayerPunch &&!showEnemyPunch && (
        <div>
        <img src={KnightImage} alt="Knight" />
      <img src={OgreImage}  />
      </div>
        )}
      {showPlayerPunch && <PlayerPunch />}
    
      {showEnemyPunch && <EnemyPunch />}
      {hp <= 0 || enemyHp <= 0 ? (
        <button onClick={() => navigate("/game", { replace: true })}>
          Назад
        </button>
      ) : (
        <button onClick={startBattle}>Продолжить битву</button>
      )}
      </div>
    </div>
    </body>
  );
};

export default BattlePage;