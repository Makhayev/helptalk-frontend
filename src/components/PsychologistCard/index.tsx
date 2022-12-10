import React from "react";
import PsychologistInfo from "../../components/PsychologistInfo";
import { BsFillTelephoneFill, BsTelegram } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import PendingBookingCard from "../PendingBookingCard";
import User from "../../mobx/user";
import PsychologistModal from "../PsychologistModal";

interface psychologistPageProps {
  imageURL?: string;
  imageAlt?: string;
  fullName?: string;
  title?: string;
  number?: string;
  email?: string;
  telegramUsername?: string;
  description?: string;
  price?: string;
  rating?: string;
  isProfile?: boolean;
  bookings?: any[];
  id: number;
}

const PsychologistCard = ({
  imageURL = "/defaultPsychologistImage.png",
  imageAlt = "zhankin",
  fullName = "Arman Zhankin",
  title = "psychiatrist",
  number = "87006641743",
  email = "arman.zhankin@gmail.com",
  telegramUsername = "@Zhankin",
  description = "Hello! My name is Arman, I am a psychologist with 5 years of experience. I have worked for NU counselling and focus on people with eating disorders.",
  price = "100$",
  rating = "4.8",
  isProfile = false,
  bookings = [],
  id,
}: psychologistPageProps) => {
  const filteredBookings = bookings?.filter((booking) => !booking?.approved);
  return (
    <div className={"tw-flex tw-justify-center"}>
      <div
        style={{ height: "150vh", width: "40vw" }}
        className={
          "tw-border-secondary tw-border-2 tw-flex tw-flex-col tw-items-center tw-p-5"
        }
      >
        <div className={"tw-flex tw-w-full tw-justify-start"}>
          <img src={imageURL} style={{ width: "20vw" }} alt={imageAlt} />
          <div
            className={
              "tw-flex tw-flex-col tw-justify-between tw-h-3/4 tw-ml-2"
            }
          >
            <div className={"tw-text-xl tw-font-bold"}>{fullName}</div>
            <div className={"tw-font-medium tw-text-lg"}>{title}</div>
            <div className={"tw-text-secondary"}>___________</div>
            <div className={"tw-font-light tw-flex tw-items-center "}>
              <BsFillTelephoneFill color={"#5877C5"} size={20} />
              <div className={"tw-text-lg tw-ml-2"}>{number}</div>
            </div>
            <div className={"tw-font-light tw-my-1  tw-flex tw-items-center "}>
              <GrMail color={"#5877C5"} size={20} />
              <div className={"tw-text-lg tw-ml-2"}>{email}</div>
            </div>
            <div className={"tw-font-light tw-my-1  tw-flex tw-items-center "}>
              <BsTelegram color={"#5877C5"} size={20} />
              <div className={"tw-text-lg tw-ml-2"}>{telegramUsername}</div>
            </div>
          </div>
        </div>
        <div className={"tw-flex tw-flex-col tw-w-full tw-px-4"}>
          <div className={"tw-text-lg tw-font-bold tw-mt-4"}>About</div>
          <div className="tw-text-main">________</div>
          <div>{description}</div>
          <div className={"tw-flex tw-justify-between tw-my-8"}>
            <div>
              <img alt="money" src="/money.svg" className={"tw-inline"} />
              <span className={"tw-ml-2 tw-text-main tw-text-lg"}>
                {price}/hour
              </span>
            </div>
            <div>
              <img alt={"stars"} src="/star.svg" className={"tw-inline"} />
              <span className={"tw-ml-2 tw-text-main tw-text-lg tw-ml-6"}>
                {rating}/5
              </span>
            </div>
          </div>
        </div>
        {!isProfile && (
          <PsychologistModal psychologistName={fullName} psychologistID={id} />
        )}
        {isProfile && (
          <>
            <div className={"tw-font-bold tw-text-lg"}> Pending bookings</div>
            {filteredBookings.length > 0 ? (
              filteredBookings?.map((booking) => (
                <PendingBookingCard
                  appointed_at={booking.appointed_at}
                  end_time={booking.end_time}
                  nameId={
                    User.role === "patient"
                      ? booking.specialist_id
                      : booking.patient_id
                  }
                  id={booking.id}
                  patient_id={booking.patient_id}
                  specialist_id={booking.specialist_id}
                  comments={booking.comments}
                />
              ))
            ) : (
              <div>Empty...</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PsychologistCard;
