import React, { useEffect, useState } from "react";
import User from "../../mobx/user";
import api from "../../api/Api";
import BookingsCalendar from "../../components/BookingsCalendar";
import PsychologistCard from "../../components/PsychologistCard";
import PatientCard from "../../components/PatientCard";

const PatientProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [patient, setPatient] = useState<any>();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    api
      .post("/book/getbypatientid", {
        id: User.id,
      })
      .then((resp) => {
        console.log(resp.data);
        setBookings(resp.data);
      });
  }, []);
  useEffect(() => {
    api
      .post("/patient/getById", {
        id: User.id,
      })
      .then((resp) => {
        console.log(resp.data, "getById");
        setPatient(resp.data);
      });
  }, []);
  return (
    <div>
      <div className={"tw-flex tw-justify-center tw-my-4"}>
        <div className={"tw-w-1/2"}>
          <PatientCard
            email={patient?.email}
            fullName={`${patient?.first_name} ${patient?.last_name}`}
            telegramUsername={patient?.last_name}
          />
        </div>
        <div className={"tw-w-1/4"}>
          <BookingsCalendar bookings={bookings} id={User.id} />
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
