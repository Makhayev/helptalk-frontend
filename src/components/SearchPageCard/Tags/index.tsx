import React from "react";

interface tagProps {
  label: string;
}

const Tag = ({ label }: tagProps) => {
  return (
    <div
      className={
        "tw-w-fit tw-mx-2 tw-text-white tw-bg-main tw-py-1 tw-px-4 tw-rounded-xl"
      }
    >
      {label}
    </div>
  );
};

export default Tag;
