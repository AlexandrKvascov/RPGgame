// src/api.js
const loginPlayer = async(username, password)=>{
  const url = new URL("http://localhost:8080/auth")
  const data = { username: username, password: password }; // создаем объект с данными
  
  const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // преобразуем объект в строку JSON и передаем в теле запроса
    })
    const result = await response.json();
    return result;
  }
  
  const registerPlayer = async(username, password)=>{
    const url = new URL("http://localhost:8080/registr")
    const data = { login: username, password: password };
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // преобразуем объект в строку JSON и передаем в теле запроса
    })
    const result = await response.json();
    return result;
  }
  
  
  const getPlayer = async (name,userId) => {
    const apiUrl = 'http://localhost:8080/newgame';
    const url = new URL(apiUrl);
    const data = {Name: name, UserId: userId}
  
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // преобразуем объект в строку JSON и передаем в теле запроса

    });
    const result = await response.json();
    return result;
   
  };

  const loadPlayer = async(userID)=>{
    const url = new URL("http://localhost:8080/load")
    url.searchParams.set('user', userID)
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    const result = await response.json()
    return result
  }


const setMove = async(move)=>{
    const url = new URL("http://localhost:8080/move")

    url.searchParams.set('direction', move);
    const response = await fetch(url,{
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.json();
      return result;
}


const setNpc = async(playerId)=>{
  const url = new URL("http://localhost:8080/battle")
  url.searchParams.set('playerID', playerId)
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    const result = await response.json()
    return result
}

// api.js
const setStartBattle = async (status) => {
    const url = new URL("http://localhost:8080/getbattle")
    const data = { coin: status }; // создаем объект с данными
    
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // преобразуем объект в строку JSON и передаем в теле запроса
    })
    
    const result =  response.json();
    return result;

  };

const SetExp = async (status1, status2, exp, playerId) =>{
  const url = new URL("http://localhost:8080/newLvl")
  const data = { EnemyId: parseInt(status1), ExpNewLvl: parseInt(status2), MeExp: parseInt(exp), playerId: parseInt(playerId)}
  const response  = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // преобразуем объект в строку JSON и передаем в теле запроса
})

const result = response.json()
return result

}
const initPlayer = async (playerId)=>{
  const url = new URL("http://localhost:8080/initPlayer")
  url.searchParams.set('player', playerId)
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
const result = await response.json()

return result
}

export  { getPlayer, setMove, setNpc, setStartBattle, SetExp, initPlayer, loginPlayer, registerPlayer, loadPlayer };