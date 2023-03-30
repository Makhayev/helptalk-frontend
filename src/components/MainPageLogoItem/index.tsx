import React from "react";
import { MainPageLogoItemProps } from "../../interfaces";

const MainPageLogoItem = ({
  topText,
  logoPath,
  bottomText,
  enableRightBar = true,
}: MainPageLogoItemProps) => {
  return (
    <div className={"tw-flex tw-my-2"}>
      <div
        className={
          "tw-flex tw-flex-col tw-w-full tw-items-center tw-justify-between"
        }
      >
        <div
          className={
            "tw-bg-secondary tw-w-20 tw-h-20 tw-flex tw-justify-center tw-items-center"
          }
        >
          <img src={logoPath} />
        </div>
        <div className="tw-font-semibold tw-text-lg">{topText}</div>
        <div className="tw-w-3/4 tw-text-center">{bottomText}</div>
      </div>
      {enableRightBar && (
        <div
          className={"tw-border-r-2 tw-border-r-dark tw-border-opacity-40"}
        />
      )}
    </div>
  );
};

export default MainPageLogoItem;
