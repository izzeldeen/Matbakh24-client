import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
var userRoles = ""
export default function Roles() {
  const navigate = useNavigate();
  const location =useLocation()
  const row = location.state?.row
  const postForm = async () => {
    console.log(userRoles);
    const formdata = new FormData();
    formdata.append("userId", row?.id)
    formdata.append("roles", userRoles)
    try {
      const response = await fetch(window.baseurl + "admin/update-roles", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: formdata,
      });
      const json = await response.json();
      console.log(json);
      navigate("/admin/admins");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="row">
  <div className="card col-12 card-default m-3 roles">
                  <h1 className="my-3">{row?.fullName}</h1>

        <div
          className="p-3 d-flex justify-content-between border"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <h2 >الصلاحيات</h2>
        
        </div>
        <div className="row role-container">
        <div className="col-md-6 role-item">
        <input className="role-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " home"
              } else {
                userRoles = userRoles.replace('Home', "")
              }
            }}
            type="checkbox" />
             <label className="role-label">الرئيسية</label>
        </div>
        <div className="col-md-6 role-item">
        <input
            className="role-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " accounts"
              } else {
                userRoles = userRoles.replace('accounts', "")
              }
              console.log(userRoles);

            }}
            type="checkbox" />
             <label className="role-label">المستخدمين</label>
        </div>
        <div className="col-md-6 role-item">
        <input
            className="role-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " providers"
              } else {
                userRoles = userRoles.replace('providers', "")
              }
            }}
            type="checkbox" />
             <label className="role-label">الطباخين</label>
        </div>

        

        <div className="col-md-6 role-item">
        <input
            className="role-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " drivers"
              } else {
                userRoles = userRoles.replace('drivers', "")
              }
              console.log(userRoles);

            }}
            type="checkbox" />
             <label className="role-label">المناديب</label>
        </div>

        <div className="col-md-6 role-item">
        <input
            className="role-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " reports"
              } else {
                userRoles = userRoles.replace('reports', "")
              }
            }}
            type="checkbox" />
             <label className="role-label">التقارير</label>
        </div>

        <div className="col-md-6 role-item">
        <input
            className="role-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " orders"
              } else {
                userRoles = userRoles.replace('orders', "")
              }
            }}
            type="checkbox" />
             <label className="role-label">الطلبات</label>
        </div>

        <div className="col-md-6 role-item">
        <input
            className="role-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " support"
              } else {
                userRoles = userRoles.replace('support', "")
              }
            }}
            type="checkbox" />
             <label className="role-label">الشكاوي</label>
        </div>


        </div>
      
        <div  onClick={
        (e)=>{
            postForm()
        }
      } className="systemBtn bg-[#FFCA08]  rounded-[10px] w-[150px] text-center   font-bold role-save-btn">
                  حفظ
                </div>
        </div>
        {/* /.card-header */}

  
   
    </div>
  
  );
}
