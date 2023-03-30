import React from "react";
import MainPageProfileCard from "../../components/MainPageProfileCard";

const AboutUs = () => {
  return (
    <React.Fragment>
      <div className="tw-flex tw-justify-around">
        <div className="tw-w-5/6">
          <div className="tw-flex tw-justify-around tw-h-[15rem]">
            <div className="tw-flex tw-bg-peach tw-w-1/2 tw-rounded-br-lg tw-items-center tw-justify-center">
              <div className="tw-w-1/2 tw-text-xs md:tw-text-xl tw-text-white">
                Welcome to Helptalk, a platform where you can easily find a
                psychological help in couple of steps.
              </div>
            </div>
            <div className="tw-flex tw-bg-secondary tw-w-1/2 tw-rounded-bl-lg tw-items-center tw-justify-center"></div>
          </div>
          <div className="tw-flex tw-justify-around tw-h-[30rem] sm:tw-h-[25rem]">
            <div className="tw-flex tw-bg-pink tw-w-1/4 tw-rounded-r-lg tw-items-center tw-justify-center">
              <div className="tw--rotate-90 tw-text-4xl tw-font-bold">
                About us
              </div>
            </div>
            <div className="tw-flex tw-bg-white tw-text-xs lg:tw-text-base tw-w-1/2 tw-items-center tw-justify-center">
              <div className="tw-w-3/4 tw-font-bold ">
                Sometimes, search for a psychologist may appear as a real
                challenge. Such factors as psychologst experience, area of
                focus, and personal preferences definitely play a crucial role
                to become a long-term solution for mental health support among
                all of us. Taking into account this problem, our team created
                this platform. It's enought to prompt your problem into our
                search bar, and the most relevant specialist will be found and
                easily booked for your first free session!
              </div>
            </div>
            <div className="tw-flex tw-bg-darkpeach tw-w-1/4 tw-rounded-l-lg tw-justify-center tw-items-center ">
              <div></div>
            </div>
          </div>
          <div className="tw-flex tw-justify-around tw-h-[15rem]">
            <div className="tw-flex tw-bg-secondary tw-w-1/2 tw-rounded-tr-lg tw-items-center tw-justify-center"></div>
            <div className="tw-flex tw-bg-purple tw-w-1/2 tw-rounded-tl-lg tw-items-center tw-justify-center">
              <div className="tw-w-3/4 tw-font-bold tw-text-white">
                Our mission is to create a substantial mental health support for
                all generations breaking social stereotypes and taboos. We
                believe that making an access to help easier, we increase the
                number of people asking for help in case of such circumstances.
              </div>
            </div>
          </div>
          <div className="tw-w-full tw-h-16"></div>
          <div className="tw-flex tw-justify-around" id="team">
            <div className="tw-text-3xl tw-font-bold tw-italic lg:tw-text-4xl">
              Meet our team
            </div>
          </div>
          <div className="tw-flex tw-justify-around">
            <div className="tw-flex tw-justify-around tw-flex-col tw-items-center tw-py-4">
              <div className="tw-flex tw-flex-wrap tw-justify-center tw-w-full">
                <div className="tw-w-full md:tw-w-1/2 lg:tw-w-1/3 tw-p-2">
                  <MainPageProfileCard
                    logoPath={"/SpecialistAvatar2.svg"}
                    fullname={"Yerkanat Makhayev"}
                    title={""}
                  />
                </div>
                <div className="tw-w-full md:tw-w-1/2 lg:tw-w-1/3 tw-p-2">
                  <MainPageProfileCard
                    logoPath={"/SpecialistAvatar2.svg"}
                    fullname={"Aidana Imangozhina"}
                    title={""}
                  />
                </div>
                <div className="tw-w-full md:tw-w-1/2 lg:tw-w-1/3 tw-p-2">
                  <MainPageProfileCard
                    logoPath={"/SpecialistAvatar2.svg"}
                    fullname={"Abay Kappassov"}
                    title={""}
                  />
                </div>
                <div className="tw-w-full md:tw-w-1/2 lg:tw-w-1/3 tw-p-2">
                  <MainPageProfileCard
                    logoPath={"/SpecialistAvatar2.svg"}
                    fullname={"Magzhan Esentaev"}
                    title={""}
                  />
                </div>
                <div className="tw-w-full md:tw-w-1/2 lg:tw-w-1/3 tw-p-2">
                  <MainPageProfileCard
                    logoPath={"/SpecialistAvatar2.svg"}
                    fullname={"Dilnaz Amanzholova"}
                    title={""}
                  />
                </div>
              </div>
              <div className="tw-flex-grow"></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AboutUs;
