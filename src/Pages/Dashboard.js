import React from "react";
import { Link, Outlet } from "react-router-dom";
import SideMenu from "../Components/SideMenu";

export default class Dashboard extends React.Component{
  componentDidMount(){
  }
  constructor(props){
  super(props)
  }

   render (){
     return <section className="latestFiles ">
     <div className="mobHead">
       <div className="px-3">
         <div className="row flex justify-between">
          <Link to={"/admin/home"}>
          <div className=''>
      <i class="fa-solid fa-bars mx-3 text-[80px] text-[black]"></i>
      </div>
          </Link>
           <div className="col-6">
             <img src="https://i1.wp.com/www.nabd.dk/wp-content/uploads/2020/04/avatar-png-1.png?ssl=1" alt="img" />
           </div>
         </div>
       </div>
     </div>
     <div className="outing" />
     {/*end mobHead*/}
     <div className="container-fluid">
        <SideMenu/>
       <div className="innerContent">
          <Outlet/>
       </div>{/*end innerContent*/}
     </div>{/*end container*/}
   </section>
   }       

}