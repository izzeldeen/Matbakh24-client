import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Spinner";
import React from 'react';
export default function Cars(){

var [data, setData] = useState(null);
const navigate = useNavigate()

const getData = async () => {
  try {
    const response = await fetch(window.baseurl+"cars/get-all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem("token")
      },
    });
    const json = await response.json();
    console.log(json);
    setData(json);
    return json;
  } catch (error) {
    console.error(error);
  }
};

if (data == null){

  getData();
} 

    return <div className="row">
    <div className="col-md-12">
      <h4 className="titleSection"> السيارات</h4>
     {data == null ? (
                <Loading/>
              ) : <div className="table-responsive">
        <table className="table filesTable table-striped" id="example"> 
          <thead>
            <tr>
              <th scope="col"><input type="checkbox" /></th>
              <th scope="col"><i className="fa fa-star" /></th>
              <th scope="col">م</th>
              <th scope="col">الشركة المصنعة</th>
              <th scope="col">الموديل</th>
              <th scope="col">سنة الصنع</th>
              <th scope="col">الاسم</th>
              <th scope="col">الهاتف</th>
              <th scope="col">تاريخ</th>
            </tr>
          </thead>
          <tbody>
              { data.map((e,index)=>      
                    <tr>
              <td><input type="checkbox" /></td>
              <td><i className="fa fa-star" /></td>
              <td>{index+1}</td>
              <td>{e?.detail.type.split("T")[0]}</td>
              <td>{e?.detail.model}</td>
              <td>{e?.detail.year}</td>
              <td>{e?.user?.fullName}</td>
              <td>{e?.user?.userName}</td>
              <td>{e?.detail.createdAt.split("T")[0]}</td>
            </tr>)}

           
          </tbody>
        </table>

      </div>
      }
    </div>
  </div>
  
}