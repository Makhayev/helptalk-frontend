import React from "react";
import { Button, Dropdown, MenuProps, Space, message, Menu } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Simulate } from "react-dom/test-utils";

interface timeslotPropType {
  dropdownItems: string[];
  header: string;
  iconToShow?: any;
  setHeader: React.Dispatch<React.SetStateAction<any>>;
}

const CustomDropdown = ({
  dropdownItems,
  header,
  iconToShow,
  setHeader,
}: timeslotPropType) => {
  const menuItems = dropdownItems?.map((dropdownItem, index) => {
    return {
      label: dropdownItem,
      key: index,
      icon: iconToShow,
      onClick: () => {
        setHeader(dropdownItem);
      },
    };
  });
  const items = <Menu items={menuItems} />;
  return (
    <div>
      <Dropdown overlay={items}>
        <Button>
          <Space>
            {header}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default CustomDropdown;
