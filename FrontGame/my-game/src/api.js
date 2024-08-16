// src/api.js
const apiUrl = 'http://localhost:8080/newgame';

const getPlayer = async (name) => {
    const url = new URL(apiUrl);
    url.searchParams.set('name', name);
  
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const player = await response.json();
    console.log(player)
    return player;
  };
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
      console.log(result)
      return result;
}


const setNpc = async()=>{
    const url = new URL("http://localhost:8080/battle")
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    const result = await response.json()
    console.log(result)
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
    console.log(11)
    console.log(result)
    return result;
  };

export  { getPlayer, setMove, setNpc, setStartBattle};