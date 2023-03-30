import React, { useState } from "react";
import { Calendar } from "antd";
import moment from "moment";
import BookingCalendarCard from "../BookingCalendarCard";
import User from "../../store/user";
import { BookingsCalendarPropsType } from "../../interfaces";

const BookingsCalendar = ({ bookings, id }: BookingsCalendarPropsType) => {
  const appointmentDates = bookings
    .filter((booking) => booking.approved)
    .map((booking) => booking.appointed_at?.split("T")?.[0]);
  const unapprovedAppointmentDates = bookings
    .filter((booking) => !booking.approved)
    .map((booking) => booking.appointed_at?.split("T")?.[0]);

  const [selectedDate, setSelectedDate] = useState(moment());
  const filteredBookings = bookings
    .filter((booking) => booking.approved)
    .filter((booking) => {
      return (
        booking.appointed_at.split("T")?.[0] ===
        selectedDate.toDate().toISOString().split("T")?.[0]
      );
    });
  const unapprovedBookings = bookings
    .filter((booking) => !booking.approved)
    .filter((booking) => {
      return (
        booking.appointed_at.split("T")?.[0] ===
        selectedDate.toDate().toISOString().split("T")?.[0]
      );
    });
  return (
    <div
      className={"tw-w-full tw-border-secondary tw-border-2"}
      style={{
        height: "100vh",
      }}
    >
      <div className={"tw-flex-col tw-flex tw-justify-start"}>
        <div className={"tw-flex tw-justify-center tw-text-lg tw-my-4"}>
          My Bookings
        </div>
        <Calendar
          fullscreen={false}
          style={{
            width: "90%",
            border: "solid #D4E0FF 1px",
            marginLeft: "5%",
          }}
          onChange={(val) => {
            setSelectedDate(val);
          }}
          dateFullCellRender={(date) => {
            const currDate = date.toDate().toISOString().split("T")?.[0];
            const selDate = selectedDate.toDate().toISOString().split("T")?.[0];
            if (appointmentDates.includes(currDate)) {
              if (currDate === selDate) {
                return (
                  <div
                    style={{
                      background: "#5877C5",
                      color: "white",
                      borderRadius: "10px",
                    }}
                  >
                    {date.toDate().getDate()}
                  </div>
                );
              } else {
                return (
                  <div
                    style={{
                      background: "#D4E0FF",
                      color: "black",
                      borderRadius: "10px",
                    }}
                  >
                    {date.toDate().getDate()}
                  </div>
                );
              }
            } else if (unapprovedAppointmentDates.includes(currDate)) {
              if (currDate === selDate) {
                return (
                  <div
                    style={{
                      background: "#5877C5",
                      color: "white",
                      borderRadius: "10px",
                    }}
                  >
                    {date.toDate().getDate()}
                  </div>
                );
              } else {
                return (
                  <div
                    style={{
                      background: "#7B7B7B",
                      color: "white",
                      borderRadius: "10px",
                    }}
                  >
                    {date.toDate().getDate()}
                  </div>
                );
              }
            } else {
              if (currDate === selDate) {
                return (
                  <div className={"tw-border-main tw-border-2"}>
                    {date.toDate().getDate()}
                  </div>
                );
              } else {
                return <span> {date.toDate().getDate()}</span>;
              }
            }
          }}
        />
        {filteredBookings?.length > 0 &&
          filteredBookings.map((booking) => (
            <BookingCalendarCard
              nameId={
                User.role === "patient"
                  ? booking.specialist_id
                  : booking.patient_id
              }
              approved={booking.approved}
              comments={booking.comments}
              id={booking.id}
              appointed_at={booking.appointed_at}
              end_time={booking.end_time}
              specialist_id={booking.specialist_id}
              patient_id={booking.patient_id}
              room_id={booking.room_id}
            />
          ))}
        {unapprovedBookings?.length > 0 &&
          unapprovedBookings.map((booking) => (
            <BookingCalendarCard
              nameId={
                User.role === "patient"
                  ? booking.specialist_id
                  : booking.patient_id
              }
              approved={booking.approved}
              comments={booking.comments}
              id={booking.id}
              appointed_at={booking.appointed_at}
              end_time={booking.end_time}
              specialist_id={booking.specialist_id}
              patient_id={booking.patient_id}
              room_id={booking.room_id}
            />
          ))}
      </div>
    </div>
  );
};

export default BookingsCalendar;
