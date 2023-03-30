import React from "react";
import BookingCalendarCard from "../BookingCalendarCard";
import User from "../../store/user";
import { BookingsNoCalendarPropsType } from "../../interfaces";

const BookingsCalendar = ({
  bookings,
  patient_name,
}: BookingsNoCalendarPropsType) => {
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.specialist_id === parseInt(User.id) ||
      booking.patient_id === parseInt(User.id)
  );

  return (
    <div
      className={"tw-w-full tw-border-secondary tw-border-2"}
      style={{
        height: "100vh",
      }}
    >
      <div className={"tw-flex-col tw-flex tw-justify-start"}>
        <div className={"tw-flex tw-justify-center tw-text-lg tw-my-4"}>
          Bookings with {patient_name}
        </div>
        {filteredBookings?.length > 0 ? (
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
          ))
        ) : (
          <div> Empty...</div>
        )}
      </div>
    </div>
  );
};

export default BookingsCalendar;
