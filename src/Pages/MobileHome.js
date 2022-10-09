import { useNavigate } from "react-router-dom";
import hasRole from "../Functions";

export default function MobileHome() {
  let navigate = useNavigate();

  return (
    <div className=" text-center my-3 ">
      {hasRole("admins") && (
        <button
          className="w-[80vw] h-[20vh] bg-[orange] my-3 rounded-md	"
          onClick={(e) => navigate("/admin/admins")}
        >
          <div className="flex justify-start px-[20px]">
          <i className="fa-solid fa-users text-[50px] text-[white]" />


            <h1 className="text-[white] mx-3">الإداريين</h1>
          </div>
        </button>
      )}
        {hasRole("accounts") && (
        <button
          className="w-[80vw] h-[20vh] bg-[orange] my-3 rounded-md	"
          onClick={(e) => navigate("/admin/accounts")}
        >
          <div className="flex justify-start px-[20px]">
            <i className="fa-solid fa-users text-[50px] text-[white]" />
            <h1 className="text-[white] mx-3">المستخدمين</h1>
          </div>
        </button>
      )}
        {hasRole("providers") && (
        <button
          className="w-[80vw] h-[20vh] bg-[orange] my-3 rounded-md	"
          onClick={(e) => navigate("/admin/providers")}
        >
          <div className="flex justify-start px-[20px]">
            <i className="fa-solid fa-user-group text-[50px] text-[white]" />
            <h1 className="text-[white] mx-3">الطباخين</h1>
          </div>
        </button>
      )}
        {hasRole("drivers") && (
        <button
          className="w-[80vw] h-[20vh] bg-[orange] my-3 rounded-md	"
          onClick={(e) => navigate("/admin/drivers")}
        >
          <div className="flex justify-start px-[20px]">
            <i className="fa-solid fa-car text-[50px] text-[white]" />
            <h1 className="text-[white] mx-3">المناديب</h1>
          </div>
        </button>
      )}
        {hasRole("foods") && (
        <button
          className="w-[80vw] h-[20vh] bg-[orange] my-3 rounded-md	"
          onClick={(e) => navigate("/admin/foods")}
        >
          <div className="flex justify-start px-[20px]">
            <i className="fa-solid fa-clipboard-list text-[50px] text-[white]" />
            <h1 className="text-[white] mx-3">الطبخات</h1>
          </div>
        </button>
      )}
        {hasRole("orders") && (
        <button
          className="w-[80vw] h-[20vh] bg-[orange] my-3 rounded-md	"
          onClick={(e) => navigate("/admin/orders")}
        >
          <div className="flex justify-start px-[20px]">
            <i className="fa-solid fa-clipboard-list text-[50px] text-[white]" />
            <h1 className="text-[white] mx-3">الطلبات</h1>
          </div>
        </button>
      )}
        {hasRole("") && (
        <button
          className="w-[80vw] h-[20vh] bg-[orange] my-3 rounded-md	"
          onClick={(e) => navigate("/")}
        >
          <div className="flex justify-start px-[20px]">
            <i className="fa fa-right-from-bracket text-[50px] text-[white]" />
            <h1 className="text-[white] mx-3"> خروج</h1>
          </div>
        </button>
      )}
    </div>
  );
}
