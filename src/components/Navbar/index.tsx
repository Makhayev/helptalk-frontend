import React from "react";
import { observer } from "mobx-react-lite";
import { Menu, Button, Alert } from "antd";
import { Link } from "react-router-dom";
import User from "../../mobx/user";
import alert from "../../mobx/alert";
import { useGoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import api from "../../api/Api";
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
  const { signOut } = useGoogleLogout({
    clientId: import.meta.env.VITE_CLIENTID,
  });
  const checkIfLogged = () => {
    api
      .get(`${import.meta.env.VITE_VERCEL_URL}/protected`)
      .then((res) => {
        console.log(res);
        window.alert("SEEMS GUCCI");
      })
      .catch((err) => {
        console.log(err);
        window.alert("SHIT HIT THE FAN");
      });
  };
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
      <div className={"tw-flex tw-justify-between"}>
        <img src={"/helptalkLogo.svg"} alt="logo" />
        <Menu
          mode={"horizontal"}
          selectable={false}
          multiple={false}
          className="tw-items-center tw-w-1/2 tw-mr-16 tw-border-0"
        >
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
                onHandleClick(false, "About Us");
              }}
            >
              {"About Us"}
            </Link>
          </Menu.Item>
          <Menu.Item key={"Check"}>
            <Button onClick={checkIfLogged}>Check</Button>
          </Menu.Item>
          {User.role === "admin" && (
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
          )}
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
                alert.openAlert(5000, "success", "Log out successful");
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
                onClick={() => {
                  history.push("/profile");
                }}
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
