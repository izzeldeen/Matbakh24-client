import { toast } from 'react-toastify';


export default function Notify(type){
  if(type==0){
   return toast.success("error", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme:"colored",
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
  }else if(type==1){
    return toast.error("error", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        theme:"colored",
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
  }else{
    return toast.warn(type, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        theme:"colored",
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
  }
}
