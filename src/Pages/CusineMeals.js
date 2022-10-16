import { Pagination } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Components/Spinner";
import SwitcherView from "../Components/Switcher";
export default class CusineMeals extends React.Component{
  componentDidMount(){
    this.getData()
  }
  pageCount = 10
  constructor(props) {
    super(props);
    this.state = {
      city :"الكل",
      page:1,
      filteredData:null
    };
    this.onPaginationChange = this.onPaginationChange.bind(this)
  }

  updateFood= async (status,id) => {
    const jsonRequest = {}
    var form = new FormData()
    form.append("id",id.toString())
    form.append("status",status.toString())
 
    console.log(jsonRequest);
    try {
      const response = await fetch(window.baseurl+"food/update-status", {
        method: "POST",
        headers: {
          "Authorization":"Bearer "+localStorage.getItem("token")
        },
        body:form
      });
      this.getData();
    } catch (error) {
      console.error(error);
    }
  };




  onPaginationChange(event, value){
    this.setState({ page:value});
  }

  paginatedList(){
    return this.state.filteredData.slice((this.state.page - 1) * this.pageCount, this.state.page * this.pageCount);
  }
  

  data =null
  searchData(search){
   var filtered = search==""?this.data:  this.data.filter(e=>e.food.marketName.includes(search)||e.food.name.includes(search))
   this.setState({filteredData:filtered})
  }

   
   getData = async () => {
    try {
        const form  = new FormData()
        console.log(this.props.row);
         form.append("marketId", this.props.row.provider ? this.props.row.provider.id : this.props.row.food.market_id)
      const response = await fetch(
        window.baseurl+"admin/market/detail",
        {
          method: "Post",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body:form
          
        },
        
      );
      const json = await response.json();
      console.log(json);
      this.data = json.foods
      this.searchData("")
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  render(){
  
    return  <div className="row">
    <div className="col-md-12">
    <div className="row">
       

      </div>
              {this.data == null ? (
              <Loading/>
            ) : 
      <div className="foods">
        <div className="table-responsive">
            <table className="table filesTable table-striped" id="example">
              <thead>
                <tr>
                
                  <th scope="col">
                    <i className="fa fa-star" />
                  </th>
                  <th scope="col">م</th>
                  <th scope="col">اسم الوجية</th>
                  <th scope="col">السعر</th>
                  <th scope="col">الصورة</th>
                  <th scope="col">مفعل</th>
                  <th scope="col">إجراء</th>
                </tr>
              </thead>
              <tbody>
                { (
                  this.paginatedList().map((e, index) => (
                    <tr>
                  
                      <td>
                        <i className="fa fa-star" />
                      </td>
                      <td>{this.state.filteredData.indexOf(e)+1}</td>
                      <td>{e?.food.name.split("大")[0]}</td>
                      <td>{e?.food.price+" SR"}</td>
                      <td>
                        
                        {e?.photos&&e.photos.length>0&&<img
                          src={
                            window.baseurl+"uploads/" + e.photos[0].url
                          }
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
                    var status = e.food.status==0?1:0;
                    this.updateFood(status,e.food.id)
                  }
                }
                className="row cursor-pointer">
                <h6 className={e.food.status==0?"pend":"publish"}>مفعل</h6>
                <h6 className={e.food.status==1?"pend":"disable"}>غير مفعل</h6>
                </div>


                        {/* <SwitcherView status={e?.food.status} onChange={(checked)=>{
                          this.updateFood(checked,e.food.id)
                        }}/> */}
                      </td>
                      <td>
                        <div className="row">
                        <Link to={"/admin/foods/detail"}    state={{
                                row: e,
                              }}>

                        <button type="button" class="btn btn-outline-success btn-sm mx-1">تفاصيل</button>
                        </Link>
                        {/* <Link to={"/admin/foods/edit"}    state={{
                                row: e,
                              }}>

                        <button type="button" class="btn btn-outline-primary btn-sm mx-1">تعديل</button>
                        </Link> */}
                    
                        </div>
                      </td>

                    </tr>
                  ))
                )}
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
