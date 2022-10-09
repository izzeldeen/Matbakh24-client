import { useState } from "react"
import { useLocation } from "react-router-dom"
import CusineMeals from "./CusineMeals"
import Foods from "./Foods"
import ProviderDetails from "./ProvideerDetails"

export default function CusinePage(){
    const [index,setIndex] = useState(0)

    const location = useLocation();
    const row = location.state.row;

    const handelSelect = (index)=>{
     setIndex(index)
    }

    const selectedStyle = "w-[200px]  h-[40px] text-[white] font-bold cursor-pointer flex justify-center items-center bg-[green]   border-4 border-[2px]";
    const unSelectedStyle = "w-[200px] h-[40px] text-[black] font-bold cursor-pointer flex justify-center items-center bg-[white]  border-4 border-[2px]";

    return <div>
        <div className="flex m-auto h-[40px]  flex justify-center items-center">
            <div onClick={(e)=>handelSelect(0)} className={(index==0?selectedStyle:unSelectedStyle)+" rounded-r-lg"}>
                <div className="m-auto ">تفاصيل المطبخ</div>
            </div>

            <div onClick={(e)=>handelSelect(1)} className={(index==1?selectedStyle:unSelectedStyle)+" rounded-l-lg"}>
            <div className="m-auto ">قائمة الطبخات</div>
            </div>

        </div>
        <div className="m-3 p-3">
            {index==0?<ProviderDetails row={row}/>:<CusineMeals row={row}/>}
        </div>
    </div>
}