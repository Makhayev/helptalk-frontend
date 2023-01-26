import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "antd";
import api from "../../api/AxiosInstance";
import User from "../../mobx/user";
import alert from "../../mobx/alert";
import { Link } from "react-router-dom";

export interface BookingCalendarCardType {
  comments: string;
  id: number;
  appointed_at: string;
  nameId: number;
  end_time: string;
  specialist_id?: number | string;
  approved: boolean;
  patient_id?: number | string;
}

const BookingCalendarCard = ({
  comments,
  id,
  appointed_at,
  nameId,
  end_time,
  patient_id,
  specialist_id,
  approved,
}: BookingCalendarCardType) => {
  const momentAppoint = moment(appointed_at);
  const momentEnd = moment(end_time);
  const [name, setName] = useState("");

  const handleBookingDelete = () => {
    api
      .post("/book/delete", {
        id,
      })
      .then((res) => {
        alert.openAlert(4000, "success", "Deleted Successfully, reloading...");
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      });
  };
  useEffect(() => {
    if (User.role === "patient") {
      api
        .post("/specialist/getById", {
          specialist_id: nameId,
        })
        .then((response) => {
          setName(`${response.data.first_name} ${response.data.last_name}`);
        });
    } else {
      api
        .post("/patient/getById", {
          id: nameId,
        })
        .then((response) => {
          setName(`${response.data.first_name} ${response.data.last_name}`);
        });
    }
  }, []);

  return (
    <div
      className={
        "tw-my-2 tw-flex-col tw-flex tw-items-center tw-justify-between"
      }
    >
      <div className={"tw-text-lg"}>
        {momentAppoint.utc().format("MMMM Do, YYYY")}
      </div>
      <div>
        {momentAppoint.utc().format("HH:mm")} -{" "}
        {momentEnd.utc().format("HH:mm")}
      </div>
      <div
        className={
          "tw-border-secondary tw-border-2 tw-w-4/5 tw-flex-col tw-flex tw-justify-between tw-items-center"
        }
      >
        <div className={"tw-text-lg tw-my-2 tw-underline"}>
          <Link
            to={`/${
              User.role === "patient"
                ? "specialist"
                : User.role === "specialist"
                ? "patient"
                : ""
            }/${nameId}`}
          >
            {name}
          </Link>
        </div>
        <div className={"tw-my-4"}>{comments}</div>
        {approved ? (
          <div className={"tw-text-main"}>Approved</div>
        ) : (
          <div className={"tw-text-dark"}> Not approved</div>
        )}
        <div></div>
        <div className={"tw-my-4"}>
          <Button onClick={handleBookingDelete}>Delete </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendarCard;
