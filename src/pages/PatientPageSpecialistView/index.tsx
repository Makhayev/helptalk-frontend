import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PatientCard from "../../components/PatientCard";
import { Input, Spin } from "antd";
import User from "../../mobx/user";
import api from "../../api/AxiosInstance";
import BookingsNoCalendar from "../../components/BookingsNoCalendar";
import { useHistory } from "react-router-dom";
const PatientPageSpecialistView = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  if (id === ":id") {
    history.push("/");
  }
  const [bookings, setBookings] = useState([]);
  const [patient, setPatient] = useState<any>();
  const [gotBooking, setGotBooking] = useState<boolean>(false);
  const [gotPatient, setGotPatent] = useState<boolean>(false);
  useEffect(() => {
    api
      .post("/book/getbypatientid", {
        id: parseInt(id),
      })
      .then((resp) => {
        setBookings(resp.data);
        setGotBooking(true);
      });
  }, []);
  useEffect(() => {
    api
      .post("/patient/getById", {
        id: parseInt(id),
      })
      .then((resp) => {
        setPatient(resp.data);
        setGotPatent(true);
      });
  }, []);
  return (
    <div>
      {gotBooking && gotPatient ? (
        <>
          <div className={"tw-flex tw-justify-center tw-my-4"}>
            <div className={"tw-w-1/2 tw-flex tw-flex-col tw-items-center"}>
              <PatientCard
                email={patient?.email}
                fullName={`${patient?.first_name} ${patient?.last_name}`}
                telegramUsername={patient?.last_name}
                imageURL={patient?.user?.avatar}
              />
              <div className={"tw-w-3/4 tw-flex tw-flex-col tw-items-center"}>
                <div>Notes on {patient?.first_name}:</div>
                <Input.TextArea />
              </div>
            </div>
            <div className={"tw-w-1/4"}>
              <BookingsNoCalendar
                bookings={bookings}
                id={User.id}
                patient_name={`${patient?.first_name}`}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="tw-h-96 tw-flex tw-justify-center tw-items-center">
          <Spin size="large" />
        </div>
      )}{" "}
    </div>
  );
};

export default PatientPageSpecialistView;
