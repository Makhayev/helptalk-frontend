import React, { useEffect, useState } from "react";
import BookingsCalendar from "../../components/BookingsCalendar";
import User from "../../mobx/user";
import api from "../../api/Api";

const SpecialistPagePatientView = () => {
  const [bookings, setBookings] = useState([]);
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
        {/*<PatientCard*/}
        {/*    email={patient?.email}*/}
        {/*    fullName={`${patient?.first_name} ${patient?.last_name}`}*/}
        {/*    telegramUsername={patient?.last_name}*/}
        {/*/>*/}
      </div>
      <div className={"tw-w-1/4"}>
        <BookingsCalendar bookings={bookings} id={User.id} />
      </div>
    </div>
  );
};

export default SpecialistPagePatientView;
