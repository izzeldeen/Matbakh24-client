import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Components/Spinner";
import { Pagination } from "@mui/material";


export default class Transactions extends React.Component {
  pageCount = 10
  onPaginationChange(event, value){
    this.setState({ page:value});
  }
  paginatedList(){
    return this.state.filteredData.slice((this.state.page - 1) * this.pageCount, this.state.page * this.pageCount);
  }

  paginatedList(){
    return this.state.filteredData.slice((this.state.page - 1) * this.pageCount, this.state.page * this.pageCount);
  }
  componentDidMount(){
    this.getData()
  }
    
  
  data =null
  filterData(status){
    this.state.filteredData = status=="الكل"?this.data:  this.data.filter(e=>this.orderStatus[e.order?.status]  == status)
    return this.filteredData;
  }

  searchData(search){
    this.state.filteredData = search==""? this.data : this.data.filter(e=> e.order.id == search);
    this.setState({
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      status :"الكل",
            page:1,

      filteredData:null
    };
    //this.handleChange = this.handleChange.bind(this)
   this.onPaginationChange = this.onPaginationChange.bind(this)

  }

  getData = async () => {
    try {
      const response = await fetch(window.baseurl+"admin/transaction", {
        method: "Get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization":"Bearer "+localStorage.getItem("token")
        },
      });
      const json = await response.json();
      this.data = json
      this.filterData("الكل")
      this.setState({
      });
  
      return json;
    } catch (error) {
      console.error(error);
    }
  };

     render (){

    return <div className="row">
    <div className="col-md-12">
    <div className="row">
          <div className="col-md-3">
          <h4 className="titleSection"> التدقيق المالي</h4>

          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label asp-for="Name"> بحث</label>
              <input
                type="text"
                onChange={(e) => this.searchData(e.target.value)}
                className="form-control"
                id="name"
                placeholder="رقم العملية"
              />
            </div>
          </div>

          </div>
    {this.state.filteredData == null ? (
                <Loading/>
              ) : 
       <div className="orders">
         <div className="table-responsive">  
            <table className="table filesTable table-striped" id="example"> 
              <thead>
                <tr>
                  {/* <th scope="col"><input type="checkbox" /></th> */}
                  <th scope="col"><i className="fa fa-star" /></th>
                  <th scope="col">م</th>
                  <th scope="col">تاريخ</th>
                  <th scope="col">الاسم</th>
                </tr>
              </thead>
              <tbody>
                  { this.paginatedList().map((e,index)=>      
                        <tr>
                  {/* <td><input type="checkbox" /></td> */}
                  <td><i className="fa fa-star" /></td>
                  <td>{e?.order?.id}</td>
                  <td>{e?.order?.date}</td>
                  <td>
                            <Link
                              to={"/admin/transaction/detail"}
                              state={{
                                row: e,
                              }}
                            >
                              <i class="fa-solid fa-eye text-primary cursor-pointer"></i>
                            </Link>
                          </td>
                </tr>)}
              </tbody>
            </table>
          </div>
            <div dir="ltr" className="mx-auto mt-[40px]">
              <Pagination count={Math.ceil(this.state.filteredData.length/this.pageCount)} onChange={this.onPaginationChange} variant="outlined" color="secondary" />
          </div>
      </div>
      }
    </div>
  </div>
     }
 
  
}