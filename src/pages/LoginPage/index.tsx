import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import { observer } from "mobx-react-lite";
import User from "../../mobx/user";

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSubmit = () => {
    //fetching is done here
    if (email === "admin" && password === "1234512345") {
      User.assignUser({
        surname: "adminov",
        name: "admin",
        id: 123,
        isAuth: true,
      });
    }
  };

  return (
    <div className={"tw-flex tw-justify-center"}>
      <div
        className={
          "tw-mt-20 tw-border tw-drop-shadow-md tw-border-secondary tw-h-96 tw-w-1/2 tw-rounded"
        }
      >
        <div
          className={
            "tw-flex-col tw-flex tw-justify-center tw-items-center tw-h-full"
          }
        >
          <div className={"tw-font-bold tw-text-3xl"}>Log In</div>
          <CustomInput
            setValue={setEmail}
            topText={"E-Mail"}
            placeholder={"Email"}
          />
          <CustomInput
            setValue={setPassword}
            topText={"Password"}
            placeholder={"Password"}
          />
          <button
            onClick={onHandleSubmit}
            className={
              "tw-w-1/2 tw-bg-main tw-text-white tw-h-12 tw-rounded-2xl tw-mt-4"
            }
          >
            Confirm
          </button>
          <div className={"tw-mt-4"}>
            Dont have an account?{" "}
            <button className={"tw-text-main"}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Login;
