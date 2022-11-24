import React, { useState } from "react";
import CustomInput from "../CustomInput";
import { Calendar, Input } from "antd";
import moment, { Moment } from "moment";
import CustomDropdown from "../CustomDropdown";
import { FieldTimeOutlined } from "@ant-design/icons";

interface psychologistModalPropsType {
  psychologistName: string;
  psychologistID: number;
  className?: string;
}
const mockTimeslots = [
  "13:00-14:00",
  "15:00-16:00",
  "17:00-18:00",
  "18:00-19:00",
  "19:00-20:00",
  "20:00-21:00",
];
const PsychologistModal = ({
  psychologistName,
  psychologistID,
  className,
}: psychologistModalPropsType) => {
  const [date, setDate] = useState<Moment>();
  const [timeSlot, setTimeSlot] = useState<string>("timeslots");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>();
  const [message, setMessage] = useState<string>();
  return (
    <div className={className}>
      <div
        style={{
          width: "500px",
          height: "600px",
        }}
        className="tw-bg-white tw-flex tw-flex-col tw-border-secondary tw-border-2 tw-rounded tw-justify-between tw-px-8 tw-py-8"
      >
        <div className={"tw-font-bold tw-text-lg"}>
          Contact With {psychologistName}
        </div>
        <div className="tw-flex tw-justify-between">
          {showCalendar && (
            <Calendar
              fullscreen={false}
              className={"tw-absolute tw-h-40 tw-w-96 tw-mt-4 tw-z-50"}
              value={date}
              onSelect={(date) => {
                setShowCalendar(false);
                setDate(date);
              }}
            />
          )}
          <CustomInput
            placeholder={"dd.mm.yyyy"}
            topText={"Choose Date"}
            setValue={setDate}
            className={"tw-flex tw-flex-col tw-justify-between tw-mr-5"}
            inputProps={{
              onFocus: () => {
                setShowCalendar(true);
              },
              value: date?.format("DD.MM.YYYY"),
            }}
          />
          <div className={"tw-w-1/2"}>
            <div className={"tw-pb-1"}> Choose timeslot</div>
            <CustomDropdown
              dropdownItems={mockTimeslots}
              iconToShow={<FieldTimeOutlined />}
              header={timeSlot}
              setHeader={setTimeSlot}
            />
          </div>
        </div>
        <div>
          <CustomInput
            placeholder={"Type Subject"}
            topText={"Subject"}
            setValue={setSubject}
            className={"tw-w-3/4"}
          />
        </div>
        <div>
          <div>Message</div>
          <Input.TextArea
            placeholder={"Type Message"}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            style={{
              height: "150px",
            }}
          />
        </div>
        <div>
          <button
            className={"tw-bg-main tw-text-white tw-w-40 tw-h-10 tw-ml-4"}
            style={{ borderRadius: "4px" }}
          >
            Make an appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PsychologistModal;
