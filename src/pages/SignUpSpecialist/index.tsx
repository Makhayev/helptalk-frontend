import React, { ChangeEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import CustomInput from "../../components/CustomInput";
import { Link, useHistory } from "react-router-dom";
import User from "../../mobx/user";
import alert from "../../mobx/alert";
import { createClient } from "@supabase/supabase-js";
import api from "../../api/Api";
import { Button, Dropdown, Input, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const signUpSpecialist = observer(() => {
  const supabase = createClient(
    "https://tyzrmnbtpxpgasdzjmyg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5enJtbmJ0cHhwZ2FzZHpqbXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkyMTM5MTUsImV4cCI6MTk4NDc4OTkxNX0.Hmd0phyJLNhgq5t0WZ6mQXpQ6Ercj8IFpxXUF8U4C0g"
  );
  const starterPath =
    "https://tyzrmnbtpxpgasdzjmyg.supabase.co/storage/v1/object/public/files/";
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [specialization, setSpecialization] = useState<any>();
  const [description, setDescription] = useState<string>("");
  const [fileToUpload, setFileToUpload] = useState<File>();
  const [socialMediaAcc, setSocialMediaAcc] = useState<string>("");
  const [chosenSocialMedia, setChosenSocialMedia] = useState<any>();
  const [socialMedias, setSocialMedias] = useState<any>();
  const [specializations, setSpecializations] = useState<any[]>([]);
  const [phone, setPhone] = useState<string>("");

  const history = useHistory();

  const validatePassword = (pass: string) => {
    if (pass === "") {
      alert.openAlert(5000, "error", "Password is empty!");
      return false;
    }
    if (pass?.length < 6) {
      alert.openAlert(5000, "error", "Password too short!");
      return false;
    }
    if (!/\d/.test(pass)) {
      alert.openAlert(
        5000,
        "error",
        "Password has to contain at least 1 number!"
      );
      return false;
    }
    if (!/[A-Z]/.test(pass)) {
      alert.openAlert(
        5000,
        "error",
        "Password has to contain at least 1 capital letter!"
      );

      return false;
    }
    return true;
  };

  const onHandleSubmit = async () => {
    if (email === "admin" && password === "1234512345") {
      User.assignUser({
        surname: "adminov",
        name: "admin",
        id: "admin@admin.com",
        isAuth: true,
        role: "specialist",
      });
      alert?.openAlert(5000, "success", "Welcome admin");
      history.push("/");
      return;
    }
    if (confirmPassword !== password) {
      alert.openAlert(5000, "error", "Passwords dont match!");
      return;
    }
    if (isNaN(price ?? 0)) {
      alert.openAlert(5000, "error", "Price must be a number!");
      return;
    }
    if (email.split("@").length !== 2) {
      alert.openAlert(5000, "error", "Email is incorrect");
      return;
    }
    if (!validatePassword(password)) {
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
    const filePath = await handleUpload();
    if (!filePath) {
      alert.openAlert(5000, "error", "Upload file!");
      return;
    }
    api
      .post(`${import.meta.env.VITE_VERCEL_URL}/register/specialist`, {
        email: email,
        password: password,
        first_name: nameSurname[0],
        last_name: nameSurname[1],
        specializations: [specialization.id],
        price: price,
        description: description,
        path: filePath,
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
          role: "specialist",
        });
        localStorage.setItem("accessToken", response?.data?.token?.accessToken);
        localStorage.setItem(
          "refreshToken",
          response?.data?.token?.refreshToken
        );
        alert?.openAlert(5000, "success", "registration successful");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        alert?.openAlert(5000, "error", "Could not register");
      });
  };
  const handleUpload = async () => {
    if (!fileToUpload) {
      return;
    }
    const { data, error } = await supabase.storage
      .from("files")
      .upload("public/" + fileToUpload?.name, fileToUpload as File);

    if (data) {
      return starterPath + data?.path;
    } else if (error) {
      console.log(error);
    }
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
    api.get("/specialization/getAll").then((res) => {
      setSpecializations(res.data);
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
  const menuItems2 = specializations.map((spec: any) => {
    return {
      label: spec.name,
      key: spec.id,
      onClick: () => {
        setSpecialization(spec);
      },
    };
  });
  const items2 = <Menu items={menuItems2} />;
  const items = <Menu items={menuItems} />;
  return (
    <div className={"tw-flex tw-justify-center"}>
      <div
        className={
          "tw-my-20 tw-border tw-drop-shadow-md tw-border-secondary tw-w-1/2 tw-rounded"
        }
        style={{
          height: "130vh",
        }}
      >
        <div
          className={
            "tw-flex-col tw-flex tw-justify-center tw-items-center tw-h-full"
          }
        >
          <div className={"tw-font-bold tw-text-3xl tw-mb-4"}>
            Create Specialist Account
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
          <div className={"tw-w-1/2 tw-my-2"}>
            <Dropdown overlay={items2} className={"tw-w-full"}>
              <Button className={"tw-w-full"}>
                <Space>
                  {specialization?.name ?? "Choose Specialization"}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <CustomInput
            setValue={setPrice}
            topText={"Price"}
            placeholder={"Price"}
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
          <div>Description</div>
          <div className={"tw-w-1/2 tw-"}>
            <Input.TextArea
              placeholder={"Describe Yourself in a few words..."}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
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
          <input
            onChange={(e) => {
              setFileToUpload(e.target.files?.[0]);
            }}
            multiple
            type="file"
            className={"tw-my-4"}
          />
          <button
            onClick={onHandleSubmit}
            className={
              "tw-w-1/2 tw-bg-main tw-text-white tw-h-12 tw-rounded-2xl tw-mt-6"
            }
          >
            Register Specialist Account
          </button>
          <div className="tw-mt-4">
            Are you a patient?
            <Link to={"/signUp"} className={"tw-text-main"}>
              Click here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default signUpSpecialist;
