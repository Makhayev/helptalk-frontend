import React from "react";
import { observer } from "mobx-react-lite";
import { Menu, Button, Alert } from "antd";
import { Link } from "react-router-dom";
import User from "../../mobx/user";
import alert from "../../mobx/alert";
import { useGoogleLogout } from "react-google-login";

const Navbar = observer(() => {
  const onHandleClick = (isProtected: boolean, caption: string) => {
    if (isProtected && !User.isAuth) {
      alert.openAlert(
        5000,
        "error",
        `you need to authorize first before viewing ${caption} page`
      );
    }
  };
  const { signOut } = useGoogleLogout({
    clientId:
      "100816583468-qr2j2edfsofd3mor6lk9prnqbuqu7a1d.apps.googleusercontent.com",
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
            position: "absolute",
            width: "100%",
          }}
        />
      )}
      <div className={"tw-flex tw-justify-between"}>
        <img src={"/helptalkLogo.svg"} alt="logo" />
        <Menu
          mode={"horizontal"}
          selectable={false}
          multiple={false}
          className="tw-items-center tw-w-1/2 tw-mr-16 tw-border-0"
        >
          {/* Had to write sh1t code because ant would behave strangely
                if decomposed with components
                //TODO fix it
          */}
          <Menu.Item key={"home"}>
            <Link
              to={"/"}
              onClick={() => {
                onHandleClick(false, "home");
              }}
            >
              {"Home"}
            </Link>
          </Menu.Item>
          <Menu.Item key={"aboutUs"}>
            <Link
              to={"/aboutUs"}
              onClick={() => {
                onHandleClick(true, "About Us");
              }}
            >
              {"About Us"}
            </Link>
          </Menu.Item>
          <Menu.Item key={"collaborate"}>
            <Link
              to={"/collaborate"}
              onClick={() => {
                onHandleClick(true, "collaborate");
              }}
            >
              {"OpenAI"}
            </Link>
          </Menu.Item>
          <Menu.Item key={"search"}>
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
              }}
            >
              Log Out
            </Menu.Item>
          ) : (
            <Menu.Item key={"signUp"}>
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
          <Menu.Item key="logIn" className="tw-w-60">
            {User.isAuth ? (
              <Button
                className="tw-w-48"
                size="large"
                style={{ borderRadius: "20px" }}
              >
                Welcome, {User.name}
              </Button>
            ) : (
              <Link to={"/login"}>
                <Button
                  className="tw-w-48"
                  size="large"
                  style={{ borderRadius: "20px" }}
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
