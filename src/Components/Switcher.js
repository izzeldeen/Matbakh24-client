import { useEffect, useState } from "react"

export default function SwitcherView({status,onChange}){

    const [checked,setChecked] = useState(status)

    useEffect(() => {
        setChecked(checked)
      }, [checked]);

    const handleClick=()=>{
        setChecked(!checked)
        onChange(checked==true?0:1)
    }
    return  <img  onClick={handleClick}
    id="check-btn"  src={checked==true?"../../img/on-button.png":"../../img/off-button.png"}/>
 
}