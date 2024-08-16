import {setMove} from "./api.js"
import { setNpc } from './api.js';
const ButtonMove =({setLocation})=>{
    const handleClick = async(move)=>{
        console.log(move)
        const direction = await setMove(move)
        localStorage.getItem("direction", JSON.stringify(direction))
        const npc = await setNpc()
        
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