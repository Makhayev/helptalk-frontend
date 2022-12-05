import React from "react";
import PsychologistInfo from "../../components/PsychologistInfo";
import { BsFillTelephoneFill, BsTelegram } from "react-icons/bs";
import { GrMail } from "react-icons/gr";

interface psychologistPageProps {
  imageURL?: string;
  imageAlt?: string;
  fullName?: string;
  title?: string;
  number?: string;
  email?: string;
  telegramUsername?: string;
  description?: string;
  price?: string;
  rating?: string;
}

const PsychologistCard = ({
  imageURL = "/defaultPsychologistImage.png",
  imageAlt = "zhankin",
  fullName = "Arman Zhankin",
  title = "psychiatrist",
  number = "87006641743",
  email = "arman.zhankin@gmail.com",
  telegramUsername = "@Zhankin",
  description = "Hello! My name is Arman, I am a psychologist with 5 years of experience. I have worked for NU counselling and focus on people with eating disorders.",
  price = "100$",
  rating = "4.8",
}: psychologistPageProps) => {
  return (
    <div className={"tw-flex tw-justify-center tw-mt-10"}>
      <div
        style={{ height: "150vh", width: "40vw" }}
        className={
          "tw-border-secondary tw-border-2 tw-flex tw-flex-col tw-items-center tw-p-5"
        }
      >
        <div className={"tw-flex tw-w-full tw-justify-start"}>
          <img src={imageURL} style={{ width: "20vw" }} alt={imageAlt} />
          <div
            className={
              "tw-flex tw-flex-col tw-justify-between tw-h-3/4 tw-ml-2"
            }
          >
            <div className={"tw-text-xl tw-font-bold"}>{fullName}</div>
            <div className={"tw-font-medium tw-text-lg"}>{title}</div>
            <div className={"tw-text-secondary"}>___________</div>
            <div className={"tw-font-light tw-flex tw-items-center "}>
              <BsFillTelephoneFill color={"#5877C5"} size={20} />
              <div className={"tw-text-lg tw-ml-2"}>{number}</div>
            </div>
            <div className={"tw-font-light tw-my-1  tw-flex tw-items-center "}>
              <GrMail color={"#5877C5"} size={20} />
              <div className={"tw-text-lg tw-ml-2"}>{email}</div>
            </div>
            <div className={"tw-font-light tw-my-1  tw-flex tw-items-center "}>
              <BsTelegram color={"#5877C5"} size={20} />
              <div className={"tw-text-lg tw-ml-2"}>{telegramUsername}</div>
            </div>
          </div>
        </div>
        <div className={"tw-flex tw-flex-col"}>
          <div>About</div>
          <div className="tw-text-main">________</div>
          <div>{description}</div>
          <div className={"tw-flex tw-justify-between tw-my-8"}>
            <div>
              <img alt="money" src="/money.svg" className={"tw-inline"} />
              <span className={"tw-ml-2 tw-text-main tw-text-lg"}>
                {price}/hour
              </span>
            </div>
            <div>
              <img alt={"stars"} src="/star.svg" className={"tw-inline"} />
              <span className={"tw-ml-2 tw-text-main tw-text-lg tw-ml-6"}>
                {rating}/5
              </span>
            </div>
          </div>
          <div></div>
        </div>
        <PsychologistInfo />
      </div>
    </div>
  );
};

export default PsychologistCard;
