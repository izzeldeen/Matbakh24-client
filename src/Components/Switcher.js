import { useState } from "react"

export default function SwitcherView({status,onChange}){

    const handleClick=()=>{
        setChecked(!checked)
        onChange(checked==true?0:1)
    }
    const [checked,setChecked] = useState(status)
    return  <img  onClick={handleClick}
    id="check-btn"  src={checked==true?"../../img/on-button.png":"../../img/off-button.png"}/>
 
}