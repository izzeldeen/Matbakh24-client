import { Pagination } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Loading from "../Components/Spinner";
import * as constants from "./constants";

var gIndex=1
export default class Providers extends React.Component {
  componentDidMount() {
    this.getData();
  }
  pageCount = 10;
  search  = ""


  constructor(props) {
    super(props);
    this.state = {
      city: "الكل",
      page: 1,
      filteredData: null,
    };
    this.handleChange = this.handleChange.bind(this)

    this.onPaginationChange = this.onPaginationChange.bind(this);
  }

  onPaginationChange(event, value) {
    this.setState({ page: value });
  }

  paginatedList() {
    return this.state.filteredData.slice(
      (this.state.page - 1) * this.pageCount,
      this.state.page * this.pageCount
    );
  }

  data = null;
  searchData(search) {
    this.search =search
    var filtered =
      search == ""
        ? this.data
        : this.data?.filter(
            (e) =>
            e.user.email?.includes(search) ||
            e.user.city?.includes(search) ||
            e.user.userName?.includes(search) ||
              e.provider.title?.includes(search)
          );
    this.setState({ filteredData: filtered });
  }

  getData = async () => {
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
      console.log(json);
      this.data = json;
       this.searchData(this.search);
      // if(this.state.city!="الكل")this.filterData(this.state.city)
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  updateProvider = async (status,id) => {
    const jsonRequest = {}
    jsonRequest["status"] = status
    jsonRequest["id"] = id
    console.log(jsonRequest);
    try {
      const response = await fetch(window.baseurl+"provider/update-status", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization":"Bearer "+localStorage.getItem("token")
        },
        body:JSON.stringify(jsonRequest)
      });
      const json = await response.json();
      console.log(json);
      this.getData();
    } catch (error) {
      console.error(error);
    }
  };

  data =null
  filterData(city){
    this.state.filteredData = city=="الكل"?this.data:  this.data.filter(e=>e.user?.city == city)
    return this.filteredData;
  }


  handleChange(e) {
    console.log("Fruit Selected!!");
    this.filterData(e.target.value)
    this.setState({ city: e.target.value });
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-2">
              <h4 className="titleSection"> الطباخين</h4>
            </div>
            <div className="col-md-3">
            <div className="form-group">
              <label asp-for="City">حسب المدينة</label>
              <select
                asp-for="City"
                name="room"
                value={this.state.city}
                onChange={this.handleChange}
                className="form-control select2"
                style={{ width: "100%" }}
              >
                  <option key={0} value={"الكل"}>
                  {"الكل"}
                </option>
                {

                  
                constants.cities.map((row,index) => (
                    <option key={index} value={row}>
                      {row}
                    </option>
                  ))
               
                }
              </select>
            </div>
          </div>

            <div className="col-md-3">
              <div className="form-group">
                <label asp-for="Name"> بحث</label>
                <input
                  type="text"
                  autoComplete="off"
                  onChange={(e) => this.searchData(e.target.value.trim())}
                  className="form-control"
                  id="name"
                  placeholder=" الاسم ، المدينة ، رقم الهاتف ، الايميل"
                />
              </div>
             
            </div>
          </div>
          {this.data == null ? (
            <Loading />
          ) : (
            <div className="table-responsive">
              <table className="table filesTable table-striped" id="example">
                <thead>
                  <tr>
                    <th scope="col">م</th>
                    <th scope="col">تاريخ</th>
                    <th scope="col">اسم المطبخ</th>
                    <th scope="col">البريد</th>
                    <th scope="col">الهاتف</th>
                    <th scope="col">المدينة</th>
                    <th scope="col">الصورة</th>
                    <th scope="col">الحالة</th>
                    <th scope="col">تفاصيل</th>
                  </tr>
                </thead>
                <tbody>
                  {this.paginatedList().map((e, index) => (
                    <tr>
                      <td>{this.state.filteredData.indexOf(e)+1}</td>
                      <td>{e?.user?.createdAt}</td>
                      <td>{e?.provider?.title.split("大")[0]}</td>
                      <td>{e?.user?.email}</td>
                      <td>{e?.user?.userName.replaceAll("+","")}</td>
                      <td>{e?.user?.city}</td>
                      <td>
                        {
                          <img
                            src={window.baseurl + "uploads/" + e.provider?.image}
                            onError={(e) => (
                              (e.target.onerror = null),
                              (e.target.src = "../img/account.jpeg")
                            )}
                            alt="img"
                          />
                        }
                      </td>
                      <td>
                <div
                onClick={
                  (ev)=>{
                    var status = e.provider?.status==0?1:0;
                    this.updateProvider(status,e.provider?.id)
                  }
                }
                className="row cursor-pointer">
                <h6 className={e?.provider?.status==0?"pend":"publish"}>مفعل</h6>
                <h6 className={e?.provider?.status==1?"pend":"disable"}>غير مفعل</h6>
                </div>
                  
                  </td>
                      <td>
                        <Link
                          to={"/admin/provider/detail"}
                          state={{
                            row: e,
                          }}
                        >
                          <i class="fa-solid fa-eye text-primary cursor-pointer"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div dir="ltr" className="mx-auto mt-[40px]">
                <Pagination
                  count={Math.ceil(
                    this.state.filteredData.length / this.pageCount
                  )}
                  onChange={this.onPaginationChange}
                  variant="outlined"
                  color="secondary"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
