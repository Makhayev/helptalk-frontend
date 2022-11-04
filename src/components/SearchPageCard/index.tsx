import React from "react";
import Tag from "./Tags";

interface searchPageCardProps {
  name?: string;
  description?: string;
  tags?: string[];
  pricing?: string;
  score?: string;
  imageURL?: string;
}

const SearchPageCard = ({
  name = "Arman Zhankin",
  description = "Hello! My name is Arman, I am a psychologist with 5 years of experience. I have worked for NU counselling and focus on people with eating disorders.",
  tags = ["Eating Disorders", "Professional", "Young People"],
  pricing = "100$ per hour",
  score = "4.8",
  imageURL = "defaultPsychologistImage.png",
}: searchPageCardProps) => {
  return (
    <div className="tw-grid tw-grid-cols-4 tw-w-2/3 tw-h-48 tw-my-4 tw-border-2 tw-rounded-xl tw-border-secondary tw-drop-shadow-sm">
      <div className="tw-flex tw-justify-center tw-items-center">
        <img
          src={imageURL}
          alt="psychologist image"
          className={"tw-w-3/4 tw-h-3/4"}
        />
      </div>
      <div className={"tw-col-span-2 tw-flex tw-flex-col tw-justify-around"}>
        <div className={"tw-text-main tw-text-lg tw-underline tw-mt-4"}>
          {name}
        </div>
        <div>{description}</div>
        <div className={"tw-flex tw-flex-row"}>
          {tags?.map((tag) => (
            <Tag label={tag} />
          ))}
        </div>
      </div>
      <div className={"tw-flex-col tw-flex tw-justify-around tw-items-start"}>
        <div className={"tw-flex tw-justify-start tw-items-center tw-ml-2"}>
          <img src="public/money.svg" className={"tw-inline"} />
          <span className={"tw-ml-2 tw-text-main tw-text-lg"}>{pricing}</span>
        </div>
        <div className="tw-flex tw-justify-end tw-items-center tw-ml-2">
          <img src="public/star.svg" className={"tw-inline"} />
          <span className={"tw-ml-2 tw-text-main tw-text-lg tw-ml-6"}>
            {score}/5
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
