import { Pagination } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SpinnerRoundFilled } from "spinners-react";
import Loading from "../Components/Spinner";

export default class Admins extends React.Component {
  componentDidMount() {
    this.getData();
  }

  pageCount = 10;
  constructor(props) {
    super(props);
    this.state = {
      city: "الكل",
      page: 1,
      filteredData: null,
    };
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
    var filtered =
      search == ""
        ? this.data
        : this.data.filter(
            (e) =>
              e.email.includes(search) ||
              e.userName.includes(search) ||
              e.fullName.includes(search)
          );
    this.setState({ filteredData: filtered });
  }

  getData = async () => {
    try {
      const response = await fetch(window.baseurl + "admin/get-admins", {
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
      this.searchData("");
      return json;
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <div className="row ">
        <div className="col-md-12">
          <div className="row flex justify-between items-stretch">
            <div className="col-9">
              <div className="col-5">
                <h4 className="titleSection"> المديرين</h4>
              </div>
              <div className="col-md-5">
                <div className="form-group">
                  <label asp-for="Name"> بحث</label>
                  <input
                    type="text"
                    onChange={(e) => this.searchData(e.target.value)}
                    className="form-control"
                    id="name"
                    placeholder=" الاسم ، رقم الهاتف ، الايميل"
                  />
                </div>
              </div>
            </div>

            <div>
              <Link to={"/admin/admins/add"}>
                <div className="systemBtn bg-[#FFCA08] mx-[30px] rounded-[10px] w-[150px] btn text-center   font-bold">
                  إضافة
                </div>
              </Link>
            </div>
          </div>
          {this.data == null ? (
            <Loading />
          ) : (
          <div className="admin">
            <div className="table-responsive">
              <table className="table filesTable table-striped" id="example">
                <thead>
                  <tr>
                  
                    <th scope="col">
                      <i className="fa fa-star" />
                    </th>
                    <th scope="col">م</th>
                    <th scope="col">تاريخ</th>
                    <th scope="col">الاسم</th>
                    <th scope="col">البريد</th>
                    {/* <th scope="col">الهاتف</th> */}
                    <th scope="col">الصورة</th>
                    <th scope="col">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {this.paginatedList().map((e, index) => (
                    <tr>
                     
                      <td>
                        <i className="fa fa-star" />
                      </td>
                      <td>{this.state.filteredData.indexOf(e)+1}</td>
                      <td>{e?.createdAt}</td>
                      <td>{e?.fullName}</td>
                      <td>{e?.email}</td>
                      {/* <td>{e?.userName}</td> */}
                      <td>
                        {
                          <img
                            src={window.baseurl + "uploads/" + e.profileImage}
                            onError={(e) => (
                              (e.target.onerror = null),
                              (e.target.src = "../img/account.jpeg")
                            )}
                            alt="img"
                          />
                        }
                      </td>
                      <td>
                          <Link to={"/admin/roles"} state={{
                                                        row: e
                                                    }}>
                            <h6 className="publish">الصلاحيات</h6>
                          </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>  
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
