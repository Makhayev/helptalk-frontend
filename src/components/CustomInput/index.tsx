import React from "react";
import { Input } from "antd";
import { CustomInputProps } from "../../interfaces";

const CustomInput = ({
  placeholder,
  topText,
  setValue,
  isPassword = false,
  className = "",
  inputProps,
}: CustomInputProps) => {
  return (
    <div className={className}>
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
          {...inputProps}
        />
      )}
    </div>
  );
};

export default CustomInput;
