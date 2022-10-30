import SwitcherView from "../Components/Switcher";

export default function Settings() {
  return (
    <div dir="rtl" className="card col-9 card-default m-3 ">
      <h1 className="my-3">الإعدادات</h1>

      <div>
        {/* <h2 >إعدادات تطبيق الموبايل</h2> */}
        <div className="row flex items-center justify-between">
          <div className="">تفعيل خاصية إزالة الحساب</div>

          <div className="w-[30px] h-[20px]">
            <SwitcherView status={true} onChange={(checked) => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}
