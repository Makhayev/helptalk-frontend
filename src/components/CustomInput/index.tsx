import React from "react";
import { Input } from "antd";

interface CustomInputProps {
  placeholder: string;
  topText: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const CustomInput = ({ placeholder, topText, setValue }: CustomInputProps) => {
  return (
    <div className="tw-w-1/2 tw-my-2">
      <div className={"tw-mb-1"}>{topText}</div>
      <Input
        className="tw-w-full"
        bordered
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default CustomInput;
