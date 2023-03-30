import React from "react";
import { MainPageProfileCardProps } from "../../interfaces";

const contentStyle: React.CSSProperties = {
  height: 300,
  width: 300,
};

const MainPageProfileCard = ({
  fullname,
  logoPath,
  title,
}: MainPageProfileCardProps) => {
  return (
    <div className={"tw-flex "}>
      <div
        style={contentStyle}
        className={
          "tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-5 tw-shadow-xl"
        }
      >
        <div
          className={
            "tw-bg-white tw-w-40 tw-h-40 tw-flex tw-justify-center tw-items-center"
          }
        >
          <img src={logoPath} />
        </div>
        <div className="tw-font-semibold tw-text-lg">{fullname}</div>
        <div className="tw-w-3/4 tw-text-center">{title}</div>
      </div>
    </div>
  );
};

export default MainPageProfileCard;
