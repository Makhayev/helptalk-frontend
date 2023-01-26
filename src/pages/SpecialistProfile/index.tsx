import React, { useEffect, useState } from "react";
import api from "../../api/AxiosInstance";
import User from "../../mobx/user";
import BookingsCalendar from "../../components/BookingsCalendar";
import PsychologistCard from "../../components/PsychologistCard";

const SpecialistProfile = () => {
  const [bookings, setBookings] = useState<any>([]);
  const [specialist, setSpecialist] = useState<any>();
  useEffect(() => {
    api
      .post("/book/getbyspecialistid", {
        id: User.id,
      })
      .then((resp) => {
        setBookings(resp.data);
      });
  }, []);
  useEffect(() => {
    api
      .post("/specialist/getById", {
        specialist_id: User.id,
      })
      .then((resp) => {
        setSpecialist(resp.data);
      });
  }, []);
  return (
    <div className={"tw-flex tw-justify-center tw-my-4"}>
      <div className={"tw-w-1/2"}>
        <PsychologistCard
          number={specialist?.user?.phone}
          telegramUsername={specialist?.user?.socialmedia_account}
          price={String(specialist?.price)}
          fullName={`${specialist?.first_name} ${specialist?.last_name}`}
          bookings={bookings}
          description={specialist?.description}
          isProfile={true}
          email={specialist?.email}
          id={parseInt(User.id)}
        />
      </div>
      <div className={"tw-w-1/4"}>
        <BookingsCalendar bookings={bookings} id={User.id} />
      </div>
    </div>
  );
};

export default SpecialistProfile;
