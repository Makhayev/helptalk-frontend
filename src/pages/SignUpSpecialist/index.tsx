import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import CustomInput from "../../components/CustomInput";
import { Link, useHistory } from "react-router-dom";
import User from "../../mobx/user";
import alert from "../../mobx/alert";
import axios from "axios";

const signUpSpecialist = observer(() => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [specialization, setSpecialization] = useState<string>("");
  const history = useHistory();

  const onHandleSubmit = () => {
    if (email === "admin" && password === "1234512345") {
      User.assignUser({
        surname: "adminov",
        name: "admin",
        id: 123,
        isAuth: true,
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
      console.log(price);
      alert.openAlert(5000, "error", "Price must be a number!");
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
    axios
      .post(`${import.meta.env.VITE_VERCEL_URL}/register/specialist`, {
        email: email,
        password: password,
        first_name: nameSurname[0],
        last_name: nameSurname[1],
        specialization_name: specialization,
        price: price,
      })
      .then((response) => {
        User.assignUser({
          surname: nameSurname[1],
          name: nameSurname[0],
          id: 123,
          isAuth: true,
        });
        alert?.openAlert(5000, "success", "registration successful");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        alert?.openAlert(5000, "error", "Could not register");
      });
  };
  return (
    <div className={"tw-flex tw-justify-center"}>
      <div
        className={
          "tw-my-20 tw-border tw-drop-shadow-md tw-border-secondary tw-w-1/2 tw-rounded"
        }
        style={{
          height: "100vh",
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
          <CustomInput
            setValue={setSpecialization}
            topText={"Specialization"}
            placeholder={"Specialization"}
            className={"tw-w-1/2 tw-my-2"}
          />
          <CustomInput
            setValue={setPrice}
            topText={"Price"}
            placeholder={"Price"}
            className={"tw-w-1/2 tw-my-2"}
          />
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
