import { useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";
var userName;
var password;
export default function Login({error}) {
  var [errors, setErrors] = useState();

  const login = async () => {
    console.log(userName + "  " + password);
    if (!userName) {
      setErrors("اكتب اسم المستخدم");
      return;
    }
    if (!password) {
      setErrors("اكتب كلمة المرور");
      return;
    }
    try {
      const response = await fetch(window.baseurl+"auth/admin-login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.token) {
        localStorage.setItem("token", json.token);
        localStorage.setItem("id", json.user.id);
        localStorage.setItem("email", json.user.email);
        console.log(json.user.email);
        localStorage.setItem("role", json.user.role);
        localStorage.setItem("name", json.user.fullName);
        localStorage.setItem("roles", json.user.roles);
        console.log(json.user.roles);
        window.location.href = "/admin";
      } else {
        setErrors("اسم المستخدم أو كلمة المرور");
      }
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <section className="appHome">
        <div className="container">
          <div className="homeUser">
            <div className="row">
              <div className="col-md-8">
                <div className="UserForm">
                {error&&<div class="alert alert-danger" role="alert">
 ليس لديك صلاحية للدخول إلي هذه الصفحة
</div>}
                  <h2> إدارة تطبيق مطبخ 24/7</h2>
                  <p>
                    لكي تتمكن من الدخول لابد ان يكون لديك حساب خاص بك يقوم مدير
                    المكتب بانشاءه ومن ثم الدخول من خلاله اذا كنت تواجه أي مشكله
                    بالرجاء الرجوع لمدير المكتب ليساعدك علي الحل
                  </p>
                  <form>

            <div className="col-md-12">
            <div className="input-group">
              <div className="input-group-prepend">
              </div>
              <input  onChange={(e) =>
                        e.target.value != undefined
                          ? (userName = e.target.value)
                          : console.log("")
                      } type="text" className="form-control" placeholder="البريد الالكتروني" />
            </div>
          </div>

          <div className="col-md-12">
            <div className="input-group">
              <div className="input-group-prepend">
              </div>
              <input onChange={(e) =>
                        e.target.value != undefined
                          ? (password = e.target.value)
                          : console.log("")
                      }
                      
                      type="password" className="form-control" placeholder="كلمة المرور" />
            </div>
          </div>
                 
                   
                  </form>
                  <div className="flex forgetPass">
                    
                  
                  </div>
                  <button onClick={login} className="systemBtn bg-[#FFCA08] text-[black]" type="button">
                    دخول
                  </button>
                 
                </div>
                {/*end UserForm*/}
              </div>
              <div className="col-md-4">
                <div className="logoPart">
                    <img className="LogoBack" width={'100%'} src="img/appLogo.png" alt="img" />
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
          {/*end homeUser*/}
        </div>
        {/*end container*/}
      </section>
    </div>
  );
}
