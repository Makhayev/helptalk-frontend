import React from "react";
import { Input } from "antd";

interface CustomInputProps {
  placeholder: string;
  topText: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isHidden?: boolean;
  isPassword?: boolean;
}

const CustomInput = ({
  placeholder,
  topText,
  setValue,
  isPassword = false,
}: CustomInputProps) => {
  return (
    <div className="tw-w-1/2 tw-my-2">
      <div className={"tw-mb-1"}>{topText}</div>
      {isPassword ? (
        <Input.Password
          className="tw-w-full"
          bordered
          placeholder={placeholder}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      ) : (
        <Input
          className="tw-w-full"
          bordered
          placeholder={placeholder}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      )}
    </div>
  );
};

export default CustomInput;
