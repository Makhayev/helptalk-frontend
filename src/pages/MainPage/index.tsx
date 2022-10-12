import React from "react";

const MainPage = () => {
  return (
    <div className="tw-h-96 tw-bg-secondary">
      <div className="tw-text-main tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full">
        <div>
          <div className="tw-font-bold tw-text-4xl">Welcome to HelpTalk</div>
          <div>Psychological help for everyone who needs it!</div>
        </div>
        <div className="tw-flex tw-flex-row tw-bg-white tw-w-2/5 tw-items-center tw-justify-between tw-mt-16 tw-px-8 tw-rounded-xl tw-h-16">
          <div className="tw-text-dark">Share your problem with us</div>
          <div className="">Search</div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
