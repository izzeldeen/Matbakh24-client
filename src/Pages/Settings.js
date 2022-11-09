import SwitcherView from "../Components/Switcher";
import {   useNavigate } from "react-router-dom";
import {useState} from 'react';
import Notify from "../Components/Notify";

export default function Settings() {
  //let navigate = useNavigate();
   const [data, setData] = useState(null);
   const [success , setSuccess] = useState(false);
  //const [lastName, setLastName] = useState('');
  
  const getForm = async () => {
    const response = await fetch(window.baseurl + "config/app-settings", {
      method: "POST",
      headers: {
        "Authorization":"Bearer "+localStorage.getItem("token")
      },
    });
    const json = await response.json();
    console.log(json);
   setData(json);
  }

  data == null && getForm();

  const postForm = async (event) => {
    setSuccess(false);
     event&&event.preventDefault()

  const formdata = new FormData(event.target)
    try {
      const response = await fetch(window.baseurl + "config/settings", {
        method: "POST",
        headers: {
          "Authorization":"Bearer "+localStorage.getItem("token")
        },
        body: formdata,
      });
      const json = await response.json();
      console.log(json);
      setSuccess(true);
     // navigate("/admin/admins");
    } catch (error) {
      console.error(error);
    }
  };

   function settings(inputData) {
    let formData = new FormData();
    Object.keys(inputData).forEach(fieldName => {
      console.log(fieldName, inputData[fieldName]);
      formData.append(fieldName, inputData[fieldName]);
    })
    return formData
  }

  return (
    <div dir="rtl" className="card col-9 card-default m-3 ">
      <h1 className="my-3">الإعدادات</h1>

     {success && <div class="alert alert-success" role="alert">
  تم تحديث البيانات بنجاح
</div>
}  
      <form  onSubmit={postForm}>
        <div className="row">
        {/* <div className="col-md-12 mt-2">
            <div className="input-group">
              <div className="input-group-prepend">
              </div>
              <input name="Firebase" type="text" className="form-control" placeholder="فايربيز" />
            </div>
          </div> */}
          <div className="col-md-12 mt-2">
            <div className="input-group">
              <div className="input-group-prepend">
              </div>
              <label className="col-md-12">اصدار نسخة ابل</label>
              <input name="iosAppVersion" defaultValue={data?.filter(x => x.vk == "iosAppVersion")[0]?.value} type="text" className="form-control" placeholder="نسخة ابل" />
            </div>
          </div>

          <div className="col-md-12 mt-2">
            <div className="input-group">
              <div className="input-group-prepend">
              </div>
              <label className="col-md-12">اصدار نسخة اندرويد</label>
              <input name="androidVersion" type="text" defaultValue={data?.filter(x => x.vk == "androidVersion")[0]?.value} className="form-control" placeholder="نسخة اندرويد" />
            </div>
          </div>

          <div className="col-md-12 mt-2">
            <div className="input-group">
              <div className="input-group-prepend">
              </div>
              <label className="col-md-12">  حذف الحساب</label>
              <input name="deleteAccount" defaultValue={data?.filter(x => x.vk == "deleteAccount")[0]?.value} type="text" className="form-control" placeholder="حالة اندرويد" />
            </div>
          </div>

          <div className="col-md-12 mt-2">
            <div className="input-group">
              <div className="input-group-prepend">
              </div>
              <label className="col-md-12"> النسخة تجريبية اندرويد</label>
              <input name="testAndroid" defaultValue={data?.filter(x => x.vk == "testAndroid")[0]?.value} type="text" className="form-control" placeholder="حالة ابل" />
            </div>
          </div>

          
          <div className="col-md-12 mt-2">
            <div className="input-group">
              <div className="input-group-prepend">
              </div>
              <label className="col-md-12"> النسخة تجريبية ابل</label>
              <input name="testIOS" defaultValue={data?.filter(x => x.vk == "testIOS")[0]?.value} type="text" className="form-control" placeholder=" الاسم بالكامل" />
            </div>
          </div>


</div>
<button type="submit" className="systemBtn bg-[#FFCA08] ms-[30px] rounded-[10px] w-[150px] btn text-center   font-bold" >
حفظ
</button>
        
      </form>

      
     
{/* 
      <div className="m-5">
        <div className="row flex items-center justify-between">
          <div className="">تفعيل خاصية إزالة الحساب</div>

          <div className="w-[30px] h-[20px]">
            <SwitcherView status={true} onChange={(checked) => {}} />
          </div>
        </div>
      </div> */}
    </div>
  );
}
