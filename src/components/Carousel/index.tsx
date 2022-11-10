import { Carousel } from "antd";
import React, { useRef } from "react";
import MainPageProfileCard from "../MainPageProfileCard";

const contentStyle: React.CSSProperties = {
  height: "350px",
  color: "#7B7B7B",
  lineHeight: "50px",
  textAlign: "center",
  background: "#FFFFFF",
  padding: "30px",
  width: "90%",
  marginLeft: "40px",
  marginBottom: "100px",
};

const CustomCarousel: React.FC = () => {
  const ref = useRef<any>();

  const onChange = (currentSlide: number) => {
    console.log("onchange" + currentSlide);
    console.log(ref?.current);
  };

  return (
    <React.Fragment>
      <div className="tw-flex tw-justify-around">
        <img
          src={"/arrow-left.svg"}
          onClick={() => ref?.current?.prev()}
          className="tw-cursor-pointer tw-z-30"
        />
        <div style={contentStyle}>
          <Carousel
            afterChange={onChange}
            dots={false}
            effect={"scrollx"}
            arrows={true}
            draggable
            ref={ref}
            style={{ width: "100%" }}
          >
            <div>
              <h3 style={contentStyle}>
                <div className="tw-flex tw-justify-around tw-my-100 tw-h-100 tw-mx-16">
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
                  <MainPageProfileCard
                    logoPath={"/SpecialistAvatar.svg"}
                    fullname={"Ulanbek Kurmaniyazov"}
                    title={"Therapist"}
                  />
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
                </div>
              </h3>
            </div>
          </Carousel>
        </div>
        <img
          src={"/arrow-right.svg"}
          onClick={() => ref?.current?.next()}
          className="tw-cursor-pointer tw-z-30"
        />
      </div>
    </React.Fragment>
  );
};

export default CustomCarousel;
