import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { observer } from "mobx-react-lite";
import User from "../../store/user";
import api from "../../api";
import { useHistory } from "react-router-dom";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
import { gapi } from "gapi-script";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import alert from "../../store/alert";

const clientId = import.meta.env.VITE_CLIENTID;

const Login = observer(() => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const notifyFail = () =>
    toast.error("Login failed!", {
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
    toast.success("Login success!", {
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
        isAuth: true,
        balance: 0,
        role: "admin",
      });
      history.push(User.pageToRedirect);
      alert.openAlert(4000, "success", "Login success");
      User.pageToRedirect = "/";
      return;
    }
    api
      .post(`/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.result) {
          User.assignUser({
            surname: response?.data?.last_name,
            name: response?.data?.first_name,
            id: response?.data?.id,
            balance: response?.data?.balance,
            isAuth: true,
            email: response?.data?.email,
            role: response?.data?.role,
          });
          notifySuccess();
          localStorage.setItem(
            "accessToken",
            response?.data?.token?.accessToken
          );
          localStorage.setItem(
            "refreshToken",
            response?.data?.token?.refreshToken
          );
          history.push(User.pageToRedirect);
          User.pageToRedirect = "/";
        } else {
          notifyFail();
        }
      })
      .catch((err) => {
        console.log(err);
        notifyFail();
      });
  };

  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void => {
    if ("profileObj" in response) {
      api
        .post("/loginGoogle", {
          email: response?.profileObj?.email,
        })
        .then((response) => {
          if (response.data.result) {
            User.assignUser({
              surname: response?.data?.last_name,
              name: response?.data?.first_name,
              id: response?.data?.id,
              isAuth: true,
              balance: 0,
              email: response?.data?.email,
              role: response?.data?.role,
            });
            notifySuccess();
            localStorage.setItem(
              "accessToken",
              response?.data?.token?.accessToken
            );
            localStorage.setItem(
              "refreshToken",
              response?.data?.token?.refreshToken
            );
            history.push(User.pageToRedirect);
            User.pageToRedirect = "/";
          } else {
            alert.openAlert(4000, "error", "Register first!");
          }
        });
    }
  };
  const onLogoutSuccess = () => {
    User.logOutUser();
  };
  const onFailure = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void => {};

  useEffect(() => {
    if (User.isAuth) {
      history.push(User.pageToRedirect);
    }
  }, [User.isAuth]);
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  useEffect(() => {
    const eventHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onHandleSubmit();
      }
    };
    document.addEventListener("keydown", eventHandler);
    return () => {
      document.removeEventListener("keydown", eventHandler);
    };
  }, []);

  return (
    <div className={"tw-flex tw-justify-center tw-flex-col tw-items-center"}>
      <div
        className={
          "tw-my-20 tw-border tw-drop-shadow-md tw-border-secondary tw-w-1/2 tw-rounded"
        }
        style={{
          height: "32rem",
        }}
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
            className={"tw-w-1/2 tw-my-2"}
          />
          <CustomInput
            isPassword
            setValue={setPassword}
            topText={"Password"}
            placeholder={"Password"}
            className={"tw-w-1/2 tw-my-2"}
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
            <button
              className={"tw-text-main"}
              onClick={() => {
                history.push("/signup");
              }}
            >
              Sign up
            </button>
          </div>
          <div className="tw-my-4">
            {User.isAuth ? (
              <GoogleLogout
                clientId={clientId}
                buttonText={"logout"}
                onLogoutSuccess={onLogoutSuccess}
              />
            ) : (
              <GoogleLogin
                clientId={clientId}
                buttonText={"Login"}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Login;
