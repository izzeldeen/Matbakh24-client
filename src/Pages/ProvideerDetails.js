import { useLocation } from "react-router-dom";
import ImagesGallery from "../Components/ImageGallary";

export default function ProviderDetails({row}) {
  const imgStyle = { height: "100px", borderRadius: "100px",margin:"auto" };

  return (
    <div className="flex flex-col items-between">
        <ImagesGallery images={[row?.user?.profileImage,row?.provider?.image,row?.provider?.bannarImage]}/>
         {/* <div className="row ">
        { row?.user?.profileImage&& <div className="col-2 m-2">
           <img
            style={imgStyle}
            src={window.baseurl+"uploads/"+row?.user?.profileImage}
          />
        <h5 className="mx-auto my-3 text-center ">صورة الحساب</h5>
          </div>}
          <div className="col-2 m-2">
          <img
            style={imgStyle}
            src={window.baseurl+"uploads/"+row?.provider?.image}
          />
        <h5 className="mx-auto my-3 text-center "> شعارالمطبخ</h5>
          </div>
          <div className="col-2 m-2">
          <img
            style={imgStyle}
            src={window.baseurl+"uploads/"+row?.provider?.bannarImage}
          />
        <h5 className="mx-auto my-3 text-center ">صورة البروفايل الترويجية</h5>
          </div>

         </div> */}

    <div className="row mt-3">
      <div className="col-md-12">
        <div className="row m-3">
         <div className="col-md-6  p-3">
         <div className="item-container">
            <div className="item-title">الاسم</div>
            <div className="item-content">{row?.provider?.title.split('大')[0]}</div>
          </div>
         </div>
      
      
         <div className="col-md-6  p-3">
         <div className="item-container">
            <div className="item-title">البريد الالكتروني</div>
            <div className="item-content">{row?.user?.email}</div>
          </div>
         </div>

         <div className="col-md-6  p-3">
         <div className="item-container">
            <div className="item-title">رقم الهاتف</div>
            <div className="item-content">{row?.user?.userName.replaceAll("+","")}</div>
          </div>
         </div>
{/* 
         <div className="col-md-6  p-3">
         <div className="item-container">
            <div className="item-title">الحالة</div>
            <div className="item-content">{row?.provider?.status==0?"غير مفعل":"مفعل"}</div>
          </div>
         </div> */}

         <div className="col-md-6  p-3">
         <div className="item-container">
            <div className="item-title">الجنس</div>
            <div className="item-content">{row?.user?.gender}</div>
          </div>
         </div>

      
      {row?.user?.ibanNumber&& <div className="col-md-6  p-3">
      <div className="item-container">
        <div className="item-title">رقم الأيبان</div>
        <div className="item-content">{row?.user?.ibanNumber}</div>
      </div>
      </div>}

         <div className="col-md-6  p-3">
         <div className="item-container">
            <div className="item-title">الجنسية</div>
            <div className="item-content">{row?.user?.country}</div>
          </div>
         </div>
         <div className="col-md-6  p-3">
         <div className="item-container">
            <div className="item-title">المنطقة</div>
            <div className="item-content">{row?.user?.city}</div>
          </div>
         </div>

         <div className="col-md-6  p-3">
         <div className="item-container">
            <div className="item-title">الطبخات المقدمة</div>
            <div className="item-content">{row?.fields.map(e=>e.name.split('大')[0]).join(' , ')}</div>
          </div>
         </div>
        </div>
      </div>
    </div>
    </div>

  );
}
