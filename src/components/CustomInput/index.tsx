import React from "react";
import { Input } from "antd";

interface CustomInputProps {
  placeholder: string;
  topText: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  isHidden?: boolean;
  isPassword?: boolean;
  className?: string;
  inputProps?: object;
}

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
