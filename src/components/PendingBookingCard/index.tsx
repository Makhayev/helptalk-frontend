import React, { useEffect, useState } from "react";
import { BookingCalendarCardType } from "../BookingCalendarCard";
import moment from "moment/moment";
import api from "../../api/Api";
import { Button } from "antd";
import { Link } from "react-router-dom";
import alert from "../../mobx/alert";

const PendingBookingCard = ({
  comments,
  id,
  appointed_at,
  nameId,
  end_time,
  patient_id,
}: BookingCalendarCardType) => {
  const momentAppoint = moment(appointed_at);
  const momentEnd = moment(end_time);
  const [name, setName] = useState("");
  useEffect(() => {
    api
      .post("/patient/getById", {
        id: patient_id,
      })
      .then((response) => {
        setName(`${response.data.first_name} ${response.data.last_name}`);
      });
  }, []);

  const handleApproveClick = () => {
    api
      .post("/book/approve", {
        id: id,
      })
      .then((resp) => {
        alert.openAlert(5000, "success", "Booking Approved");
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        alert.openAlert(5000, "error", "Something went wrong...");
      });
  };
  const handleDeclineClick = () => {};
  return (
    <div className={"tw-w-4/5 "}>
      <div>
        {`${momentAppoint.format("MMMM Do, YYYY")} ${momentAppoint
          .utc()
          .format("HH:mm")} - ${momentEnd.utc().format("HH:mm")}`}
      </div>
      <div className={"tw-border-2 tw-border-secondary tw-text-center"}>
        <div className={"tw-text-lg tw-my-2 tw-underline"}>
          <Link to={`/patient/${patient_id}`}> {name} </Link>
        </div>
        <div className={"tw-my-2"}>{comments}</div>
        <div className={"tw-my-2 tw-flex tw-justify-evenly"}>
          <Button onClick={handleApproveClick}>Approve</Button>
          <Button onClick={handleDeclineClick}>Decline</Button>
        </div>
      </div>
    </div>
  );
};

export default PendingBookingCard;
