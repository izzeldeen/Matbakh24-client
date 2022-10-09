import { Link, useLocation, useNavigate } from "react-router-dom";
import React from 'react';
import hasRole from "../Functions";
export default function SideMenu() {
  let navigate = useNavigate();
  let location = useLocation();
  function isActive(route) {
    console.log(location.pathname);
    return location.pathname == route ? "dropdown-btn active" : "dropdown-btn";
  }
  return (
    <div className="sideMenu">
     <div className="userDetails ">
        <img
          className="userImg m-auto"
          src="https://i1.wp.com/www.nabd.dk/wp-content/uploads/2020/04/avatar-png-1.png?ssl=1"
        />
        <div className=" mt-[20px] text-[15px]"> {localStorage.getItem("name")}</div>
        <small className="userTitle">ادمن</small>
      </div>
      <div className="sidenav">
        {hasRole("home")&&<button
          onClick={(e) => navigate("/admin/home")}
          className={isActive("/admin/home")}
        >
          الرئيسية <i className="fa-solid fa-house icon" />
          <i className="fa fa-caret-down" />
        </button>}



       {hasRole("managers")&& <button
          onClick={(e) => navigate("/admin/admins")}
          className={isActive("/admin/admins")}
        >
          الاداريين <i className="fa-solid fa-users icon" />
          <i className="fa fa-caret-down" />
        </button>}

        {hasRole("accounts")&&<button
          onClick={(e) => navigate("/admin/accounts")}
          className={isActive("/admin/accounts")}
        >
          المستخدمين <i className="fa-solid fa-users icon" />
          <i className="fa fa-caret-down" />
        </button>}


       {hasRole("providers")&& <button
          onClick={(e) => navigate("/admin/providers")}
          className={isActive("/admin/providers")}
        >
          الطباخين<i class="fa-solid fa-user-group icon"></i>
          <i className="fa fa-caret-down" />
        </button>}

        {hasRole("drivers")&&<button
          onClick={(e) => navigate("/admin/drivers")}
          className={isActive("/admin/drivers")}
        >
          المناديب <i className="fa-solid fa-car icon" />
          <i className="fa fa-caret-down" />
        </button>}

        {hasRole("foods")&&<div
          onClick={(e) => navigate("/admin/foods")}
          className={isActive("/admin/foods")}
        >
          الطبخات <i className="fa-solid fa-clipboard-list icon" />
          <i className="fa fa-caret-down" />
        </div>}

        {hasRole("orders")&&<div
          onClick={(e) => navigate("/admin/orders")}
          className={isActive("/admin/orders")}
        >
          الطلبات <i className="fa-solid fa-clipboard-list icon" />
          <i className="fa fa-caret-down" />
        </div>}


        {hasRole("reports")&& <button
          onClick={(e) => navigate("/admin/reports")}
          className={isActive("/admin/reports")}
        >
          تقارير الطلبات  <i className="fa-solid fa-users icon" />
          <i className="fa fa-caret-down" />
        </button>} 

    {/* {hasRole("managers")&& <button
          onClick={(e) => navigate("/admin/admins")}
          className={isActive("/admin/admins")}
        >
          تقرير الطلبات تفصيلي <i className="fa-solid fa-users icon" />
          <i className="fa fa-caret-down" />
        </button>} */}

        <button onClick={(e)=>navigate("/admin/transactions")} className={isActive("/admin/transactions")}>

            العمليات المالية <i className="fa-solid fa-credit-card icon" />
            <i className="fa fa-caret-down" />

          </button>

        {/* <button onClick={(e)=>navigate("/admin/drivers/add")} className={isActive("/admin/drivers/add")}>
            إضافة سائق جديد <i className="fa-solid fa-user-group icon" />
            <i className="fa fa-caret-down" />
          </button> */}

{localStorage.getItem("role")=="admin"&&<div
          onClick={(e) => navigate("/admin/settings")}
          className={isActive("/admin/settings")}
        >
          الإعدادات <i className="fa-solid fa-gear icon" />
          <i className="fa fa-caret-down" />
        </div>}

          
        {hasRole("support")&&<div
          onClick={(e) => navigate("/support")}
          className={isActive("/support")}
         >
        الشكاوي <i class="fa-solid fa-circle-question icon"></i>
          <i className="fa fa-caret-down" />
        </div>}
        <button onClick={(e) => navigate("/")} className="dropdown-btn">
          تسجيل الخروج <i className="fa fa-right-from-bracket icon" />
          <i className="fa fa-caret-down" />
        </button>
      </div>
     </div>
 
  );
}
