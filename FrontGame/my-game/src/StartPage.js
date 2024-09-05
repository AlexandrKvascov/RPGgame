import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlayer, loadPlayer } from './api';
import "./styles/StartStyle.css"
const StartPage = () => {
  const [name, setName] = useState('');
  const [loadCharacter, setLoadCharacter] = useState(false);
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  const handleNewGame = async () => {
    setLoadCharacter(false);
  };

  const handleLoad = async () => {
    setLoadCharacter(true);
    const userId = JSON.parse(localStorage.getItem('userId'))
    const response = await loadPlayer(userId);
    setCharacters(response);
  };

  const handleStart = async () => {
    if (loadCharacter) {
      // выбрать персонажа из списка

      const character = characters.find((character) => character.Name === name);
      localStorage.setItem('playerId', JSON.stringify(character.Id))

      if (character) {
        // перейти на страницу GamePage с выбранным персонажем
        navigate('/game');
      } else {
        alert('Персонаж не найден');
      }
    } else {
      // создать нового персонажа
      const userId = JSON.parse(localStorage.getItem('userId'))
      const playerid = await getPlayer(name, userId);
      localStorage.setItem('playerId', JSON.stringify(playerid))
      navigate('/game'); // Переход на страницу GamePage
    }
  };

  return (
    <body className='StartPage'>
    <div>
      <button className= "StartButton"  onClick={handleNewGame}>Новая игра</button>
      <button className= "StartButton"  onClick={handleLoad}>Загрузить</button>
      
  {loadCharacter ? (
    <div className='loadPerson'>
    <ul>
      {characters.map((character) => (
        <li className='menu-item' key={character.Id}>
          <input
          className='InputPerson'
            type="checkbox"
            checked={name === character.Name}
            onChange={() => setName(character.Name)}
          />
          <span>{character.Name}</span>
        </li>
      ))}
    </ul>
          <button className= "StartButton" onClick={handleStart}>Старт</button></div>
  ) : (
    <div>
      <div className='NameInpGroup'>

    <input
    className="InputPerson"
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder=" "
    />
    <label>Name</label>
      </div>
    <button className= "StartButton" onClick={handleStart}>Старт</button>
    </div>
 
    
  )}
</div>
</body>
  );
};

export default StartPage;