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
    <div className="card col-8 card-default m-3 roles">
                  <h1 className="my-3">{row?.fullName}</h1>

        <div
          className="p-3 d-flex justify-content-between border"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <h2 >الصلاحيات</h2>
        
        </div>
        {/* /.card-header */}
      
    
      {<div className="m-3 checks">

        <div className="form-check2 ">
          <input
            className="form-check-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " home"
              } else {
                userRoles = userRoles.replace('Home', "")
              }
            }}
            type="checkbox" />
          <label className="check-lable">الرئيسية</label>
        </div>

        {/* <div className="form-check2 ">
          <input
            className="form-check-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " managers"
              } else {
                userRoles = userRoles.replace('managers', "")
              }
            }}
            type="checkbox" />
          <label className="check-lable">الإداريين</label>
        </div> */}


        {/* <div className="form-check2 ">
          <input
            className="form-check-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " add-manager"
              } else {
                userRoles = userRoles.replace('add-manager', "")
              }
              console.log(userRoles);

            }}
            type="checkbox" />
          <label className="check-lable">إضافة الإداريين</label>
        </div> */}


        <div className="form-check2 ">
          <input
            className="form-check-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " accounts"
              } else {
                userRoles = userRoles.replace('accounts', "")
              }
              console.log(userRoles);

            }}
            type="checkbox" />
          <label className="check-lable">المستخدمين</label>
        </div>

        <div className="form-check2 ">
          <input
            className="form-check-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " providers"
              } else {
                userRoles = userRoles.replace('providers', "")
              }
            }}
            type="checkbox" />
          <label className="check-lable">الطباخين</label>
        </div>

        {/* <div className="form-check2 ">
          <input
            className="form-check-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " edit-provider"
              } else {
                userRoles = userRoles.replace('edit-provider', "")
              }
              console.log(userRoles);

            }}
            type="checkbox" />
          <label className="check-lable">تفعيل / تعطيل الطباخين</label>
        </div> */}



        <div className="form-check2 ">
          <input
            className="form-check-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " drivers"
              } else {
                userRoles = userRoles.replace('drivers', "")
              }
              console.log(userRoles);

            }}
            type="checkbox" />
          <label className="check-lable">المناديب</label>
        </div>

        {/* <div className="form-check2 ">
          <input
            className="form-check-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " edit-driver"
              } else {
                userRoles = userRoles.replace('edit-driver', "")
              }
              console.log(userRoles);

            }}
            type="checkbox" />
          <label className="check-lable"> تفعيل / تعطيل الطباخين</label>
        </div> */}

        <div className="form-check2 ">
          <input
            className="form-check-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " foods"
              } else {
                userRoles = userRoles.replace('foods', "")
              }
            }}
            type="checkbox" />
          <label className="check-lable">الطبخات</label>
        </div>


        {/* <div className="form-check2 ">
          <input
            className="form-check-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " edit-food"
              } else {
                userRoles = userRoles.replace('edit-food', "")
              }
            }}
            type="checkbox" />
          <label className="check-lable">تعديل الطبخات</label>
        </div> */}

        <div className="form-check2 ">
          <input
            className="form-check-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " reports"
              } else {
                userRoles = userRoles.replace('reports', "")
              }
            }}
            type="checkbox" />
          <label className="check-lable">التقارير</label>
        </div>


        <div className="form-check2 ">
          <input
            className="form-check-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " orders"
              } else {
                userRoles = userRoles.replace('orders', "")
              }
            }}
            type="checkbox" />
          <label className="check-lable">الطلبات</label>
        </div>

        <div className="form-check2 ">
          <input
            className="form-check-input"
            onChange={(e) => {
              if (e.target.checked) {
                userRoles = userRoles + " support"
              } else {
                userRoles = userRoles.replace('support', "")
              }
            }}
            type="checkbox" />
          <label className="check-lable"> الشكاوي</label>
        </div>
        <div className="form-check2 "></div>
        <div className="form-check2 "></div>
        <div className="form-check2 "></div>

      </div>}

      <div onClick={
        (e)=>{
            postForm()
        }
      } className="systemBtn bg-[#FFCA08] mx-[30px] rounded-[10px] w-[150px] text-center   font-bold">
                  حفظ
                </div>
    </div>
  );
}
