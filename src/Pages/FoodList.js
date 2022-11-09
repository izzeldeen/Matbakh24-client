import { Link, useLocation } from "react-router-dom";
import CusineMeals from "./CusineMeals";

export default function FoodList() {
  const location = useLocation();
  const row = location.state.row;
  return (
    <>
    <div className="header col-sm-12 bg-transparent" style={{paddingTop:"20px"}}>
      <Link to={"/admin/foods"}>
        <i className=" text-danger fa-solid fa-rectangle-xmark fa-2xl" />
      </Link>
    </div>
    <div className="FoodListCont col-md-12 container">
      <div className="">
        <h1>قائمة الطبخات</h1>
      </div>
        <CusineMeals className="container" row={row} />
    </div>
    </>
  );
}
