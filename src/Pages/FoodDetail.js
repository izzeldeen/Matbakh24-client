import { Link, useLocation } from "react-router-dom";
import ImagesGallery from "../Components/ImageGallary";

export default function FoodDetail() {
  const location = useLocation();
  const row = location.state.row;
  return (
    <>
    <div className="header col-sm-12 bg-transparent" style={{paddingTop:"20px"}}>
      <Link to={"/admin/foods"}>
        <i className=" text-danger fa-solid fa-rectangle-xmark fa-2xl" />
      </Link>
    </div>
    <div className="row  container">
      <div className="col-lg-5 foods-details">
        <h4 className="text-center item-title">تفاصيل الطبخات</h4>
        <div className="row  pt-2 mt-3 mr-1">
          <div className="row mt-1">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <div>
                    <div className="item-title">اسم الوجبة</div>
                    <div className="item-content">
                      {row?.food.name.split("大")[0]}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div>
                    <div className="item-title">وصف الوجبة</div>
                    <div className="item-content">
                      {row?.food.desc.split("大")[0]}
                    </div>
                  </div>
                </div>

                <div className="col-md-6 ">
                  <div>
                    <div className="item-title">السعر</div>
                    <div className="item-content">
                      {row?.food.price + " SR "}
                    </div>
                  </div>
                </div>
                {/* 
         <div className="col-md-6 ">
         <div >
            <div className="item-title">الحالة</div>
            <div className="item-content">{row?.provider?.status==0?"غير مفعل":"مفعل"}</div>
          </div>
         </div> */}

                <div className="col-md-6 ">
                  <div>
                    <div className="item-title">طريقة التقديم</div>
                    <div className="item-content">
                      {row?.food.serve_way.split("大")[0]}
                    </div>
                  </div>
                </div>

                {
                  <div className="col-md-6 ">
                    <div>
                      <div className="item-title">الملحقات</div>
                      <div className="item-content">
                        {row?.food.attatchments.split("大")[0]}
                      </div>
                    </div>
                  </div>
                }

                <div className="col-md-6 ">
                  <div>
                    <div className="item-title"> مدة التحضير</div>
                    <div className="item-content">
                      {row?.food.preparation_time + " د "}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div>
                    <div className="item-title">الطباخ</div>
                    <div className="item-content">
                      {row?.food.marketName.split("大")[0]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-7 pt-2 mt-3 gallery">
        <ImagesGallery images={row?.photos.map((img, index) => img.url)} />
      </div>
    </div>
    </>
  );
}
