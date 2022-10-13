import React from "react";
import { observer } from "mobx-react-lite";
import { Menu, Button, Alert } from "antd";
import { Link } from "react-router-dom";
import User from "../../mobx/user";
import alert from "../../mobx/alert";

interface NavbarItem {
  caption: string;
  key: string;
  linkTo: string;
  isProtected: boolean;
}

const NavbarItems: NavbarItem[] = [
  {
    caption: "Home",
    key: "home",
    linkTo: "/",
    isProtected: false,
  },
  {
    caption: "About Us",
    key: "aboutUs",
    linkTo: "/aboutUs",
    isProtected: true,
  },
  {
    caption: "Collaborate",
    key: "collaborate",
    linkTo: "/collaborate",
    isProtected: true,
  },
  {
    caption: "Sign Up",
    key: "signUp",
    linkTo: "/signup",
    isProtected: false,
  },
  {
    caption: "Search",
    key: "search",
    linkTo: "/search",
    isProtected: true,
  },
];

const Navbar = observer(() => {
  const onHandleClick = (item: NavbarItem) => {
    if (item.isProtected && !User.isAuth) {
      alert.openAlert(
        5000,
        "error",
        `you need to authorize first before viewing ${item.caption} page`
      );
    }
  };

  return (
    <React.Fragment>
      {alert.isOpen && (
        <Alert banner type={alert.type} message={alert.message} />
      )}
      <div className={"tw-flex tw-justify-between"}>
        <img src={"/helptalkLogo.svg"} />
        <Menu
          mode={"horizontal"}
          className="tw-items-center tw-mr-8 tw-border-0"
        >
          {NavbarItems.map((NavBarItem) => (
            <Menu.Item key={NavBarItem.key}>
              <Link
                to={NavBarItem.linkTo}
                onClick={() => {
                  onHandleClick(NavBarItem);
                }}
              >
                {NavBarItem.caption}
              </Link>
            </Menu.Item>
          ))}
          <Menu.Item key="logIn" className="tw-w-36">
            {User.isAuth ? (
              <div> Welcome, {User.name} </div>
            ) : (
              <Link to={"/login"}>
                <Button
                  className="tw-w-24"
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
