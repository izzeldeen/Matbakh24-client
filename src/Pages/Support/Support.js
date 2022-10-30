import { useEffect, useState } from "react";
import useForceUpdate from "use-force-update";

import "./Support.css";
export default function Support() {
  var [chats, setChats] = useState(null);

  var [message, setMessage] = useState(null);
  var [currentChat, setCurrentChat] = useState();
  const getChats = async () => {
    try {
      const response = await fetch(window.baseurl + "admin/get-chats", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setChats(json);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentChat = async (userId) => {
    try {
      const formdata = new FormData();
      formdata.append("userId", userId);
      const response = await fetch(window.baseurl + "admin/get-user-messages", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formdata,
      });
      const json = await response.json();
      setCurrentChat(json[0]);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserChat = async (userId) => {
    try {
      const formdata = new FormData();
      formdata.append("userId", userId);
      const response = await fetch(
        window.baseurl + "support/update-user-chat",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: formdata,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      postForm();
      setMessage("");
    }
  };
  const submitForm = (e) => {
    postForm();
    setMessage("");
  };

  const postForm = async () => {
    try {
      var cChat = currentChat[0].user?.id;
      const formdata = new FormData();
      formdata.append("sender", "admin");
      formdata.append("message", message);
      formdata.append("userId", cChat);
      const response = await fetch(window.baseurl + "support/add-message", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formdata,
      });
      const json = await response.json();
      getCurrentChat(cChat);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const MINUTE_MS = 5000;
  useEffect(() => {
    getChats();
    var interval = setInterval(() => {
      getChats();
      getCurrentChat(currentChat[0].user?.id);
      console.log("fire");
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="support">
      <div dir="rtl" className="container">
        {/* ========= left side ========== */}
        <div className="left-side">
          <div className="header">
            <div className="user-imgBx">
              <img className="userImg m-auto" src="img/appLogo.png" />
            </div>
            <ul className="nav-icons">
              <p className="mx-3">{localStorage.getItem("name")}</p>
            </ul>
          </div>
          
          <div className="search-chat">
            <input type="text px-3" placeholder="  بحث عن مستخدم  " />
            <ion-icon name="search-outline" />
          </div>

          <div className="chat-list">
            {chats &&
              chats.map(
                (row) =>
                  row[row?.length - 1].user && (
                    <div
                      onClick={(e) => {
                        getCurrentChat(row[0].user?.id);
                        updateUserChat(row[0].user?.id);
                      }}
                      className={
                        currentChat &&
                        currentChat[0].user?.id == row[0].user?.id
                          ? "chat active"
                          : "chat"
                      }
                    >
                      <div className="imgBx">
                        <img
                          src={
                            window.baseurl +
                            "uploads/" +
                            (row[0].user?.profileImage == null
                              ? "a.jpeg"
                              : row[0].user?.profileImage)
                          }
                          alt=""
                        />
                      </div>
                      <div className="details">
                        <div className="head">
                          <h4 className="name">{row[0].user?.fullName}</h4>
                          <span className="time">
                            {row[row?.length - 1].message.date.replaceAll(
                              "T",
                              " "
                            )}
                          </span>
                        </div>
                        <div className="msgs">
                          <p className="msg">
                            {row[row?.length - 1].message.message}
                          </p>
                          {row?.filter((e) => e.message.status == 0).length >
                            0 && (
                            <b className="num unread">
                              {row?.filter((e) => e.message.status == 0).length}
                            </b>
                          )}
                        </div>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>

        {/* ========= right side ========== */}
        {
          <div className="right-side">
            <div className="header">
              <div className="user-details">
                <div className="user-imgBx">
                  {currentChat && (
                    <img
                      src={
                        window.baseurl +
                        "uploads/" +
                        (currentChat &&
                        currentChat[0].user?.profileImage == null
                          ? "a.jpeg"
                          : currentChat[0].user?.profileImage)
                      }
                      alt=""
                    />
                  )}{" "}
                </div>
                <h4>
                  {currentChat && currentChat[0].user?.fullName}
                  <br />
                  <h5 className="text-success mt-2">
                    {currentChat &&
                      currentChat[0].user?.userName?.replace("+", "")}
                  </h5>

                  {/* <span>متصل</span> */}
                </h4>
              </div>
              <ul className="nav-icons">
                <li>
                  <ion-icon name="search-outline" />
                </li>
                <li>
                  <ion-icon name="ellipsis-vertical" />
                </li>
              </ul>
            </div>
            <div className="chatBx">
              {currentChat &&
                currentChat.map((msg) => (
                  <div
                    className={
                      msg.message.sender !== "user"
                        ? "msg msg-me"
                        : "msg msg-frnd"
                    }
                  >
                    <p>
                      {msg.message.message} <br />{" "}
                      <span>{msg.message.date.replaceAll("T", " ")}</span>
                    </p>
                  </div>
                ))}
            </div>
            <div className="chat-input">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                name="message"
                placeholder="اكتب نص الرسالة"
              />
            </div>
          </div>
        }
      </div>
    </div>
  );
}
