import React, { useEffect, useState } from "react";
import api from "../../api";
import User from "../../store/user";
import BookingsCalendar from "../../components/BookingsCalendar";
import PsychologistCard from "../../components/PsychologistCard";
import { Spin } from "antd";

const SpecialistProfile = () => {
  const [bookings, setBookings] = useState<any>([]);
  const [specialist, setSpecialist] = useState<any>();
  const [gotBooking, setGotBooking] = useState<boolean>(false);
  const [gotPatient, setGotPatent] = useState<boolean>(false);
  useEffect(() => {
    api
      .post("/book/getbyspecialistid", {
        id: User.id,
      })
      .then((resp) => {
        setBookings(resp.data);
        setGotBooking(true);
      });
  }, []);
  useEffect(() => {
    api
      .post("/specialist/getById", {
        specialist_id: User.id,
      })
      .then((resp) => {
        setSpecialist(resp.data);
        setGotPatent(true);
      });
  }, []);
  return (
    <div className={"tw-flex tw-justify-center tw-my-4"}>
      {gotBooking && gotPatient ? (
        <>
          <div className={"tw-w-1/2"}>
            <PsychologistCard
              number={specialist?.user?.phone}
              telegramUsername={specialist?.user?.socialmedia_account}
              price={String(specialist?.price)}
              fullName={`${specialist?.first_name} ${specialist?.last_name}`}
              bookings={bookings}
              balance={specialist?.balance}
              description={specialist?.description}
              isProfile={true}
              email={specialist?.email}
              id={parseInt(User.id)}
              imageURL={specialist?.user?.avatar}
            />
          </div>
          <div className={"tw-w-1/4"}>
            <BookingsCalendar bookings={bookings} id={User.id} />
          </div>
        </>
      ) : (
        <div className="tw-h-96 tw-flex tw-justify-center tw-items-center">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default SpecialistProfile;
