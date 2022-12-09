import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/Api";
import User from "../../mobx/user";
import BookingsCalendar from "../../components/BookingsCalendar";
import PsychologistCard from "../../components/PsychologistCard";

const SpecialistProfile = () => {
  const [bookings, setBookings] = useState([]);
  console.log(User.id);
  useEffect(() => {
    api
      .post("/book/getbyspecialistid", {
        id: User.id,
      })
      .then((resp) => {
        console.log(resp.data);
        setBookings(resp.data);
      });
  }, []);
  return (
    <div className={"tw-flex tw-justify-center tw-my-4"}>
      <div className={"tw-w-1/2"}>
        <PsychologistCard isProfile={true} />
      </div>
      <div className={"tw-w-1/4"}>
        <BookingsCalendar bookings={bookings} id={User.id} />
      </div>
    </div>
  );
};

export default SpecialistProfile;
