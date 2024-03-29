import React, { useState } from "react";
import Tag from "./Tags";
import PsychologistModal from "../PsychologistModal";
import { Modal } from "antd";
import User from "../../store/user";
import { searchPageCardProps } from "../../interfaces";
import { Link } from "react-router-dom";

const SearchPageCard = ({
  name = "Arman Zhankin",
  description = "Hello! My name is Arman, I am a psychologist with 5 years of experience. I have worked for NU counselling and focus on people with eating disorders.",
  tags = ["Eating Disorders", "Professional", "Young People"],
  pricing = "100$ per hour",
  score,
  imageURL = "defaultPsychologistImage.png",
  psychologistID = 1,
}: searchPageCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  tags = tags.map((spec: any) => spec.name);
  return (
    <div className="tw-z-0 tw-grid tw-grid-cols-4 tw-w-2/3 tw-h-48 tw-my-4 tw-border-2 tw-rounded-xl tw-border-secondary tw-drop-shadow-sm">
      <div className="tw-flex tw-justify-center tw-items-center">
        <img
          src={imageURL}
          alt="psychologist image"
          className={"tw-w-3/4 tw-h-3/4"}
        />
      </div>
      <div className={"tw-col-span-2 tw-flex tw-flex-col tw-justify-around"}>
        <Link to={`/specialist/${psychologistID}`}>
          <div className={"tw-text-main tw-text-lg tw-underline tw-mt-4"}>
            {name}
          </div>
        </Link>
        <div>{description}</div>
        <div className={"tw-flex tw-flex-row"}>
          {tags?.map((tag: any) => (
            <Tag label={tag} />
          ))}
        </div>
      </div>
      <div className={"tw-flex-col tw-flex tw-justify-around tw-items-start"}>
        <div className={"tw-flex tw-justify-start tw-items-center tw-ml-2"}>
          <img src="money.svg" className={"tw-inline"} />
          <span className={"tw-ml-2 tw-text-main tw-text-lg"}>
            {pricing}$ per hour
          </span>
        </div>
        <div className="tw-flex tw-justify-end tw-items-center tw-ml-2">
          <img src="star.svg" className={"tw-inline"} />
          <span className={"tw-ml-2 tw-text-main tw-text-lg tw-ml-6"}>
            {score ? <span>{score}5</span> : <span>No ratings yet</span>}
          </span>
        </div>
        {User.role === "patient" && (
          <div
            className={
              "tw-text-main tw-text-lg tw-w-full tw-text-center tw-underline tw-font-bold tw-cursor-pointer"
            }
            onClick={() => {
              setIsModalOpen((prevState) => !prevState);
            }}
          >
            Make a booking
          </div>
        )}
      </div>
      <Modal
        open={isModalOpen}
        keyboard={true}
        onCancel={() => setIsModalOpen(false)}
        width={"550px"}
        footer={null}
      >
        <PsychologistModal
          className={"tw-pt-8"}
          psychologistName={name}
          psychologistID={psychologistID}
          closeModal={setIsModalOpen}
        />
      </Modal>
    </div>
  );
};

export default SearchPageCard;
