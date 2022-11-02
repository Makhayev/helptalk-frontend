import React from "react";
import { BsInstagram, BsFacebook, BsTelegram } from "react-icons/bs";

const Footer = () => {
  return (
    <div
      className={
        "tw-bg-main tw-h-96 tw-flex tw-flex-col tw-justify-center tw-items-center"
      }
    >
      <div
        className={
          "tw-flex tw-justify-around tw-w-full tw-h-full tw-text-white"
        }
      >
        <div
          className={"tw-flex tw-flex-col tw-justify-around tw-h-full tw-w-64"}
        >
          <div className={"tw-mt-5"}>
            <img src="/LogoInverted.svg" />
          </div>
          <div>LOREM IPSUM LOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUM</div>
          <div>Business Hour</div>
          <div>Monday-Friday</div>
        </div>
        <div
          className={"tw-flex tw-flex-col tw-w-64 tw-h-full tw-justify-around"}
        >
          <div className={"tw-mt-20 tw-font-extrabold tw-text-2xl"}>
            Important Links
          </div>
          <div>Our services</div>
          <div>Privacy</div>
          <div>Contacts</div>
          <div>Meet our team</div>
          <div className={"tw-mb-8"}>Help desk</div>
        </div>
        <div className={"tw-flex tw-flex-col tw-w-80"}>
          <div className={"tw-text-2xl tw-mt-24 tw-font-bold tw-mb-4"}>
            Follow us on social media
          </div>
          <div className={"tw-flex tw-justify-between"}>
            <div>
              <BsInstagram className={"tw-h-20 tw-w-20"} />
            </div>
            <div>
              <BsFacebook className={"tw-h-20 tw-w-20"} />
            </div>
            <div>
              <BsTelegram className={"tw-h-20 tw-w-20"} />
            </div>
          </div>
        </div>
      </div>
      <hr
        className={
          "tw-border-b-dark tw-border-dark tw-w-3/4 tw-h-1 tw-border-opacity-90"
        }
      />
      <div className={"tw-text-white tw-mb-4"}>
        All rights reserved by HelpTalk 2022
      </div>
    </div>
  );
};

export default Footer;
