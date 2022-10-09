export default function hasRole(role){
    if(localStorage.getItem('role')=="admin"){
       if(localStorage.getItem('roles')?.includes(role)){
           return true;
       }else if(localStorage.getItem('email')=="admin@matbakh24.com"){
           return true;
       }else{
        return false;
       }
    }else{
       return false;
    }
   }