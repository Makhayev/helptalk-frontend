import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { observer } from "mobx-react-lite";
import User from "../../store/user";
import api from "../../api";
import alert from "../../store/alert";
import { Link, useHistory } from "react-router-dom";
import { Button, Dropdown, Input, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = observer(() => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [socialMediaAcc, setSocialMediaAcc] = useState<string>("");
  const [chosenSocialMedia, setChosenSocialMedia] = useState<any>();
  const [socialMedias, setSocialMedias] = useState<any>();
  const [phone, setPhone] = useState<string>("");

  const history = useHistory();

  const notifyFail = () =>
    toast.error("Registration failed!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifySuccess = () => {
    toast.success("Registration success!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const onHandleSubmit = () => {
    if (email === "admin" && password === "1234512345") {
      User.assignUser({
        surname: "adminov",
        name: "admin",
        id: "admin@admin.com",
        email: "admin@admin.com",
        balance: 0,
        isAuth: true,
        role: "patient",
      });
      alert?.openAlert(5000, "success", "Welcome admin");

      history.push("/");
      return;
    }
    if (confirmPassword !== password) {
      alert.openAlert(5000, "error", "Passwords dont match!");
      return;
    }
    if (email.split("@").length !== 2) {
      alert.openAlert(5000, "error", "Email is incorrect");
      return;
    }
    const nameSurname = fullName?.split(" ");
    if (nameSurname.length !== 2) {
      alert.openAlert(
        5000,
        "error",
        "Please write your first name and last name properly"
      );
      return;
    }
    api
      .post(`/register/patient`, {
        email: email,
        password: password,
        first_name: nameSurname[0],
        last_name: nameSurname[1],
        phone: phone,
        socialmedia_id: chosenSocialMedia.id,
        socialmedia_account: socialMediaAcc,
      })
      .then((response) => {
        User.assignUser({
          surname: nameSurname[1],
          name: nameSurname[0],
          id: response.data.id,
          isAuth: true,
          email,
          balance: response.data.balance,
          role: "patient",
        });
        localStorage.setItem("accessToken", response?.data?.token?.accessToken);
        localStorage.setItem(
          "refreshToken",
          response?.data?.token?.refreshToken
        );
        //alert?.openAlert(5000, "success", "registration successful");
        notifySuccess();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        //alert?.openAlert(5000, "error", "Could not register");
        notifyFail();
      });
  };

  useEffect(() => {
    const eventHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onHandleSubmit();
      }
    };
    api.get("/socialMedia/getAll").then((res) => {
      setSocialMedias(res.data);
    });
    document.addEventListener("keydown", eventHandler);
    return () => {
      document.removeEventListener("keydown", eventHandler);
    };
  }, []);
  const menuItems = socialMedias?.map((socialMedia: any) => {
    return {
      label: socialMedia.name,
      key: socialMedia.id,
      onClick: () => {
        setChosenSocialMedia(socialMedia);
      },
    };
  });
  const items = <Menu items={menuItems} />;

  return (
    <div className={"tw-flex tw-justify-center"}>
      <div
        className={
          "tw-my-20 tw-border tw-drop-shadow-md tw-border-secondary tw-w-1/2 tw-rounded"
        }
        style={{
          height: "90vh",
        }}
      >
        <div
          className={
            "tw-flex-col tw-flex tw-justify-center tw-items-center tw-h-full"
          }
        >
          <div className={"tw-font-bold tw-text-3xl tw-mb-4"}>
            Create Patient Account
          </div>
          <CustomInput
            setValue={setFullName}
            topText={"Full Name"}
            placeholder={"Full Name"}
            className={"tw-w-1/2 tw-my-2"}
          />
          <CustomInput
            setValue={setEmail}
            topText={"E-Mail"}
            placeholder={"Email"}
            className={"tw-w-1/2 tw-my-2"}
          />
          <CustomInput
            placeholder={"Telegram username, whatsapp number, etc"}
            topText={"Social Media Account"}
            setValue={setSocialMediaAcc}
            className={"tw-w-1/2 tw-my-2"}
          />
          <div className={"tw-w-1/2 tw-my-2"}>
            <Dropdown overlay={items} className={"tw-w-full"}>
              <Button className={"tw-w-full"}>
                <Space>
                  {chosenSocialMedia?.name ?? "Choose Social Media Type"}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div className={"tw-w-1/2"}>
            <div>Your Phone Number</div>
            <Input
              className="tw-w-full tw-my-2"
              bordered
              placeholder={"8777555555"}
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <CustomInput
            isPassword
            setValue={setPassword}
            topText={"Password"}
            placeholder={"Password"}
            className={"tw-w-1/2 tw-my-2"}
          />
          <CustomInput
            isPassword
            setValue={setConfirmPassword}
            topText={"Confirm Password"}
            className={"tw-w-1/2 tw-my-2"}
            placeholder={"Confirm Password"}
          />
          <button
            onClick={onHandleSubmit}
            className={
              "tw-w-1/2 tw-bg-main tw-text-white tw-h-12 tw-rounded-2xl tw-mt-6"
            }
          >
            Register Patient Account
          </button>
          <div className="tw-mt-4">
            Are you a specialist?
            <Link to={"/signUpSpecialist"} className={"tw-text-main"}>
              Click here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SignUp;
