import React from "react";
import { observer } from "mobx-react-lite";
import { Menu, Button } from "antd";
import { Link } from "react-router-dom";
interface NavbarItem {
  caption: string;
  key: string;
  linkTo: string;
}

const NavbarItems: NavbarItem[] = [
  {
    caption: "Home",
    key: "home",
    linkTo: "/",
  },
  {
    caption: "About Us",
    key: "aboutUs",
    linkTo: "/aboutUs",
  },
  {
    caption: "Collaborate",
    key: "collaborate",
    linkTo: "/collaborate",
  },
  {
    caption: "Sign Up",
    key: "signUp",
    linkTo: "/login",
  },
  {
    caption: "Search",
    key: "search",
    linkTo: "/search",
  },
];

const Navbar = observer(() => {
  return (
    <React.Fragment>
      <div className={"tw-flex tw-justify-between"}>
        <img src={"/public/helptalkLogo.svg"} />
        <Menu
          mode={"horizontal"}
          className="tw-items-center tw-mr-8 tw-border-0"
        >
          {NavbarItems.map((NavBarItem) => (
            <Menu.Item key={NavBarItem.key}>
              <Link to={NavBarItem.linkTo}>{NavBarItem.caption}</Link>
            </Menu.Item>
          ))}
          <Menu.Item key="logIn" className="tw-w-36">
            <Link to={"/login"}>
              <Button
                className="tw-w-24"
                size="large"
                style={{ borderRadius: "20px" }}
              >
                Log in
              </Button>
            </Link>
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
