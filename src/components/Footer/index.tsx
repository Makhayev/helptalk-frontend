import React from "react";
import { BsInstagram, BsFacebook, BsTelegram } from "react-icons/bs";
import { Link } from "react-router-dom";

const handleClickScroll = () => {
  const element = document.getElementById("team");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const handleClickScroll2 = () => {
  const element = document.getElementById("top");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Footer = () => {
  return (
    <div
      className={
        "tw-bg-main tw-w-full tw-h-96 tw-flex tw-flex-col tw-justify-center tw-items-center"
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
          <div>
            HelpTalk is a service that helps you find and an appropriate
            psychological help or to find people that you could help.
          </div>
          <div>Business Hour</div>
          <div>Monday-Friday</div>
        </div>
        <div
          className={"tw-flex  tw-flex-col tw-w-64 tw-h-full tw-justify-around"}
        >
          <div className={"tw-mt-20 tw-font-extrabold tw-text-2xl"}>
            Important Links
          </div>

          <div className="tw-flex tw-flex-col tw-w-64 tw-h-1/2 tw-justify-around">
            <div>
              <a
                href="https://drive.google.com/file/d/1iyXk_cQCYWkgNg2lVsd2FdzXuEj35eHs/view?usp=share_link"
                className="tw-text-white"
              >
                Terms and Conditions
              </a>
            </div>
            <div>
              <Link
                to={"/aboutUs"}
                className="tw-text-white"
                onClick={handleClickScroll2}
              >
                {"Our services"}
              </Link>
            </div>
            <div>
              <Link
                to={"/aboutUs"}
                className="tw-text-white"
                onClick={handleClickScroll}
              >
                {"Meet our team"}
              </Link>
            </div>
            <div>
              <a href="https://t.me/helptalk_support" className="tw-text-white">
                Help desk
              </a>
            </div>
          </div>
        </div>
        <div className={"tw-flex tw-flex-col tw-w-80"}>
          <div className={"tw-text-2xl tw-mt-24 tw-font-bold tw-mb-4"}>
            Follow us on social media
          </div>
          <div className={"tw-flex tw-justify-between"}>
            <div>
              <a
                href="https://www.instagram.com/helptalk_support/"
                className="tw-text-white"
              >
                <BsInstagram className={"tw-h-20 tw-w-20"} />
              </a>
            </div>
            <div>
              <a
                href="https://www.facebook.com/profile.php?id=100090112790695"
                className="tw-text-white"
              >
                <BsFacebook className={"tw-h-20 tw-w-20"} />
              </a>
            </div>
            <div>
              <a href="https://t.me/helptalk_support" className="tw-text-white">
                <BsTelegram className={"tw-h-20 tw-w-20"} />
              </a>
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
