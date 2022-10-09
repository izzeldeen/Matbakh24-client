import React, { useEffect, useState } from "react";
import ExportDoc from "../../Components/ExportDoc";
import MultiSelectAll from "../../Components/MultiSelectAll";
var selectedUsersIds = [];
var printTitle = "";
var startDate;
var endtDate;

export default function GRUsers() {
  var [Users, setUsers] = useState(null);
  var [orders, setOrders] = useState(null);
  var [selectedUsers, setSelectedUsers] = useState();
  const getUserData = (json) => {
    var res = [];
    json.forEach((e) => {
      res.push({
        id: e.id,
        value: e.id,
        label: e.fullName,
      });
    });
    console.log(res);
    return res;
  };
  const getUsers = async () => {
    try {
      const response = await fetch(window.baseurl + "admin/get-users", {
        method: "Get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      getUserData(json);

      setUsers(json);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const getOrders = async () => {
    try {
        console.log(selectedUsersIds);
      const formData = new FormData();
      formData.append("ids", selectedUsersIds);
      formData.append("type", "users");
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
      const p = Users.filter(e=>selectedUsersIds.includes(e.id.toString()) )
      console.log("setSelectedUsers")

      console.log(p);
      setSelectedUsers(p)
      return json;
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (value) => {
    // value=value.map(e=>e.value!="*")
    selectedUsersIds = value.map((e) => e.id).join(",");
  };

  useEffect(() => {
    getUsers();
  }, []);

  

  // const getData = async (event) => {
  //     event && event.preventDefault();
  //     setLoading(true)

  //     event && event.preventDefault();

  //     const formdata = new FormData(event.target)
  //     const jsonRequest = {}
  //     formUsers.forEach(function (value, prop) {
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
    return orders.filter((e) => e.userId == row?.id).length;
  };

  const statusOrders = (row, status) => {
    return orders.filter((e) => e.userId == row?.id&& e.status == status)
      .length;
  };

  const sumOrders = (row) => {
    const pOrders = orders.filter((e) => e.userId == row?.id);
    var sum = 0;
    pOrders.forEach((o) => {
      sum = sum + o.price;
    });
    return sum;
  };

  const vatOrders = (row) => {
    const pOrders = orders.filter((e) => e.market_id == row?.id);
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
    (Users == null||orders==null)
      ? []
      : Users.map((row, index) =>
         [
         index+1, 
         row?.fullName,
         row?.userName.replaceAll("+",""),
         countOrders(row),
         statusOrders(row, 3),
         statusOrders(row, 0),
         sumOrders(row, 3),
         vatOrders(row, 3)

        ].reverse()
        );
  return (
    <>
      <div dir="rtl" className="col-12">
        <form onSubmit={getOrders}>
          <div className="row m-3">
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

            <div className="col-md-3 col-6 ">
              <label>إلي تاريخ</label>
              <input
                autoComplete="off"
                type="text"
                name="endDate"
                lang="fr-CA"
                onChange={(e=>endtDate=e.target.value)}
                className="form-control text-right"
                id="end-date"
                placeholder="شهر-يوم-سنة"
                onFocus={(e) => e.target.type = 'date'}
              />
            </div>

            <div className="col-md-3 col-12   ">
              <div className="selectInp">
                <label className="">اختر المستخدمين</label>
                {Users && (
                  <MultiSelectAll
                    handleChange={handleChange}
                    data={getUserData(Users)}
                  />
                )}
              </div>
              
            </div>

            <div className="col-md-3 mt-4">
                <div onClick={(e)=>{
                    getOrders()
                }} className="btn butt btnW btn-sm btn-success">بحث</div>
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
                  title={"تقرير المستخدمين"}
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

                    {selectedUsers&&selectedUsers.map((row, index) => (
                      <tr role="row" className="odd">
                        <td colSpan={2}>{index+1}</td>
                        <td colSpan={2}>{row?.fullName}</td>
                        <td colSpan={2}>{row?.userName.replaceAll("+","")}</td>
                        <td colSpan={2}>{countOrders(row)}</td>
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

