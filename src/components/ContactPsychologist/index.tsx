import React from "react";
import { Button, Dropdown, MenuProps, Space, message, Menu } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
// FKIN REMOVE THIS ANT I AM TILTED FR
const ContactPsychologist = () => {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const items = (
    <Menu
      items={[
        {
          label: "1st menu item",
          key: "1",
          icon: <UserOutlined />,
        },
        {
          label: "2nd menu item",
          key: "2",
          icon: <UserOutlined />,
        },
        {
          label: "3rd menu item",
          key: "3",
          icon: <UserOutlined />,
        },
      ]}
    />
  );
  return (
    <div>
      <Dropdown overlay={items}>
        <Button>
          <Space>
            Button
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default ContactPsychologist;
