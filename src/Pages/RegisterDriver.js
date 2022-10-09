import React from "react";
import styled from "styled-components";
import Notify from "../Components/Notify";
import * as constants from "./constants";
const CardWrapper = styled.div`
  .hide {
    display: none;
  }

  .searchWrapper {
    border: none;
  }

  .uploadFile {
    position: relative;
  }

  .uploadFile input {
    opacity: 0;
    width: 100%;
    z-index: 999;
  }

  .uploadDes {
    width: 100%;
    height: 60px;
    border: 3px dotted green;
    margin-left: 73px;
    position: absolute;
    text-align: center;
    padding-top: 14px;
    color: green;
    font-weight: 800;
  }

  .title-header h3 {
    font-size: 37px;
    font-weight: 800;
  }

  .title-header .appLogo {
    width: 120px;
    margin: auto;
    margin-top: -26px;
  }

  .text-right {
    text-align: right;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .F100 {
      flex: 100%;
    }
  }

  @media (max-width: 768px) {
    .sid-img {
      visibility: hidden;
    }

    .title-header .appLogo {
      width: 98px;
    }

    .title-header h3 {
      font-size: 28px;
      top: 54px;
      text-align: center;
    }

    .disBlock {
      display: block;
    }

    .title-header {
      margin: 0px 20px;
    }
    .input-field {
      flex: 100%;
    }
    .left-side {
      padding: 20px 10px;
      margin: 0px 10px;
      width: 95%;
    }
  }
`;

export default class RegisterDriver extends React.Component {
  componentDidMount() {}

  profileImage = null;
  gender = null;
  city = null;
  carImage = null;


