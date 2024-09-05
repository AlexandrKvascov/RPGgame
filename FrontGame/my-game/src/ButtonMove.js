import {setMove} from "./api.js"
import { setNpc } from './api.js';
import { useNavigate } from 'react-router-dom';

const ButtonMove =({setLocation})=>{
 
    const navigate = useNavigate();
    const handleClick = async(move)=>{
        const playerId = JSON.parse(localStorage.getItem('playerId'))
        const npc = await setNpc(playerId)
        if (npc == null){
            navigate("/win")
        }
        const direction = await setMove(move)
        localStorage.getItem("direction", JSON.stringify(direction))
    
        
        localStorage.setItem("npc", JSON.stringify(npc))
        setLocation(direction)
    }
    return (
        <div>
        <button onClick={()=>handleClick("n")}>Север</button>
        <button onClick={()=>handleClick("e")}>Восток</button>
        <button onClick={()=>handleClick("w")}>Запад</button>
        <button onClick={()=>handleClick("s")}>Юг</button>
        </div>
    )
}

export default ButtonMove;