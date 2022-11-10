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
};

const CustomCarousel: React.FC = () => {
  const ref = useRef<any>();

  const onChange = (currentSlide: number) => {
    console.log("onchange" + currentSlide);
    console.log(ref?.current);
  };

  return (
    <React.Fragment>
      <div style={contentStyle}>
        <button
          onClick={() => ref?.current?.prev()}
          className={"tw-h-20 tw-w-20 tw-bg-main tw-mr-2"}
        />
        <button
          onClick={() => ref?.current?.next()}
          className={"tw-h-20 tw-w-20 tw-bg-main tw-mr-2"}
        />
        <Carousel
          afterChange={onChange}
          dots={true}
          effect={"scrollx"}
          arrows={true}
          draggable
          ref={ref}
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></div>
    </React.Fragment>
  );
};

export default CustomCarousel;
