import React from 'react';
export default function Transactions(){
    return  <div className="row ">
    <div className="col-md-12">
      <div className="row flex justify-between items-stretch">
        <div className="col-9">
          <div className="col-5">
            <h4 className="titleSection"> العمليات المالية</h4>
          </div>
          <div className="col-md-5">
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

     
      </div>
      { (
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
                <th scope="col">الهاتف</th>
                <th scope="col">رقم العملية</th>
                <th scope="col">نوع البطاقة</th>
                <th scope="col">رقم البطاقة</th>
                <th scope="col">الحالة</th>
              </tr>
            </thead>
            <tbody>
             
            </tbody>
          </table>
        </div>  
        
        </div>
      )}
    </div>
  </div>
}