  constructor(props) {
    super(props);
    this.state = {
      file: "../img/account.jpeg",
      carImage: null,
      error: null,
    };
    this.uploadSingleFile = this.uploadSingleFile.bind(this);
    this.uploadCarImage = this.uploadCarImage.bind(this);
    this.upload = this.upload.bind(this);
  }
  uploadSingleFile(e) {
    console.log("good");
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
    });
    this.uploadImage(e.target.files[0],"profileImage");
  }

  uploadCarImage(e){
    this.setState({
      carImage: URL.createObjectURL(e.target.files[0]),
    });
    this.uploadImage(e.target.files[0],"carImage");
  }


  upload(e) {
    e.preventDefault();
    console.log(this.state.file);
  }

  uploadImage = async (file,param) => {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("modle", "user");
    try {
      const response = await fetch(window.baseurl + "" + "admin/image/upload", {
        method: "POST",
        body: formdata,
      });
      const json = await response.json();
      console.log(json.imageUrl);
      if (param == "profileImage") {
        this.profileImage = json.imageUrl;
      } else if (param == "carImage") {
        this.carImage = json.imageUrl;
      }
    } catch (error) {
      console.error(error);
    }
  };

  postForm = async (event) => {
    event.preventDefault();
    this.setState({ error: null });
    const formdata = new FormData(event.target);
    const un = "+966" + event.target.elements.userName.value
    formdata.delete("userName");
    formdata.append("userName", un);
    formdata.append("knownName", "driver");
    formdata.append("country", this.country);
    formdata.append("city", this.city);
    formdata.append("gender", this.gender);
    formdata.append("address", "jubail");
    formdata.append("lat", 39);
    formdata.append("lng", 26);
    formdata.append("carImage", this.carImage);
    formdata.append("profileImage", this.profileImage ?? "a.jpeg");
    formdata.append("role", "driver");

    if(un.length!=13||un.startsWith("+9665")==false){
      this.setState({ error: " رقم الهاتف الذي أدخلته غير صحيح" });

      return
    }


    console.log("post");
    try {
      const response = await fetch(window.baseurl + "" + "auth/driver-signup", {
        method: "POST",
        body: formdata,
      });

      const json = await response.json();
      if (json.error) {
        this.setState({ error: json.error });
        return;
      }

      window.status = 0;
      window.location = "/success";
    } catch (error) {}
  };

  render() {
    return (
      <CardWrapper>
        <form onSubmit={this.postForm}>
          <div dir="rtl" className="container-fluid">
            <div className="row flex flex-row flex-nowrap test">
              <div className="h-[100vh] w-[30vw] fixed sid-img">
                <img
                  className="object-cover h-[100vh] w-[30vw]"
                  src="../img/driver_register_img.png"
                />
              </div>

              <div className="mx-[72px] grow my-[20px] mr-[35vw] left-side">
                <div className="row flex title-header grow disBlock flex-row justify-between items-center  ">
                  <h3>
                    <img className=" appLogo" src="../img/m24logo.png" />
                    اهلا بك مندوبنا
                  </h3>

                  <div className="upload flex flex-column items-center justify-center">
                    <img
                      className="h-[100px] mt-[20px] rounded-[200px] w-[100px] object-cover border-2 shadow"
                      src={this.state.file}
                    />
                    <div className="h-[30px]"></div>
                    <button type="button" className="btn-warning my-[10px]">
                      <i className="fa fa-upload"></i> صورة الحساب
                      <input
                        // required
                        onInvalid={(e) =>
                          e.target.setCustomValidity("اختر صورة الحساب")
                        }
                        onInput={(e) => e.target.setCustomValidity("")}
                        type="file"
                        onChange={this.uploadSingleFile}
                      />
                    </button>
                  </div>
                </div>
                {this.state.error && (
                  <div class="alert text-right alert-danger" role="alert">
                    {this.state.error}
                  </div>
                )}
                <div className="flex flex-row mb-[30px] justify-center  items-center">
                  <div className="font-bold  text-[24px]">البيانات الشخصية</div>
                  <div className="w-[50px]"></div>
                  <div className="h-[0.1px] grow bg-[black]"></div>
                </div>

                <div className="flex flex-row  flex-wrap">
                  <div className=" flex flex-row items-center h-[60px] input-field F100  flex-[35%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] border-2">
                    <div className="font-bold text-[12px] mx-[20px]">
                      الاسم بالكامل
                    </div>
                    <input
                      className="grow mx-[20px] font-bold text-[14px] outline-0	border-0"
                      placeholder="اكتب اسمك هنا"
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("اكتب الاسم")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      name="fullName"
                      type={"text"}
                    />
                  </div>

                  <div className="grow"></div>
                  <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] border-2">
                    <div className="font-bold text-[12px] mx-[20px]">
                      {"رقم الجوال" + "  " + "+966"}
                    </div>
                    <input
                      className="grow mx-[20px] font-bold text-[14px] outline-0	border-0"
                      required
                      maxlength="9"
                      placeholder="5xxxxxxxx"
                      name="userName"
                      onInvalid={(e) =>
                        e.target.setCustomValidity("اكتب رقم جوالك")
                      }
                      onInput={(e) => {
                        e.target.setCustomValidity("");

                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 9);
                      }}
                      type={"number"}
                    />
                  </div>

                  <div className="grow"></div>

                  <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] text-right bg-[white] shadow-sm rounded-[3px] border-2">
                    <div className="font-bold text-[12px] mx-[20px]">
                      البريد الإلكتروني
                    </div>
                    <input
                      className="grow mx-[20px] font-bold text-[14px] outline-0	border-0"
                      required
                      placeholder="اكتب بريدك الالكتروني "
                      onInvalid={(e) =>
                        e.target.setCustomValidity("اكتب بريدك الالكتروني")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      name="email"
                      type={"text"}
                    />
                  </div>
                  <div className="grow"></div>
                  <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] border-2 ">
                    <div className="font-bold text-[14px] mx-[20px]">الجنس</div>
                    <select
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("اختر الجنس")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      onChange={(e) => (this.gender = e.target.value)}

                      className="grow mx-[20px] font-bold text-[14px] outline-0	border-0"
                    >
                      <option value="">اختر</option>
                      <option value="ذكر">ذكر</option>
                      <option value="انثى">انثى</option>
                    </select>
                  </div>

                  <div className="grow"></div>
                  <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] border-2 ">
                    <div className="font-bold text-[14px] mx-[10px]">
                      الجنسية
                    </div>

                    <select
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("اختر الجنسية")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      onChange={(e) => (this.country = e.target.value)}
                      className="grow mx-[10px] font-bold text-[14px] outline-0	border-0"
                    >
                      <option value="">اختر</option>
                      {constants.countries.map((item) => (
                        <option value={item.name}>{item.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grow"></div>
                  <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] border-2 ">
                    <div className="font-bold text-[14px] mx-[10px]">
                      المدينة
                    </div>

                    <select
                       required 
                       onInvalid={(e) =>
                         e.target.setCustomValidity("اختر المدينة")
                       }
                       onInput={(e) => e.target.setCustomValidity("")}

                      onChange={(e) => (this.city = e.target.value)}
                      className="grow mx-[10px] font-bold text-[14px] outline-0	border-0"
                    >
                      <option value="">اختر</option>
                      {constants.cities.map((item) => (
                        <option value={item.name}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grow"></div>


                  

                  <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] border-2 ">
                    <div className="font-bold text-[14px] mx-[20px]">العمر</div>
                    <input
                      className="grow mx-[20px] font-bold text-[14px] outline-0	border-0"
                      required
                      placeholder="العمر "
                      onInvalid={(e) => e.target.setCustomValidity("العمر")}
                      onInput={(e) => e.target.setCustomValidity("")}
                      name="age"
                      type={"number"}
                    />
                  </div>

                  <div className="grow"></div>

                  <div className=" flex flex-row items-center h-[0px] input-field F100 flex-[35%] my-[15px] text-[15px]  ">
                    {/* <div className="font-bold text-[14px] mx-[20px]">
                      تاريخ الميلاد
                    </div>
                    <input
                      className="grow mx-[20px] date-inp font-bold text-[14px] outline-0	border-0"
                      required
                      placeholder="تاريخ الميلاد "
                      onInvalid={(e) =>
                        e.target.setCustomValidity("تاريخ الميلاد")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      name="identityNumber"
                      type={"date"}
                    /> */}
                  </div>
                  <div className="grow"></div>
                </div>

                <div className="flex flex-row justify-center mb-[30px]  mt-[30px] items-center">
                  <div className="font-bold text-[24px]">معلومات اخرى </div>
                  <div className="w-[50px]"></div>
                  <div className="h-[0.1px]  grow bg-[black]"></div>
                </div>

                <div className="flex flex-row flex-wrap">
                  <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] border-2 ">
                    <div className="font-bold text-[14px] mx-[20px]">
                      نوع السيارة
                    </div>
                    <input
                      className="grow mx-[20px] font-bold text-[14px] outline-0	border-0"
                      required
                      placeholder="نوع السيارة "
                      onInvalid={(e) =>
                        e.target.setCustomValidity("نوع السيارة")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      name="carType"
                      type={"text"}
                    />
                  </div>
                  <div className="grow"></div>

                  <div className=" flex flex-row uploadFile items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] ">
                    <input
                      className="grow mx-[10px] w-[100px] font-bold text-[14px] outline-0	border-0"
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("اختر صورة للسيارة ")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      type={"file"}
                      onChange={(e) => this.uploadCarImage(e)}
                    />

                    {this.state.carImage && (
                      <img
                        className="h-[40px] mx-[30px] rounded-[10px] w-[100px] object-cover border-2 shadow"
                        src={this.state.carImage}
                      />
                    )}
                    <div className="uploadDes">صورة السيارة</div>
                  </div>

                  {/* <div className="grow"></div>

                  <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] text-right bg-[white] shadow-sm rounded-[3px] border-2">
                    <div className="font-bold text-[12px] mx-[20px]">
                      رقم الهوية
                    </div>
                    <input
                      className="grow mx-[20px] font-bold text-[14px] outline-0	border-0"
                      required
                      placeholder="رقم الهوية "
                      onInvalid={(e) =>
                        e.target.setCustomValidity("اكتب رقم الهوية")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      name="identityNumber"
                      type={"number"}
                    />
                  </div> */}
                  <div className="grow"></div>

                  <button className=" flex flex-row items-center h-[60px] pointer input-field F100 flex-[35%] my-[15px] text-[15px] bg-[green] shadow-sm rounded-[3px] border-2">
                    <div className="m-[auto] text-[26px] text-[white] font-bold">
                      <input value={"تسجيل"} type="submit" />
                    </div>
                  </button>
                  <div className="grow"></div>
                  <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] "></div>
                  <div className="grow"></div>

                  {/* <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] border-2">
                  <div className="font-bold text-[14px] mx-[20px]">
                    اسم البنك
                  </div>
                  <input
                    className="grow mx-[20px] font-bold text-[14px] outline-0	border-0"
                    required
                    placeholder="اكتب اسم البنك "
                    onInvalid={(e) =>
                      e.target.setCustomValidity("اكتب اسم البنك")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    type={"text"}
                  />
                </div>

                <div className="grow"></div>

                <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] border-2">
                  <div className="font-bold text-[14px] mx-[20px]">
                    رقم الأيبان
                  </div>
                  <input
                    className="grow mx-[20px] font-bold text-[14px] outline-0	border-0"
                    required
                    placeholder="اكتب رقم الأيبان"
                    name="ibanNumber"
                    onInvalid={(e) =>
                      e.target.setCustomValidity("اكتب رقم الأيبان")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    type={"text"}
                  />
                </div> */}

                  {/* <div className="grow"></div> */}
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </form>
      </CardWrapper>
    );
  }
}
