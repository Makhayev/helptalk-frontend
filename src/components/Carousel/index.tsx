import { Carousel } from "antd";
import React, { useRef } from "react";
import MainPageProfileCard from "../MainPageProfileCard";
import clsx from "clsx";

const isMobile = window.innerWidth < 1200;

const contentStyle: React.CSSProperties = {
  height: "400px",
  color: "#7B7B7B",
  lineHeight: "50px",
  textAlign: "center",
  background: "#FFFFFF",
  paddingTop: isMobile ? "10px" : "20px",
  width: "100%",
};

const CustomCarousel: React.FC = () => {
  const ref = useRef<any>();

  const isMobile = window.innerWidth < 1200;
  return (
    <React.Fragment>
      <div
        className={clsx(
          isMobile
            ? "tw-flex tw-justify-around"
            : "tw-flex tw-justify-around tw-min-w-[1200px]"
        )}
      >
        {!isMobile && (
          <img
            src={"/arrow-left.svg"}
            onClick={() => ref?.current?.prev()}
            className="tw-cursor-pointer tw-z-30"
          />
        )}

        <div style={contentStyle}>
          <Carousel
            dots={false}
            effect={"scrollx"}
            arrows={true}
            draggable
            ref={ref}
            style={{ width: "100%" }}
          >
            <div>
              <h3 style={contentStyle}>
                <div className="tw-flex tw-justify-around tw-h-100">
                  <MainPageProfileCard
                    logoPath={"/SpecialistAvatar.svg"}
                    fullname={"Ulanbek Kurmaniyazov"}
                    title={"Therapist"}
                  />
                  {!isMobile && (
                    <>
                      <MainPageProfileCard
                        logoPath={"/SpecialistAvatar.svg"}
                        fullname={"Ulanbek Kurmaniyazov"}
                        title={"Therapist"}
                      />
                      <MainPageProfileCard
                        logoPath={"/SpecialistAvatar.svg"}
                        fullname={"Ulanbek Kurmaniyazov"}
                        title={"Therapist"}
                      />
                    </>
                  )}
                </div>
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <div className="tw-flex tw-justify-around tw-my-100 tw-h-100 tw-mx-16">
                  <MainPageProfileCard
                    logoPath={"/SpecialistAvatar2.svg"}
                    fullname={"Aidana Akkazieva"}
                    title={"Psychiatrist"}
                  />
                  {!isMobile && (
                    <>
                      <MainPageProfileCard
                        logoPath={"/SpecialistAvatar2.svg"}
                        fullname={"Aidana Akkazieva"}
                        title={"Psychiatrist"}
                      />
                      <MainPageProfileCard
                        logoPath={"/SpecialistAvatar2.svg"}
                        fullname={"Aidana Akkazieva"}
                        title={"Psychiatrist"}
                      />
                    </>
                  )}
                </div>
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <div className="tw-flex tw-justify-around tw-my-100 tw-h-100 tw-mx-16">
                  <MainPageProfileCard
                    logoPath={"/SpecialistAvatar3.svg"}
                    fullname={"Arman Zhankin"}
                    title={"Psychologist"}
                  />
                  {!isMobile && (
                    <>
                      <MainPageProfileCard
                        logoPath={"/SpecialistAvatar3.svg"}
                        fullname={"Arman Zhankin"}
                        title={"Psychologist"}
                      />
                      <MainPageProfileCard
                        logoPath={"/SpecialistAvatar3.svg"}
                        fullname={"Arman Zhankin"}
                        title={"Psychologist"}
                      />
                    </>
                  )}
                </div>
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <div className="tw-flex tw-justify-around tw-my-100 tw-h-100 tw-mx-16">
                  <MainPageProfileCard
                    logoPath={"/SpecialistAvatar2.svg"}
                    fullname={"Aidana Akkazieva"}
                    title={"Psychiatrist"}
                  />
                  {!isMobile && (
                    <>
                      <MainPageProfileCard
                        logoPath={"/SpecialistAvatar2.svg"}
                        fullname={"Aidana Akkazieva"}
                        title={"Psychiatrist"}
                      />
                      <MainPageProfileCard
                        logoPath={"/SpecialistAvatar2.svg"}
                        fullname={"Aidana Akkazieva"}
                        title={"Psychiatrist"}
                      />
                    </>
                  )}
                </div>
              </h3>
            </div>
          </Carousel>
        </div>
        {!isMobile && (
          <img
            src={"/arrow-right.svg"}
            onClick={() => ref?.current?.next()}
            className="tw-cursor-pointer tw-z-30"
            alt="some Image"
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default CustomCarousel;
