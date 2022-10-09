import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from 'react';
var city = "الجبيل"
export default function AddAdmin(){
    let navigate = useNavigate();
   

    const postForm = async (event) => {
        event.preventDefault()
        const formdata = new FormData(event.target)
    
        formdata.append('knownName',"admin")
        formdata.append('bank',"ahli")
        formdata.append('userName',formdata.get("email"))
        formdata.append('role',"admin")
        formdata.append('city',"-")
        formdata.append('identityNumber',"-")
        formdata.append('ProfileImage',"account.jpeg")

        try {
          const response = await fetch(window.baseurl+"auth/admin-signup", {
            method: "POST",
            headers: {
              "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:formdata
          });
          const json = await response.json();
          console.log(json);
          navigate("/admin/admins");
        } catch (error) {
          console.error(error);
        }
      };


    return <section className="addClient">
    <div className="clientHead">
      <div className="row">
        <div className="col-md-6 col-6">
          <h4>اضافة  مدير</h4>
        </div>

      </div>{/*end row*/}
    </div>{/*end clientHead*/}
    <div className="clientForm">
    <form  onSubmit={postForm}>
        <div className="row">
        <div className="col-md-12">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">@</span>
              </div>
              <input name="fullName" type="text" className="form-control" placeholder=" الاسم بالكامل" />
            </div>
          </div>

          {/* <div className="col-md-12">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">@</span>
              </div>
              <input name="userName" type="text" className="form-control" placeholder="  اسم المستخدم" />
            </div>
          </div> */}

          <div className="col-md-12">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">@</span>
              </div>
              <input name="email" type="text" className="form-control" placeholder="البريد الالكتروني" />
            </div>
          </div>

          <div className="col-md-12">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">@</span>
              </div>
              <input name="password" type="password" className="form-control" placeholder=" كلمة المرور" />
            </div>
          </div>

    
          <div className="col-md-12">
         </div>

        </div>
        <div className="btnGroub">
        <div className="row">
          <div className="col-md-12">
          <input className="systemBtn bg-[#FFCA08] text-[black] text-bold" value={"إنشاء الحساب"}  type="submit"
/>
          </div>
        </div>
      </div>
      </form>
     
    </div>
  </section>
  
  
}