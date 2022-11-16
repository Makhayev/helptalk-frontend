import React from "react";
import PsychologistInfo from "../../components/PsychologistInfo";
import { BsFillTelephoneFill, BsTelegram } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
const PsychologistPage = () => {
  return (
    <div className={"tw-flex tw-justify-center tw-mt-10"}>
      <div
        style={{ height: "150vh", width: "40vw" }}
        className={
          "tw-border-secondary tw-border-2 tw-flex tw-flex-col tw-items-center tw-p-5"
        }
      >
        <div className={"tw-flex tw-w-full tw-justify-start"}>
          <img
            src={"/SpecialistAvatar.svg"}
            style={{ width: "20vw" }}
            alt="Zhankeen"
          />
          <div
            className={
              "tw-flex tw-flex-col tw-justify-between tw-h-3/4 tw-ml-2"
            }
          >
            <div className={"tw-text-xl tw-font-bold"}>Arman Zhankin</div>
            <div className={"tw-font-medium tw-text-lg"}>Psychiatrist</div>
            <div className={"tw-text-secondary"}>______</div>
            <div className={"tw-font-light tw-flex tw-items-center "}>
              <BsFillTelephoneFill color={"#5877C5"} size={20} />
              <div className={"tw-text-lg tw-ml-2"}>87006641843</div>
            </div>
            <div className={"tw-font-light tw-my-1  tw-flex tw-items-center "}>
              <GrMail color={"#5877C5"} size={20} />
              <div className={"tw-text-lg tw-ml-2"}>
                arman.zhankin@gmail.com
              </div>
            </div>
            <div className={"tw-font-light tw-my-1  tw-flex tw-items-center "}>
              <BsTelegram color={"#5877C5"} size={20} />
              <div className={"tw-text-lg tw-ml-2"}>@Zhankin</div>
            </div>
          </div>
        </div>
        <div className={"tw-flex tw-flex-col"}>
          <div>About</div>
          <div className="tw-text-main">____</div>
          <div>
            Hello! My name is Arman, I am a psychologist with 5 years of
            experience. I have worked for NU counselling and focus on people
            with eating disorders.
          </div>
          <div className={"tw-flex tw-justify-between tw-my-8"}>
            <div>
              <img src="public/money.svg" className={"tw-inline"} />
              <span className={"tw-ml-2 tw-text-main tw-text-lg"}>
                100$/hour
              </span>
            </div>
            <div>
              <img src="public/star.svg" className={"tw-inline"} />
              <span className={"tw-ml-2 tw-text-main tw-text-lg tw-ml-6"}>
                4.8/5
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

export default PsychologistPage;
