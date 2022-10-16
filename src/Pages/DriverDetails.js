import { useLocation } from "react-router-dom";
import ImagesGallery from "../Components/ImageGallary";

export default function DriverDetails() {
  const imgStyle = { height: "100px", borderRadius: "100px",margin:"auto" };
  const location = useLocation();
  const row = location.state.row;
  return (
    <div className="row food-details-body" >
    <div className="col-lg-5 foods-details">
      <h4 className="text-center item-title">تفاصيل المندوب</h4>
      <div className="row  pt-2 mt-3 mr-1">
        <div className="row mt-1">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <div >
                  <div className="item-title">الاسم</div>
                  <div className="item-content">
                  {row?.user?.fullName}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div >
                  <div className="item-title">البريد الالكتروني</div>
                  <div className="item-content">
                  {row?.user?.email}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div >
                  <div className="item-title">رقم الهاتف</div>
                  <div className="item-content">
                  {row?.user?.userName.replaceAll("+","")}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div >
                  <div className="item-title">الحالة</div>
                  <div className="item-content">
                  {row?.driver?.statuse==0?"غير مفعل":"مفعل"}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div >
                  <div className="item-title">الجنس</div>
                  <div className="item-content">
                  {row?.user?.gender}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div >
                  <div className="item-title">رقم الأيبان</div>
                  <div className="item-content">
                  {row?.user?.ibanNumber}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div >
                  <div className="item-title">الجنسية</div>
                  <div className="item-content">
                  {row?.user?.country}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div >
                  <div className="item-title">المنطقة</div>
                  <div className="item-content">
                  {row?.user?.city}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div >
                  <div className="item-title">العمر</div>
                  <div className="item-content">
                  {row?.user?.age}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div >
                  <div className="item-title">نوع السيارة</div>
                  <div className="item-content">
                  {row?.driver?.carType}
                  </div>
                </div>
              </div>

              </div>
              </div>

      </div>
      </div>
</div>

<div className="col-lg-7 pt-2 mt-3 gallery">
<ImagesGallery images={[row?.user?.profileImage,row?.driver?.carImage]}/>
    </div>

</div>
 
  );
}
