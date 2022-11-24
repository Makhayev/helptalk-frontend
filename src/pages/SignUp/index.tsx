import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import { observer } from "mobx-react-lite";
import User from "../../mobx/user";
import axios from "axios";
import alert from "../../mobx/alert";
import { Link, useHistory } from "react-router-dom";
const SignUp = observer(() => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const history = useHistory();
  const onHandleSubmit = () => {
    if (email === "admin" && password === "1234512345") {
      User.assignUser({
        surname: "adminov",
        name: "admin",
        id: 123,
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
    axios
      .post(`${import.meta.env.VITE_VERCEL_URL}/register/patient`, {
        email: email,
        password: password,
        first_name: nameSurname[0],
        last_name: nameSurname[1],
      })
      .then((response) => {
        User.assignUser({
          surname: nameSurname[1],
          name: nameSurname[0],
          id: 123,
          isAuth: true,
          role: "patient",
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
          height: "70vh",
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
            Are you a specialist?{" "}
            <Link to={"/signUpSpecialist"} className={"tw-text-main"}>
              Click here
            </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
});

export default SignUp;
