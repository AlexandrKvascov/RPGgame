import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerPlayer, loginPlayer } from './api';
import "./styles/loginStyle.css"

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (isLogin) {
      const player = await loginPlayer(username, password);
      if (player) {
        localStorage.setItem('userId', JSON.stringify(player));
        navigate('/start'); // Переход на страницу StartPage
      } else {
        alert('Неправильный логин или пароль');
      }
    } else {
      const player = await registerPlayer(username, password);
      if (player) {
        localStorage.setItem('userId', JSON.stringify(player[1]));
        navigate('/start'); // Переход на страницу StartPage
      } else {
        alert('Ошибка регистрации');
      }
    }
  };

  return (
    <body className='loginPage'>
        <div>

      <h2 >{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <div className="input-group">
      <input type="text" className="name" value={username} onChange={(e) => setUsername(e.target.value)} placeholder=" " />
      <label>Login</label>
      </div>
      <div className="input-group">
      <input type="password" className="name" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " />
      <label >Password</label>
      </div>
      <button className ="loginPgButton" onClick={handleAuth}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
      <button className ="loginPgButton" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Регистрация' : 'Вход'}</button>
    </div>
      </body>
  );
};

export default AuthPage;