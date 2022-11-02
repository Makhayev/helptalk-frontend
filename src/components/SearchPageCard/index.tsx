import React from "react";
import Tag from "./Tags";

const SearchPageCard = () => {
  return (
    <div className="tw-grid tw-grid-cols-4 tw-w-2/3 tw-h-48 tw-my-4 tw-border-2 tw-rounded-xl tw-border-secondary tw-drop-shadow-sm">
      <div className="tw-flex tw-justify-center tw-items-center">
        <img
          src="public/defaultPsychologistImage.png"
          alt="default psychologist image"
          className={"tw-w-3/4 tw-h-3/4"}
        />
      </div>
      <div className={"tw-col-span-2 tw-flex tw-flex-col tw-justify-around"}>
        <div className={"tw-text-main tw-text-lg tw-underline tw-mt-4"}>
          Arman Zhankin
        </div>
        <div>
          Hello! My name is Arman, I am a psychologist with 5 years of
          experience. I have worked for NU counselling and focus on people with
          eating disorders.
        </div>
        <div className={"tw-flex tw-flex-row"}>
          <Tag label={"Eating disorders"} />
          <Tag label={"Professional"} />
          <Tag label={"Young People"} />
        </div>
      </div>
      <div className={"tw-flex-col tw-flex tw-justify-around tw-items-start"}>
        <div className={"tw-flex tw-justify-start tw-items-center tw-ml-2"}>
          <img src="public/money.svg" className={"tw-inline"} />
          <span className={"tw-ml-2 tw-text-main tw-text-lg"}>
            100$ per hour
          </span>
        </div>
        <div className="tw-flex tw-justify-end tw-items-center tw-ml-2">
          <img src="public/star.svg" className={"tw-inline"} />
          <span className={"tw-ml-2 tw-text-main tw-text-lg tw-ml-6"}>
            4.8/5
          </span>
        </div>
        <div
          className={
            "tw-text-main tw-text-lg tw-w-full tw-text-center tw-underline tw-font-bold"
          }
        >
          Make a booking
        </div>
      </div>
    </div>
  );
};

export default SearchPageCard;
