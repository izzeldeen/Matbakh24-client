import React, { useEffect, useState } from "react";
import ExportDoc from "../../Components/ExportDoc";
import MultiSelectAll from "../../Components/MultiSelectAll";
import Orders from "../Orders";
import {   useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import { render } from "@testing-library/react";
var selectedProvidersIds = [];
var printTitle = "";
var startDate;
var endtDate;

export default function GRProviders() {
  let navigate = useNavigate();
  var [providers, setProviders] = useState(null);
  var [orders, setOrders] = useState(null);
  var [selectedProviders, setSelectedProviders] = useState();
  const getProviderData = (json) => {
    var res = [];
    json.forEach((e) => {
      res.push({
        id: e.provider?.id,
        value: e.provider?.id,
        label: e.provider?.title.split("大")[0],
      });
    });
    console.log(res);
    return res;
  };
  const getProviders = async () => {
    try {
      const response = await fetch(window.baseurl + "admin/get-markets", {
        method: "Get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setProviders(json);
      getProviderData(json);

      return json;
    } catch (error) {
      console.error(error);
    }
  };

  

  const getOrders = async () => {
    try {
        console.log(selectedProvidersIds);
      const formData = new FormData();
      formData.append("ids", selectedProvidersIds);
      formData.append("type", "providers");
      formData.append("startDate", startDate);
      formData.append("endDate", endtDate);
      const response = await fetch(
        window.baseurl + "admin/get-grouped-reports",
        {
          method: "Post",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: formData,
        }
      );
      const json = await response.json();
      console.log(json);
      setOrders(json);
      const p = providers.filter(e=>selectedProvidersIds.includes(e.provider?.id.toString()) )
      console.log("setSelectedProviders")

      console.log(p);
      setSelectedProviders(p)
      return json;
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (value) => {
    // value=value.map(e=>e.value!="*")
    selectedProvidersIds = value.map((e) => e.id).join(",");
  };

  if(providers==null)    getProviders();


  const providersToOrders = () => {
    return 
  }

  const renderOrders = (row) => 
  {
    const marketOrders = orders.filter((e) => e.market_id == row?.provider?.id);
      let IdzStr = '';
      console.log(marketOrders);
      // marketOrders.forEach(item => {
      //   IdzStr += item.id
      // })
 for(let x = 0; x < marketOrders.length ; x++){
  IdzStr += marketOrders[x].id;
  if(x != (marketOrders.length -1) )
  {
    IdzStr += ','
  }
 }
      console.log(IdzStr);
    navigate('../orders?' + IdzStr );
   // window.ordIds = 
   // return (<Orders ></Orders>);
  }

  // const getData = async (event) => {
  //     event && event.preventDefault();
  //     setLoading(true)

  //     event && event.preventDefault();

  //     const formdata = new FormData(event.target)
  //     const jsonRequest = {}
  //     formproviders.forEach(function (value, prop) {
  //         jsonRequest[prop] = value
  //     })
  //     jsonRequest["users"] = selectedTeachers
  //     jsonRequest["schoolId"] = localStorage.getItem("id"); try {
  //         const response = await fetch(window.baseurl + "reports/teacher-grouped-report", {
  //             method: "POST",
  //             headers: {
  //                 Accept: "application/json",
  //                 "Content-Type": "application/json",
  //                 "Authorization": "Bearer " + localStorage.getItem("token")
  //             },
  //             body: JSON.stringify(jsonRequest)
  //         });
  //         const json = await response.json();
  //         printTitle="تقرير مجمع : "+jsonRequest['startDate'].toString()+" ل "+jsonRequest['endDate'].toString()
  //         setLoading(false)

  //         console.log(json);
  //         setData(json);

  //         return json;
  //     } catch (error) {
  //         console.error(error);
  //     }
  // };



  const countOrders = (row) => {
    return orders.filter((e) => e.market_id == row?.provider?.id).length;
  };

  const statusOrders = (row, status) => {
    return orders.filter((e) => e.market_id == row?.provider?.id && e.status == status)
      .length;
  };

  const sumOrders = (row) => {
    const pOrders = orders.filter((e) => e.market_id == row?.provider?.id);
    var sum = 0;
    pOrders.forEach((o) => {
      sum = sum + o.price;
    });
    return sum;
  };

  const vatOrders = (row) => {
    const pOrders = orders.filter((e) => e.market_id == row?.provider?.id);
    var sum = 0;
    pOrders.forEach((o) => {
      sum = sum + o.price;
    });
    return Number(sum * 0.15).toFixed(2);  ;
  };

  
  const heads = [
    "م",
    "اسم",
    "هاتف",
    "عدد الطلبات",
    "إجمالي السعر",
    "الضريبة",
    "المكتملة",
    "الجارية",
  ].reverse();

  const dataPrint =
    (providers == null||orders==null)
      ? []
      : providers.map((row, index) =>
         [
         index+1, 
         row?.provider?.title.split("大")[0],
         row?.user?.userName.replaceAll("+",""),
         countOrders(row),
         statusOrders(row, 3),
         statusOrders(row, 0),
         sumOrders(row, 3),
         vatOrders(row, 3)

        ].reverse()
        );
  return (
    <>

    
      <div dir="rtl" className="col-12  m-t">
        <form onSubmit={getOrders}>
          <div className="row m-2">
            <div className="col-md-3 col-6 ">
              <label>من تاريخ</label>
              <input
                
                autoComplete="off"
                type="text"
                name="startDate"
                className="form-control text-right"
                id="start-date"
                onChange={(e=>startDate=e.target.value)}
                placeholder="شهر-يوم-سنة"
                onFocus={(e) => e.target.type = 'date'}
              />
            </div>
           


            <div className="col-md-3 col-6">
              <label>إلي تاريخ</label>
              <input
                autoComplete="off"
                type="text"
                name="endDate"
                placeholder="شهر-يوم-سنة"
                lang="fr-CA"
                onChange={(e=>endtDate=e.target.value)}
                className="form-control text-right"
                id="end-date"
                onFocus={(e) => e.target.type = 'date'}
              />
            </div>

            <div className="col-md-3 col-12  ">
              <div className="selectInp">
                <label className="">اختر الطباخين</label>
                {providers && (
                  <MultiSelectAll
                    handleChange={handleChange}
                    data={getProviderData(providers)}
                    width="250px"
                  />
                )}
              </div>
          
            </div>

            <div className="col-md-3 mt-4">
                <div className="mt-4"></div>
                <div onClick={(e)=>{
                    getOrders()
                }} className="btn butt btnW btn-sm btn-success " >بحث</div>
              </div>

          </div>
        </form>
      </div>

      {/* /.card-header */}
      <div className="card-body">
        <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">
          <div dir="rtl" className="row ">
            <div className="col-sm-12">
              <div className="row mx-1">
                <ExportDoc
                  title={"تقرير الطباخين"}
                  fontSize={9}
                  head={heads}
                  data={dataPrint}
                  
                />
              
           
           
                

                {/* {data&&<SendPdfToEmail title={printTitle} head={heads} content={dataPrint} userIds ={["62f913b0-4c75-4626-b35e-23e4e17798d3","45181153-4042-4195-8628-07ef1ec71211"]}/>} */}
              </div>
              <div className="table-responsive">
                  <table
                    id="capture"
                    className="table reports table-bordered table-striped dataTable"
                    role="grid"
                    aria-describedby="example1_info"
                  >
                    <thead>
                      <tr role="row">
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="example1"
                          colSpan={2}
                          aria-label="اسم المدير: activate to sort column ascending"
                        >
                          م
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="example1"
                          colSpan={2}
                          aria-label="اسم المدير: activate to sort column ascending"
                        >
                          الاسم
                        </th>

                        <th
                          className="sorting_asc"
                          tabIndex={0}
                          aria-controls="example1"
                          colSpan={2}
                          aria-sort="ascending"
                          aria-label="اسم المدرسة: activate to sort column descending"
                        >
                          الهاتف
                        </th>
                        <th
                          className="sorting_asc"
                          tabIndex={0}
                          aria-controls="example1"
                          colSpan={2}
                          aria-sort="ascending"
                          aria-label="اسم المدرسة: activate to sort column descending"
                            
                      
                        >
                         
                          عدد الطلبات
                        </th>

                        <th
                          className="sorting_asc"
                          tabIndex={0}
                          aria-controls="example1"
                          colSpan={2}
                          aria-sort="ascending"
                          aria-label="اسم المدرسة: activate to sort column descending"
                        >
                          الطلبات المكتملة
                        </th>
                        <th
                          className="sorting_asc"
                          tabIndex={0}
                          aria-controls="example1"
                          colSpan={2}
                          aria-sort="ascending"
                          aria-label="اسم المدرسة: activate to sort column descending"
                        >
                          الطلبات الجارية
                        </th>
                        <th
                          className="sorting_asc"
                          tabIndex={0}
                          aria-controls="example1"
                          colSpan={2}
                          aria-sort="ascending"
                          aria-label="اسم المدرسة: activate to sort column descending"
                        >
                          إجمالي السعر
                        </th>
                        <th
                          className="sorting_asc"
                          tabIndex={0}
                          aria-controls="example1"
                          colSpan={2}
                          aria-sort="ascending"
                          aria-label="اسم المدرسة: activate to sort column descending"
                        >
                          إجمالي الضريبة
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Date = checkinout.CHECKTIME,
                            Type = type,
                            CheckIn = time1.ToString(),
                            CheckOut = time2.ToString(),
                            EarlyTime = TimeEarly,
                            LateTime = TimeLate,
                            JobNumber = teacher.JobNumber,
                            SchoolId = teacher.SchoolId,
                            UserId = teacher.Id,
                            UserName = teacher.Name */}

                      {selectedProviders&&selectedProviders.map((row, index) => (
                        <tr role="row" className="odd">
                          <td colSpan={2}>{1}</td>
                          <td colSpan={2}>{row?.provider?.title.split("大")[0]}</td>
                          <td colSpan={2}>{row?.user?.userName.replaceAll("+","")}</td>
                          <td colSpan={2}   > 
                          {/* <Link
                              to={"/admin/orders"}
                              state={{
                                row: row,
                              }}
                            >
                              {countOrders(row)}
                            </Link> */}

                          <button onClick={() => {renderOrders(row)} } >
                          {countOrders(row)}
                           </button> 
                           </td>
                          <td colSpan={2}>{statusOrders(row, 3)}</td>
                          <td colSpan={2}>{statusOrders(row, 0)}</td>
                          <td colSpan={2}>{sumOrders(row, 3)}</td>
                          <td colSpan={2}>{vatOrders(row, 3)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>  
              <br />
              <div className="m-3"></div>
            </div>
          </div>
        </div>
      </div>
      {/* /.card-body */}
    </>
  );



}
