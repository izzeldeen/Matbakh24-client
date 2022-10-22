import { border } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


export default function OrderDetail() {
  const [order,setOrder] = useState(null)
  const [carts,setCarts] = useState([])
  const location = useLocation();
  const imgStyle = { height: "100px", borderRadius: "100px", margin: "auto" };

  const row = location.state.row;
  const orderStatus = [
    "في انتظار التأكيد",
    "جاري تجهيز الطلب",
    "جاري التوصيل",
    "تم تسليم الطلب",
    "طلب ملغي",
  ];

  const getOrder = async () => {
    try {
      var form = new FormData()
      form.append("orderId",row?.order?.id)
      const response = await fetch(
        window.baseurl+"order/detail",
        {
          method: "post",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body:form

        }
      );
      const json = await response.json();
       setOrder(json)
       setCarts(json.carts)
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
   getOrder()
  },[]);
  
  const showMap = (lat, lng) => {
    window.open("https://maps.google.com?q=" + lat + "," + lng);
  };
  return (
    <Tabs>
    <TabList>
      <Tab>بيانات الطلب</Tab>
      <Tab>بيانات العميل</Tab>
      <Tab>بيانات المطبخ</Tab>
      <Tab>بيانات المندوب</Tab>
      <Tab>الوجبات</Tab>
    </TabList>

    <TabPanel >
    <div className="col-sm-12 ">
        <div className="item-container  col-12">
          <div className="item-header">بيانات الطلب</div>
 <div className="row p-3" >
 <div className="item-title col-lg-6 mt-2">
            رقم الطلب{" "}
            <span className="item-content mx-3">{" # " + row?.order?.id}</span>
          </div>
          <div className="item-title col-lg-6 mt-1">
            تاريخ الطلب
            <span className="item-content mx-3">
              {" " + row?.order?.date.split("T")[0]}
            </span>
          </div>
          <div className="item-title col-lg-6 mt-1">
            حالة الطلب
            <span className="item-content mx-3">
              {" " + orderStatus[row?.order?.status]}
            </span>
          </div>
          <div className="item-title col-lg-6 mt-1">
            تكلفة التوصيل{" "}
            <span className="item-content mx-3">
              {order?.delivery + " ريال "}
            </span>
          </div>

         

          <div className="item-title col-lg-6 mt-1">
            سعر الطلبات{" "}
            <span className="item-content mx-3">
              {order?.subtotal + " ريال "}
            </span>
          </div>

          <div className="item-title col-lg-6 mt-1">
            طريقة الدفع
            <span className="item-content mx-3">
              {row.order?.payment==0? "الدفع نقدا":"الدفع الإلكتروني"}
            </span>
          </div>

          <div className="item-title col-lg-6 mt-1">
            الإجمالي{" "}
            <span className="item-content mx-3">
              {order?.total + " ريال "}
            </span>
          </div>

 </div>
         
       
          {/* <div className="item-title mt-1">
          قيمة التوصيل{" "}
          <span className="item-content mx-3">
            {row?.order?.tax + " ريال "}
          </span>
        </div>

        <div className="item-title mt-1">
          قيمة الضريبة{" "}
          <span className="item-content mx-3">
            {row?.order?.tax + " ريال "}
          </span>
        </div> */}

        
        </div>
      </div>
    </TabPanel>
    <TabPanel>
    <div className="col-sm-12">
        <div className="item-container">
          <div className="item-header">بيانات العميل</div>
          <div className="row">
            
              <div className="item-title col-lg-6 mt-1">
                الاسم
                <span className="item-content mx-3">{row?.user?.fullName}</span>
              </div>
              <div className="item-title col-lg-6 mt-1">
                رقم الهاتف
                <span className="item-content mx-3">{row?.user?.userName.replaceAll("+","")}</span>
              </div>

              <div className="item-title col-lg-6 mt-1">
                البريد الإلكتروني
                <span className="item-content mx-3">{row?.user?.email}</span>
              </div>
          <div
            onClick={(e) => showMap(row?.order?.user_lat, row?.order?.user_lng)}
            className="btn btn-success my-3 mx-2"
          >
            موقع العميل
          </div>
          
          </div>
        </div>
      </div>
    </TabPanel>

    <TabPanel>
    <div className="col-sm-12">
        <div className="item-container my-3  col-12">
          <div className="item-header">بيانات المطبخ</div>
        <div className="row p-3" >
        <div className="item-title col-lg-6 mt-1">
            الاسم
            <span className="item-content mx-3">
              {row?.market.title.split("大")[0]}
            </span>
          </div>
          <div className="item-title col-lg-6 mt-1">
            رقم الهاتف
            <span className="item-content mx-3">
              {row?.marketUser?.userName.replaceAll("+","")}
            </span>
          </div>
          <div
            onClick={(e) =>
              showMap(row?.order?.market_lat, row?.order?.market_lng)
            }
            className="btn btn-success my-3 mx-2"
          >
            موقع المطبخ
          </div>
        </div>
      
        </div>
      </div>
    </TabPanel>

    <TabPanel>
    <div className="col-sm-12 ">
          <div className="item-container my-3">
            <div className="item-header">بيانات المندوب</div>
            <div className="row p-3" >
            <div className="item-title col-lg-6 mt-1">
              الاسم
              <span className="item-content mx-3">
                {row?.driverUser?.fullName}
              </span>
            </div>
            <div className="item-title col-lg-6 mt-1">
              رقم الهاتف
              <span className="item-content mx-3">
                {row?.driverUser?.userName.replaceAll("+","")}
              </span>
            </div>
            </div>
         
          </div>
        </div>
    </TabPanel>
  
 
    <TabPanel >
  <div className="col-sm-12 ">
          <div className="item-container my-3">

            <div className="item-header">الوجبات</div>
         
            <h3>{carts?.food?.food.name}</h3>
         
          
              { carts?.map((e , index) => {

            return    <div className="row food-item-body" >
              <div className="col-md-6" >
                <div className="item-title  mt-1">
                  الاسم
                  <span className="item-content mx-3">
                    {e?.food.food.name}
                  </span>
                </div>
                <div className="item-title  mt-1">
                  السعر
                  <span className="item-content mx-3">
                    {e?.food.food.price}
                  </span>
                </div>
                
                <div className="item-title  mt-1">
                  الكمية
                  <span className="item-content mx-3">
                    {e?.quantity}
                  </span>
                </div>

               

              </div>
              <div className="col-md-6" >
                <img className="cart-image" src={window.baseurl+ "uploads/" + e?.food.photos[0]?.url  }
                  />
                </div>
           </div>
             
               
                })
              }
           


            </div>
            </div>
  </TabPanel>
  
  </Tabs>
  );
}
