import React from "react";

interface MainPageProfileCardProps {
  fullname: string;
  logoPath: string;
  title: string;
}
const MainPageProfileCard = ({
  fullname,
  logoPath,
  title,
}: MainPageProfileCardProps) => {
  return (
    <div className={"tw-flex "}>
      <div
        className={
          "tw-flex tw-flex-col tw-items-center tw-justify-between tw-px-5 tw-shadow-inner"
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
