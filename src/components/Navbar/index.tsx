import React from "react";
import { observer } from "mobx-react-lite";
import { Menu, Button, Alert } from "antd";
import { Link } from "react-router-dom";
import User from "../../mobx/user";
import alert from "../../mobx/alert";
import { useGoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import clsx from "clsx";

const Navbar = observer(() => {
  const history = useHistory();
  const onHandleClick = (isProtected: boolean, caption: string) => {
    if (isProtected && !User.isAuth) {
      alert.openAlert(
        5000,
        "error",
        `you need to authorize first before viewing ${caption} page`
      );
    }
  };
  const isMobile = window.innerWidth < 1200;
  const { signOut } = useGoogleLogout({
    clientId: import.meta.env.VITE_CLIENTID,
  });

  return (
    <React.Fragment>
      {alert.isOpen && (
        <Alert
          banner
          type={alert.type}
          message={alert.message}
          showIcon={false}
          style={{
            textAlign: "center",
            position: "sticky",
            width: "100%",
            top: "0px",
            zIndex: 100,
          }}
        />
      )}
      <div className={"tw-flex tw-justify-between"} id="top">
        <Link to={"/"}>
          <img src={"/helptalkLogo.svg"} alt="logo" />
        </Link>
        <Menu
          mode={isMobile ? "vertical" : "horizontal"}
          selectable={false}
          multiple={false}
          className={clsx({
            "tw-items-end tw-w-1/4 tw-border-0": isMobile,
            "tw-items-center tw-w-1/2 tw-mr-16 tw-border-0 tw-justify-center":
              !isMobile,
          })}
        >
          <Menu.Item
            key={"home"}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link
              to={"/"}
              onClick={() => {
                onHandleClick(false, "home");
              }}
            >
              {"Home"}
            </Link>
          </Menu.Item>
          <Menu.Item
            key={"aboutUs"}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link
              to={"/aboutUs"}
              onClick={() => {
                onHandleClick(false, "About Us");
              }}
            >
              {"About Us"}
            </Link>
          </Menu.Item>
          {User.role === "admin" && (
            <Menu.Item
              key={"collaborate"}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link
                to={"/collaborate"}
                onClick={() => {
                  onHandleClick(true, "collaborate");
                }}
              >
                {"OpenAI"}
              </Link>
            </Menu.Item>
          )}
          <Menu.Item
            key={"search"}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link
              to={"/search"}
              onClick={() => {
                onHandleClick(true, "search");
              }}
            >
              {"Search"}
            </Link>
          </Menu.Item>
          {User.isAuth ? (
            <Menu.Item
              onClick={() => {
                User.logOutUser();
                signOut();
                alert.openAlert(5000, "success", "Log out successful");
              }}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              Log Out
            </Menu.Item>
          ) : (
            <Menu.Item
              key={"signUp"}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link
                to={"/signUp"}
                onClick={() => {
                  onHandleClick(false, "Sign Up");
                }}
              >
                {"Sign Up"}
              </Link>
            </Menu.Item>
          )}
          <Menu.Item
            key="logIn"
            style={{
              display: "flex",
              justifyContent: "center",
              height: isMobile ? "80px" : "",
            }}
          >
            {User.isAuth ? (
              <Button
                className={clsx(isMobile ? "tw-w-32" : "tw-w-48")}
                size="large"
                style={{
                  borderRadius: "20px",
                  whiteSpace: "pre-line",
                  height: "fit-content",
                }}
                onClick={() => {
                  history.push("/profile");
                }}
              >
                Welcome, {User.name}
              </Button>
            ) : (
              <Link to={"/login"}>
                <Button
                  className={clsx(isMobile ? "tw-w-32" : "tw-w-48")}
                  size="large"
                  style={{ borderRadius: "20px", height: "fit-content" }}
                >
                  Log in
                </Button>
              </Link>
            )}
          </Menu.Item>
        </Menu>
      </div>
      <hr
        style={{
          borderWidth: "0.1px",
          color: "gray",
          opacity: "30%",
        }}
      />
    </React.Fragment>
  );
});

export default Navbar;
