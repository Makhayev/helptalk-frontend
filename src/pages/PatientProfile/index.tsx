import React, { useEffect, useState } from "react";
import User from "../../mobx/user";
import api from "../../api/AxiosInstance";
import BookingsCalendar from "../../components/BookingsCalendar";
import PatientCard from "../../components/PatientCard";
import { Spin } from "antd";

const PatientProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [patient, setPatient] = useState<any>();
  const [gotBooking, setGotBooking] = useState<boolean>(false);
  const [gotPatient, setGotPatent] = useState<boolean>(false);

  useEffect(() => {
    api
      .post("/book/getbypatientid", {
        id: User.id,
      })
      .then((resp) => {
        setBookings(resp.data);
        setGotBooking(true);
      });
  }, []);
  useEffect(() => {
    api
      .post("/patient/getById", {
        id: User.id,
      })
      .then((resp) => {
        setPatient(resp.data);
        setGotPatent(true);
      });
  }, []);

  return (
    <div>
      {gotBooking && gotPatient ? (
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
      ) : (
        <div className="tw-h-96 tw-flex tw-justify-center tw-items-center">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
