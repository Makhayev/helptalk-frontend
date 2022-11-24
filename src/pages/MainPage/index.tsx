import React from "react";
import { observer } from "mobx-react-lite";
import MainPageLogoItem from "../../components/MainPageLogoItem";
import CustomCarousel from "../../components/Carousel";
import { Link } from "react-router-dom";

const MainPage = observer(() => {
  return (
    <div>
      <div className="tw-h-96 tw-bg-secondary">
        <div className="tw-text-main tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full">
          <div>
            <div className="tw-font-bold tw-text-4xl">Welcome to HelpTalk</div>
            <div>Psychological help for everyone who needs it!</div>
          </div>
          <div className="tw-flex tw-flex-row tw-bg-white tw-w-2/5 tw-items-center tw-justify-between tw-mt-16 tw-px-8 tw-rounded-xl tw-h-16">
            <input
              className="tw-text-dark tw-w-3/4 tw-outline-0"
              placeholder={"Share your problem with us"}
              type={"text"}
            />
            <div className="">Search</div>
          </div>
        </div>
      </div>
      <div className="tw-h-80 tw-mb-32">
        <div className="tw-text-center tw-flex tw-flex-col tw-items-center">
          <div className={"tw-font-bold tw-text-4xl tw-mt-16 tw-mb-8"}>
            How it works?
          </div>
          <div className={"tw-text-dark tw-text-lg tw-w-3/4"}>
            We are proud of our platform where you can instantly find an
            appropriate professional and booking its time via sharing your
            situation. You do not need to wait - just share and it’s ready!
          </div>
        </div>
        <div className="tw-flex tw-justify-around tw-my-10 tw-h-40 tw-mx-16">
          <MainPageLogoItem
            logoPath={"/document.svg"}
            topText={"Register on the platform"}
            bottomText={"Your profile will be anonymous for all psychologists."}
          />
          <MainPageLogoItem
            logoPath={"/think.svg"}
            topText={"Share the problem"}
            bottomText={
              "Our search engine finds the most relevant professional focusing on your cases."
            }
          />
          <MainPageLogoItem
            logoPath={"/personAdd.svg"}
            topText={"Choose the professional"}
            bottomText={
              "You can book their free slots according your time schedule!"
            }
          />
          <MainPageLogoItem
            logoPath={"/usersChat.svg"}
            topText={"Attend your free session"}
            bottomText={
              "We know it is hard to find the one professional you can trust."
            }
            enableRightBar={false}
          />
        </div>
      </div>
      <div className="tw-text-center tw-flex tw-flex-col tw-items-center">
        <div className={"tw-font-bold tw-text-4xl tw-mt-16 tw-mb-8"}>
          Meet our specialists
        </div>
        <div className={"tw-text-dark tw-text-lg tw-w-3/4"}>
          Thoroughly picked experts of their field will help you overcome your
          problems with mental health
        </div>
      </div>
      <div>
        <CustomCarousel />
      </div>
      <div className="tw-text-center tw-flex tw-flex-col tw-items-center tw-mb-20">
        <div className={"tw-font-bold tw-text-4xl tw-mt-16 tw-mb-8"}>
          Work with us!
        </div>
        <div className="tw-text-center tw-flex tw-flex-row tw-items-center tw-w-full tw-justify-around">
          <img src={"/WorkWithUs.svg"} />
          <div className="tw-text-left tw-text-2xl tw-flex-col">
            <div className="tw-flex tw-mb-5">
              <img className="tw-mr-5" src={"SetPrices.svg"} />
              Set your own prices
            </div>
            <div className="tw-flex tw-mb-5">
              <img className="tw-mr-5" src={"DecideSchedule.svg"} />
              Decide on your schedule
            </div>
            <div className="tw-flex tw-mb-5">
              <img className="tw-mr-5" src={"HelpPeople.svg"} />
              Help struggling people
            </div>
            <button
              className={
                "tw-bg-main tw-text-white tw-rounded-2xl tw-text-xl tw-h-16 tw-w-2/5"
              }
            >
              <Link className="tw-text-white tw-text-xl" to={"/aboutUs"}>
                {"Apply"}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MainPage;
