import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Spinner";
import React from 'react';
import ChartView from "./charts/ApexChart";
import PieChartView from "./charts/PieChart";

import LineChartOrders from "./charts/LineChartOrders";
import OrderStatusChart from "./charts/OrderStatusChart";

import LineChart from "./charts/LineChart";
import DriversRateChart from "./charts/DriversRateChart";
export default function Home(){
  var [data, setData] = useState(null);

 const orderStatus = [
  "في انتظار التأكيد",
  "جاري تجهيز الطلب",
  "جاري التوصيل",
  "تم تسليم الطلب",
  "طلب ملغي",
];
const navigate = useNavigate()
const getData = async () => {
  try {
    const response = await fetch(window.baseurl+"admin/home", {
      method: "POST",
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
if (data == null) getData();
    return (data == null ? (
      <Loading/>
    ) :  <>
      <div className="headCon bg-[white]">
        <div className="row flex items-center">
          <div className="col-md-4 col-12">
            <div className="titlePage">
              <h1 className="text-dark">الاداء والتقييم </h1>
            </div>
          </div>
          <div className="col-md-2 col-6">
            <div className="statBox">
              <h5>عدد العملاء</h5>
              <small>{data.users}</small>
              <h5>عدد المناديب</h5>
              <small>{data.drivers}</small>
              <i className="fa fa-user" />
            </div>{/*end statBox*/}
          </div>
          <div className="col-md-2 col-6">
            <div className="statBox">
              <h5>عدد الطباخين</h5>
              <small>{data.providers}</small>
              <h5>عدد الطبخات</h5>
              <small>{data.meals}</small>
            </div>{/*end statBox*/}
          </div>
          <div className="col-md-2 col-6">
            <div className="statBox">
              <h5> الطلبات المكتملة</h5>
              <small>{data.completedOrders}</small>
              <h5> الطلبات الجارية</h5>
              <small>{data.currentOrders}</small>
        
            </div>{/*end statBox*/}
          </div>
          <div className="col-md-2 col-6">
            <div className="statBox">
              <h5>اجمالي الدخل</h5>
              <small>{0}</small>
              <h5>الأرباح</h5>
              <small>{0}</small>
              <i className="fa fa-money-bill" />
            </div>{/*end statBox*/}
          </div>
        </div>
        <div className="col-12 bg-[#fff] rounded-lg mt-[50px] p-[20px]">
      <div className="row text-[25px] m-3 px-3  font-bold color-[black]">
        المبيعات
      </div>
      <div className="row m-3 p-3 text-center">

      <div className="col-md-6 shadow-md flex items-center justify-center text-center">
      <LineChartOrders data={data}/>
      </div>

      <div className="col-md-6 shadow-md flex items-center justify-center">
      <OrderStatusChart data={data}/>
      </div>

      </div>


     
      <div className="row text-[25px] m-3 px-3  font-bold color-[black]">
        الطباخين
      </div>


     <div className="row m-3 p-3 text-center">
      
      <div className="col-md-6 shadow-md flex items-center justify-center text-center">
      <ChartView data={data}/>
      </div>

      <div className="col-md-6 shadow-md flex items-center justify-center">
      <PieChartView data={data}/>
      </div>



     
   
      </div>
      <div className="row text-[25px] m-3 px-3  font-bold color-[black]">
        المناديب
      </div>
      <div className="row m-3 p-3 text-center">
      <div className="col-md-6 shadow-md flex items-center justify-center text-center">
      <LineChart data={data}/>
      </div>

      <div className="col-md-6 shadow-md flex items-center justify-center">
      <DriversRateChart data={data}/>
      </div>
      </div>
      </div>
      </div>{/*end headCon*/}
     

      
 

       </>)
    
    
}