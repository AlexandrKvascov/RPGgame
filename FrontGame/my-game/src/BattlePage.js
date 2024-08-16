import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setStartBattle } from "./api.js";

const BattlePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hp, setHp] = useState(location.state.Hp);
  const [enemyHp, setEnemyHp] = useState(location.state.enemyHp);
  const [damage, setDamage] = useState(location.state.damage);
  const [enemyDamage, setEnemyDamage] = useState(location.state.enemyDamge);

  const startBattle = async () => {
    const response = await setStartBattle("battle");
   
    const battleResult = response
    console.log(battleResult)
    let Myhp = hp
    let enemyhp = enemyHp
    if (battleResult > 10) {
        enemyhp = enemyHp-damage
      setEnemyHp(enemyHp - damage);
    } else {
         Myhp = hp-enemyDamage
      setHp(hp-enemyDamage);
    }
   
    console.log(Myhp)
    if (enemyhp <= 0) {
        await setStartBattle("win");
        
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