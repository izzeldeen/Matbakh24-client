import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TransactionDetails() {
  const [transaction, setTransaction] = useState(null)

  const location = useLocation();
  const row = location.state.row;
  console.log(row);
  const imgStyle = { height: "100px", borderRadius: "100px",margin:"auto" };

  const getTransaction = async () => {
    try {
      var form = new FormData()
      form.append("orderId",row?.order?.id)
      const response = await fetch(
        window.baseurl+"admin/transaction/detail",
        {
          method: "post",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body:form

        }
      );
      const json = await response.json();
      setTransaction(json)
       
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTransaction()
   },[]);

  return (
    <div className="transaction-detail" >
      <h4 className="item-title">تفاصيل العملية</h4>
   
    <div className="col-lg-12 foods-details">
      
      <div className="row  pt-2 mt-3 mr-1">
        <div className="row mt-1">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                  <div className="item-title">اسم المطبخ</div>
                  <div className="item-content">
                  {row?.order?.market_name?.split("大")[0]}
                </div>
              </div>
              <div className="col-md-6">
                  <div className="item-title">اسم العميل </div>
                  <div className="item-content">
                  {transaction?.user_name}
                </div>
              </div>

              <div className="col-md-6">
                  <div className="item-title">تاريخ العملية</div>
                  <div className="item-content">
                  { row?.order?.date.split("T")[1]  + ' ' + row?.order?.date.split("T")[0]  }
                </div>
              </div>
              
              

              <div className="col-md-6">
                  <div className="item-title">قيمة الوجبه</div>
                  <div className="item-content">
                  {transaction?.cart_price}
                </div>
              </div>
     
              <div className="col-md-6">
                  <div className="item-title">قيمة التوصيل</div>
                  <div className="item-content">
                  {transaction?.delivery_price}
                </div>
              </div>

              <div className="col-md-6">
                  <div className="item-title">قيمة الضريبه المضافة</div>
                  <div className="item-content">
                  {transaction?.tax_price?.toFixed(2)}
                </div>
              </div>


              <div className="col-md-6">
                  <div className="item-title">قيمة التطبيق </div>
                  <div className="item-content">
                  {transaction?.application_price}
                </div>
              </div>

              <div className="col-md-6">
                  <div className="item-title">القيمه الاجماليه </div>
                  <div className="item-content">
                  {transaction?.total_price}
                </div>
              </div>



                    </div>
                    </div>
                    </div>
                    </div>


      </div>
    

      </div>



  );
}
