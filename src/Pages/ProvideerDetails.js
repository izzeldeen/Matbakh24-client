import { useLocation } from "react-router-dom";
import ImagesGallery from "../Components/ImageGallary";

export default function ProviderDetails({row}) {
  const imgStyle = { height: "100px", borderRadius: "100px",margin:"auto" };

  return (
    <div className="row food-details-body" >
    <div className="col-lg-5 foods-details">
      <h4 className="text-center item-title">تفاصيل الطباخ/ة</h4>
      <div className="row  pt-2 mt-3 mr-1">
        <div className="row mt-1">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                  <div className="item-title">الاسم</div>
                  <div className="item-content">
                  {row?.provider?.title.split('大')[0]}
                </div>
              </div>

              <div className="col-md-6">
                  <div className="item-title">البريد الالكتروني</div>
                  <div className="item-content">
                  {row?.user?.email}
                </div>
              </div>
              
              <div className="col-md-6">
                  <div className="item-title">رقم الهاتف</div>
                  <div className="item-content">
                  {row?.user?.userName.replaceAll("+","")}
                </div>
              </div>
     
              <div className="col-md-6">
                  <div className="item-title">الجنس</div>
                  <div className="item-content">
                  {row?.user?.gender}
                </div>
              </div>

              <div className="col-md-6">
                  <div className="item-title">رقم الأيبان</div>
                  <div className="item-content">
                  {row?.user?.ibanNumber}
                </div>
              </div>


              <div className="col-md-6">
                  <div className="item-title">الجنسية</div>
                  <div className="item-content">
                  {row?.user?.country}
                </div>
              </div>

              <div className="col-md-6">
                  <div className="item-title">الطبخات المقدمة</div>
                  <div className="item-content">
                  {row?.fields.map(e=>e.name.split('大')[0]).join(' , ')}
                </div>
              </div>



                    </div>
                    </div>
                    </div>
                    </div>


      </div>
      <div className="col-lg-7 pt-2 mt-3 gallery">
      <ImagesGallery images={[row?.user?.profileImage,row?.provider?.image,row?.provider?.bannarImage]}/>
    </div>

      </div>



  );
}
