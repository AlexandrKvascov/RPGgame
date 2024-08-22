import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SetExp, setStartBattle } from "./api.js";
import { EnemyPunch, PlayerPunch } from "./AnimationPuch.js";

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
      console.log(location.state.exp)
      const lvl = await SetExp(location.state.EnemyId, location.state.MeId, location.state.exp)
      localStorage.getItem("direction", JSON.stringify(lvl))
    } else if (Myhp <= 0) {
      await setStartBattle("lose");
    }
  };

  return (
    <div>
      <h2>Battle Page</h2>
      <p>Player HP: {hp}</p>
      <p>Enemy HP: {enemyHp}</p>
      <p>Battle State: </p>
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
  );
};

export default BattlePage;