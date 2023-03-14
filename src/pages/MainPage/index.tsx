import React, { useEffect, useState} from "react";
import { observer } from "mobx-react-lite";
import MainPageLogoItem from "../../components/MainPageLogoItem";
import CustomCarousel from "../../components/Carousel";
import { Link, useHistory } from "react-router-dom";
import searchString from "../../mobx/searchString";
import { BsArrowUpCircle, BsArrowUpCircleFill, BsHandIndexThumb } from "react-icons/bs";
import clsx from "clsx";

const handleClickScroll = () => {
  const element = document.getElementById('top');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const MainPage = observer(() => {
  const history = useHistory();
  const [search, setSearch] = useState<string>("");
  const onSearchClick = () => {
    searchString.setSearchString(search);
    history.push("/search");
  };
  const isMobile = window.innerWidth < 1200;
  useEffect(() => {
    const eventHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onSearchClick();
      }
    };
    document.addEventListener("keydown", eventHandler);
    return () => {
      document.removeEventListener("keydown", eventHandler);
    };
  }, []);

  return (
    <div className="tw-flex-auto tw-justify-center">
      <div className="tw-h-96 tw-bg-secondary">
        <div className="tw-text-main tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full">
          <div>
            <div className="tw-font-bold tw-text-4xl">Welcome to HelpTalk</div>
            <div className="tw-text-center">
              Psychological help for everyone who needs it!
            </div>
          </div>
          <div className="tw-flex tw-flex-row tw-bg-white tw-w-2/5 tw-min-w-[400px] tw-items-center tw-justify-between tw-mt-16 tw-px-8 tw-rounded-xl tw-h-16">
            <input
              className="tw-text-dark tw-w-3/4 tw-outline-0"
              placeholder={"Share your problem with us"}
              type={"text"}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <div className="tw-cursor-pointer" onClick={onSearchClick}>
              Search
            </div>
          </div>
        </div>
      </div>
      {<div id="hero-section" className="tw-flex tw-fixed tw-justify-end tw-p-10">
        <button className="tw-flex btn-scroll" onClick={handleClickScroll}>
          <BsArrowUpCircleFill className={"tw-h-20 tw-w-10 tw-text-secondary"} />
        </button>
      </div>
}
      <div className="tw-flex tw-justify-center">
        <div
          className={clsx({
            "tw-w-3/4 tw-min-w-[1200px]": !isMobile,
            "tw-w-full": isMobile,
          })}
        >
          <div className="tw-h-fit">
            <div className="tw-text-center tw-flex tw-flex-col tw-items-center">
              <div
                className={clsx("tw-font-bold tw-text-4xl tw-mt-16 tw-mb-8")}
              >
                How it works?
              </div>
              <div className={"tw-text-dark tw-text-lg tw-w-3/4"}>
                We are proud of our platform where you can instantly find an
                appropriate professional and booking its time via sharing your
                situation. You do not need to wait - just share and it’s ready!
              </div>
            </div>
            <div
              className={clsx(
                !isMobile
                  ? "tw-grid tw-grid-cols-4 tw-my-8"
                  : "tw-grid tw-grid-cols-2 tw-my-8"
              )}
            >
              <MainPageLogoItem
                logoPath={"/document.svg"}
                topText={"Register on the platform"}
                bottomText={
                  "Your profile will be anonymous for all psychologists."
                }
              />
              <MainPageLogoItem
                logoPath={"/think.svg"}
                topText={"Share the problem"}
                bottomText={
                  "Our search engine finds the most relevant professional focusing on your cases."
                }
                enableRightBar={!isMobile}
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
              Thoroughly picked experts of their field will help you overcome
              your problems with mental health
            </div>
          </div>
          <div>
            <CustomCarousel />
          </div>
          <div className="tw-text-center tw-flex tw-flex-col tw-items-center tw-mb-20">
            <div className={"tw-font-bold tw-text-4xl tw-mt-16 tw-mb-8"}>
              Work with us!
            </div>
            <div className="tw-text-center tw-flex tw-flex-row tw-items-center tw-justify-around">
              <div className="tw-w-4/5">
                <img
                  src={"/WorkWithUs.svg"}
                  className={"tw-min-w-[350px] tw-w-3/4"}
                />
              </div>
              <div className="tw-text-left tw-text-2xl tw-flex-col">
                <div className="tw-flex tw-mb-5 tw-text-lg">
                  <img className="tw-mr-5" src={"SetPrices.svg"} />
                  Set your own prices
                </div>
                <div className="tw-flex tw-mb-5 tw-text-lg">
                  <img className="tw-mr-5" src={"DecideSchedule.svg"} />
                  Decide on your schedule
                </div>
                <div className="tw-flex tw-mb-5 tw-text-lg">
                  <img className="tw-mr-5" src={"HelpPeople.svg"} />
                  Help struggling people
                </div>
                <button
                  className={
                    "tw-bg-main tw-text-white tw-rounded-2xl tw-text-xl tw-h-16 tw-w-3/5 tw-min-w-[200px]"
                  }
                >
                  <Link
                    className="tw-text-white tw-text-xl"
                    to={"/signUpSpecialist"}
                  >
                    {"Apply"}
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
});

export default MainPage;
