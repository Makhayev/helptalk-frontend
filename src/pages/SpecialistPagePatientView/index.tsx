import React, { useEffect, useState } from "react";
import BookingsCalendar from "../../components/BookingsCalendar";
import User from "../../mobx/user";
import api from "../../api/AxiosInstance";
import { useHistory, useParams } from "react-router-dom";
import BookingsNoCalendar from "../../components/BookingsNoCalendar";
import PsychologistCard from "../../components/PsychologistCard";
import { Spin } from "antd";

const SpecialistPagePatientView = () => {
  const [bookings, setBookings] = useState([]);
  const [specialist, setSpecialist] = useState<any>();
  const [gotBooking, setGotBooking] = useState<boolean>(false);
  const [gotPatient, setGotPatent] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  if (id === ":id") {
    history.push("/");
  }
  useEffect(() => {
    api
      .post("/book/getbyspecialistid", {
        id: parseInt(id),
      })
      .then((resp) => {
        setBookings(resp.data);
        setGotBooking(true);
      });
  }, []);
  useEffect(() => {
    api
      .post("/specialist/getById", {
        specialist_id: parseInt(id),
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
              price={specialist?.price}
              email={specialist?.email}
              bookings={bookings}
              fullName={`${specialist?.first_name} ${specialist?.last_name}`}
              description={specialist?.description}
              id={parseInt(id)}
            />
          </div>
          <div className={"tw-w-1/4"}>
            <BookingsNoCalendar
              bookings={bookings}
              id={User.id}
              patient_name={specialist?.first_name}
            />
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

export default SpecialistPagePatientView;
