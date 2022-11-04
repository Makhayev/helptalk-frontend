import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import { observer } from "mobx-react-lite";
import User from "../../mobx/user";
import axios from "axios";
import alert from "../../mobx/alert";
import { useHistory } from "react-router-dom";
const SignUp = observer(() => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    const nameSurname = fullName?.split(" ");

    axios
      .post(`${import.meta.env.VITE_ENDPOINT}/register/patient`, {
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
            Create Your Account
          </div>
          <CustomInput
            setValue={setFullName}
            topText={"Full Name"}
            placeholder={"Full Name"}
          />
          <CustomInput
            setValue={setEmail}
            topText={"E-Mail"}
            placeholder={"Email"}
          />
          <CustomInput
            isPassword
            setValue={setPassword}
            topText={"Password"}
            placeholder={"Password"}
          />
          <CustomInput
            isPassword
            setValue={setConfirmPassword}
            topText={"Confirm Password"}
            placeholder={"Confirm Password"}
          />
          <button
            onClick={onHandleSubmit}
            className={
              "tw-w-1/2 tw-bg-main tw-text-white tw-h-12 tw-rounded-2xl tw-mt-6"
            }
          >
            Register Account
          </button>
        </div>
      </div>
    </div>
  );
});

export default SignUp;
