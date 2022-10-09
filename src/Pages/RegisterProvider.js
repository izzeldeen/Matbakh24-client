import React from "react";
import * as constants from "./constants";
import styled from "styled-components";
import Multiselect from "multiselect-react-dropdown";

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

  .chip {
    padding: 2px 7px;
    background: #008000;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 11px;
    display: inline-flex;
    align-items: center;
    font-size: 11px;
    line-height: 19px;
    color: #fff;
  }

  .closeIcon {
    height: 13px;
    width: 13px;
    float: right;
    margin-left: -2px;
    cursor: pointer;
    margin-right: 5px;
  }

  .multiSelectContainer li:hover {
    background: #d8ba34;
    color: #fff;
    cursor: pointer;
  }

  .highlightOption {
    background: #dbbd37;
    color: #fff;
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

export default class RegisterProvider extends React.Component {
  componentDidMount() {
    this.getData();
  }
  profileImage = null;
  country = null;
  city = null;
  gender = null;
  logo = null;
  bannarImage = null;
  constructor(props) {
    super(props);
    this.state = {
      file: "../img/account.jpeg",
      logo: null,
      selectedFields: "",
      error: null,
      fields: null,
      bannarImage: null,
    };
    this.uploadSingleFile = this.uploadSingleFile.bind(this);
    this.onMultiSelect = this.onMultiSelect.bind(this);
    this.uploadBanar = this.uploadBanar.bind(this);
    this.uploadLogo = this.uploadLogo.bind(this);
    this.upload = this.upload.bind(this);
  }

  onMultiSelect(e) {
    var selectedFields = "";
    e.map(function (field) {
      selectedFields = selectedFields + field.id + "#";
    });
    this.setState({
      selectedFields: selectedFields,
    });

    //  console.log(selectedFields.substring(0,selectedFields.length-1));
  }
  uploadSingleFile(e) {
    console.log("good");
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
    });

    this.uploadImage(e.target.files[0], "profileImage");
  }
  upload(e) {
    e.preventDefault();
    console.log(this.state.file);
  }

  uploadLogo(e) {
    this.setState({
      logo: URL.createObjectURL(e.target.files[0]),
    });
    this.uploadImage(e.target.files[0], "image");
  }
  uploadBanar(e) {
    this.setState({
      bannarImage: URL.createObjectURL(e.target.files[0]),
    });
    this.uploadImage(e.target.files[0], "bannarImage");
  }

  uploadImage = async (file, param) => {
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
      } else if (param == "image") {
        this.logo = json.imageUrl;
      } else if (param == "bannarImage") {
        this.bannarImage = json.imageUrl;
      }
      //   navigate("/admin/drivers");
    } catch (error) {
      console.error(error);
    }
  };

  getData = async () => {
    try {
      const response = await fetch(window.baseurl + "get-home", {
        method: "Get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      this.setState({
        fields: json.fields,
      });
      this.state.fields.forEach((field) => {
        field.name = field.name.split("大")[0];
      });
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  postForm = async (event) => {
    event.preventDefault();
    this.setState({ error: null });

    if(this.state.selectedFields==null||this.state.selectedFields==""){
      this.setState({ error: "اختر نوع الطبخات التي تقدمها" });
      return
    }
    const formdata = new FormData(event.target);
    const jsonRequest = {};
    formdata.forEach(function (value, prop) {
      jsonRequest[prop] = value;
    });

    jsonRequest["userName"] = "+966" + jsonRequest["userName"];
    jsonRequest["phone"] = "966" + jsonRequest["userName"];
    jsonRequest["knownName"] = "driver";
    jsonRequest["lat"] = 39;
    jsonRequest["lng"] = 26;
    jsonRequest["city"] = "الدمام";
    jsonRequest["fields"] = this.state.selectedFields.substring(
      0,
      this.state.selectedFields.length - 1
    );
    jsonRequest["profileImage"] = this.profileImage;
    jsonRequest["image"] = this.logo;

    jsonRequest["gender"] = this.gender;
    jsonRequest["address"] = "-";
    jsonRequest["country"] = this.country;
    jsonRequest["city"] = this.city;
    jsonRequest["birth"] = this.birth;

    jsonRequest["identityImage"] = "a.jpeg";
    jsonRequest["bannarImage"] = this.bannarImage;
    jsonRequest["role"] = "provider";

    if(jsonRequest["userName"].length!=13||jsonRequest["userName"].startsWith("+9665")==false){
      this.setState({ error: "رقم الهاتف الذي أدخلته غير صحيح" });

      return
    }

    console.log("post");
    console.log(jsonRequest);
    try {
      const response = await fetch(
        window.baseurl + "" + "auth/register-market",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonRequest),
        }
      );
      const json = await response.json();
      if (json.error) {
        this.setState({ error: json.error });
        return;
      }
      console.log(json);
      window.status = 1;
      window.location = "/success";
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <CardWrapper>
        <form onSubmit={this.postForm}>
          <div dir="rtl" className="container-fluid">
            <div className="row flex flex-row flex-nowrap">
              <div className="h-[100vh] w-[30vw] fixed sid-img">
                <img
                  className="object-cover h-[100vh] w-[30vw]"
                  src="../img/driver_register_img.png"
                />
              </div>

              <div className="mx-[72px] grow my-[20px] mr-[35vw] left-side">
                <div className="row flex title-header grow disBlock flex-row justify-between items-center  ">
                  <h3>
                    {" "}
                    <img className=" appLogo" src="../img/m24logo.png" />
                    سجل مطبخك
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
                  <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] 100w my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] border-2">
                    <div className="font-bold text-[14px] mx-[20px]">
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
                  <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] 100w my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] border-2">
                    <div className="font-bold text-[14px] mx-[20px]">
                      {"رقم الجوال" + "  " + "+966"}
                    </div>
                    <input
                      className="grow mx-[20px] font-bold text-[14px] outline-0	border-0"
                      required
                      placeholder="5xxxxxxxx"
                      name="userName"
                      maxLength={9}
                      minLength={9}
                      onInvalid={(e) =>
                        e.target.setCustomValidity(" اكتب رقم جوالك")
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
                    <div className="font-bold text-[14px] mx-[20px]">
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
                  <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] ">
                    
                  </div>
                  <div className="grow"></div>

                  {/* <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] border-2 ">
                    <div className="font-bold text-[14px] mx-[20px]">
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
                      name="birth"
                      type={"date"}
                    />
                  </div> */}
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
                  {/* <div className="grow"></div> */}

                  {/* <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] "></div> */}

                  {/* <div className="grow"></div> */}
                </div>
                <div className="flex flex-row my-[30px] justify-center  items-center">
                  <div className="font-bold  text-[24px]">بيانات مطبخك</div>
                  <div className="w-[50px]"></div>
                  <div className="h-[0.1px] grow bg-[black]"></div>
                </div>
                <div className="grow"></div>

                <div className="flex flex-row  flex-wrap">
                  <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] border-2">
                    <input
                      className="grow mx-[20px] font-bold text-[14px] outline-0	border-0"
                      required
                      placeholder="اسم المطبخ "
                      onInvalid={(e) =>
                        e.target.setCustomValidity("اكتب  اسم")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      name="title"
                      type={"text"}
                    />
                  </div>

                  <div className="grow"></div>
                  <div className=" flex flex-row uploadFile items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] ">
                    <input
                      className="grow mx-[10px] w-[100px] font-bold text-[14px] outline-0	border-0"
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("اختر شعار المطبخ")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      type={"file"}
                      onChange={(e) => this.uploadLogo(e)}
                    />

                    {this.state.logo && (
                      <img
                        className="h-[40px] mx-[30px] rounded-[10px] w-[100px] object-cover border-2 shadow"
                        src={this.state.logo}
                      />
                    )}
                    <div className="uploadDes">شعار المطبخ</div>
                  </div>

                  <div className="grow"></div>
                  <div className=" flex uploadFile flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] ">
                    <input
                      className="grow mx-[10px] w-[100px] font-bold text-[14px] outline-0	border-0"
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("اختر  صورة")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      type={"file"}
                      onChange={(e) => this.uploadBanar(e)}
                    />
                    {this.state.bannarImage && (
                      <img
                        className="h-[40px] mx-[30px] rounded-[10px] w-[100px] object-cover border-2 shadow"
                        src={this.state.bannarImage}
                      />
                    )}
                    <div className="uploadDes">صورة البروفايل الترويجية</div>
                  </div>

                  <div className="grow"></div>
                  <div className=" flex py-[10px] flex-row items-center  input-field F100 flex-[35%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] border-2">
                    <div className="font-bold text-[10px] mx-[20px]">
                      الطبخات التي تقدمها
                    </div>
                    {this.state.fields && (
                      <Multiselect
                        displayValue="name"
                        isObject={true}
                        style={{
                          chips: {
                            background: "orange",
                          },
                        }}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        onSelect={this.onMultiSelect}
                        options={this.state.fields}
                      />
                    )}
                  </div>

                  {/* <div className="grow"></div>

                <div className=" flex  flex-row items-center h-[60px] flex-[89%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] border-2">
                <div className="font-bold text-[9px] mx-[20px]">
                    الطبخات التي تقدمها
                  </div>
                </div> */}
                  <div className="grow"></div>
                </div>
                {/* <div className="flex flex-row justify-center mb-[30px]  mt-[30px] items-center">
                  <div className="font-bold text-[24px]"> معلومات أخري </div>
                  <div className="w-[50px]"></div>
                  <div className="h-[0.1px]  grow bg-[black]"></div>
                </div> */}

                <div className="flex flex-row flex-wrap">
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

                  {/* <div className=" flex uploadFile flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px] bg-[white] shadow-sm rounded-[3px] ">
                    <input
                      className="grow mx-[10px] w-[100px] font-bold text-[14px] outline-0	border-0"
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("اختر  صورة")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      type={"file"}
                      onChange={(e) => this.uploadSingleFile(e, "bannarImage")}
                    />

                    {this.state.otherImages&&<img
                      className="h-[40px] mx-[30px] rounded-[10px] w-[100px] object-cover border-2 shadow"
                      src={this.state.otherImages}
                    />} 
                    <div className="uploadDes">تراخيص أعمال حرة (اختياري )</div>
                  </div> */}

                  <button className=" flex flex-row items-center h-[60px] pointer input-field F100 flex-[35%] my-[15px] text-[15px] bg-[green] shadow-sm rounded-[3px] border-2">
                    <div className="m-[auto] text-[26px] text-[white] font-bold">
                      <input value={"تسجيل"} type="submit" />
                    </div>
                  </button>
                  <div className="grow"></div>

                  <div className=" flex flex-row items-center h-[60px] input-field F100 flex-[35%] my-[15px] text-[15px]  "></div>
                  <div className="grow"></div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardWrapper>
    );
  }
}
