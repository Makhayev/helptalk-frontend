import React, { useState } from "react";
import { BsFillTelephoneFill, BsTelegram } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import PendingBookingCard from "../PendingBookingCard";
import User from "../../store/user";
import PsychologistModal from "../PsychologistModal";
import { Button, Modal } from "antd";
import { NumericFormat, PatternFormat } from "react-number-format";
import api from "../../api";
import alert from "../../store/alert";
import { EditOutlined } from "@ant-design/icons";
import { createClient } from "@supabase/supabase-js";
import { psychologistPageProps } from "../../interfaces";

const PsychologistCard = ({
  appointments,
  imageURL = "/defaultPsychologistImage.png",
  imageAlt = "zhankin",
  fullName = "Arman Zhankin",
  title = "psychiatrist",
  number = "87006641743",
  email = "arman.zhankin@gmail.com",
  telegramUsername = "@Zhankin",
  description = "Hello! My name is Arman, I am a psychologist with 5 years of experience. I have worked for NU counselling and focus on people with eating disorders.",
  price = "100$",
  rating,
  isProfile = false,
  bookings = [],
  id,
}: psychologistPageProps) => {
  const supabase = createClient(
    "https://tyzrmnbtpxpgasdzjmyg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5enJtbmJ0cHhwZ2FzZHpqbXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkyMTM5MTUsImV4cCI6MTk4NDc4OTkxNX0.Hmd0phyJLNhgq5t0WZ6mQXpQ6Ercj8IFpxXUF8U4C0g"
  );
  const starterPath =
    "https://tyzrmnbtpxpgasdzjmyg.supabase.co/storage/v1/object/public/files/";
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [nameSurname, setNameSurname] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");
  const [money, setMoney] = useState<string>("");

  const [moneyPerHour, setMoneyPerHour] = useState<string>(price);
  const [socialMedia, setSocialMedia] = useState<string>(telegramUsername);
  const [phone, setPhone] = useState<string>(number);

  const [fileToUpload, setFileToUpload] = useState<File>();
  const [inputValue, setInputValue] = useState(1);
  const [review, setReview] = useState<string>("");

  const addMoney = () => {
    if (
      money !== "" &&
      cardNumber.trim().length === 19 &&
      nameSurname.split(" ").length > 1 &&
      cvc.trim().length === 3
    ) {
      api
        .post("/specialist/withdraw", {
          email: User.email,
          balance: parseInt(money),
        })
        .then((response) => {
          alert.openAlert(
            5000,
            "success",
            "Money was withdrawn to your credit card!"
          );
          setTimeout(() => {
            location.reload();
          }, 3000);
        });
    } else {
      alert.openAlert(
        5000,
        "error",
        "Please check your credit card information..."
      );
    }
  };
  const submitProfileChanges = () => {
    api
      .post("/specialist/updateProfile", {
        email: User.email,
        socialmedia_account: socialMedia,
        phone: phone,
        price: moneyPerHour,
      })
      .then(() => {
        alert.openAlert(5000, "success", "Your info has been updated...");
        setTimeout(() => {
          location.reload();
        }, 3000);
      });
  };

  const submitReview = (appointment_id: string) => {
    api
      .post("/rating/submit", {
        review: review,
        rating: inputValue,
        appointment_id: appointment_id,
      })
      .then((response) => {
        alert.openAlert(5000, "success", "Your review has been submitted...");
        setTimeout(() => {
          location.reload();
        }, 3000);
      });
  };

  const onChange = (newValue: number | null) => {
    setInputValue(newValue ?? 1);
  };
  const handleUpload = async () => {
    if (!fileToUpload) {
      return;
    }
    const { data } = await supabase.storage
      .from("files")
      .upload(
        "public/" +
          String(Math.round(Math.random() * 100)) +
          fileToUpload?.name,
        fileToUpload as File
      );

    if (data) {
      return starterPath + data?.path;
    }
  };

  const initiateUpload = async () => {
    if (!fileToUpload) {
      alert.openAlert(5000, "error", "Please select a file to upload...");
      return;
    }
    const filePath = await handleUpload();
    if (!filePath) {
      alert.openAlert(5000, "error", "Upload file!");
      return;
    }
    api.post("/user/uploadAvatar", {
      email: User.email,
      avatar: filePath,
    });
  };
  const filteredBookings = bookings?.filter((booking) => !booking?.approved);
  console.log(appointments);
  return (
    <div className={"tw-flex tw-justify-center"}>
      <div
        style={{ height: "150vh", width: "40vw" }}
        className={
          "tw-border-secondary tw-border-2 tw-flex tw-flex-col tw-items-center tw-p-5"
        }
      >
        <div className={"tw-flex tw-w-full tw-justify-start"}>
          <div>
            {isEditMode ? (
              <div className="flex flex-col">
                <input
                  type="file"
                  accept="image/png,image/jpg"
                  onChange={(e) => {
                    setFileToUpload(e.target.files?.[0]);
                  }}
                />
                <Button onClick={initiateUpload}>Upload Avatar</Button>
              </div>
            ) : (
              <img
                src={imageURL ?? "/defaultPsychologistImage.png"}
                style={{ width: "20vw" }}
                alt={imageAlt}
              />
            )}
          </div>
          <div
            className={
              "tw-flex tw-flex-col tw-justify-between tw-h-3/4 tw-ml-2"
            }
          >
            <div
              className={"tw-text-xl tw-font-bold tw-flex tw-justify-between"}
            >
              <span>{fullName}</span>
              {isProfile && (
                <Button
                  className="tw-mr-6"
                  onClick={() => {
                    setIsEditMode((prev) => !prev);
                  }}
                >
                  <EditOutlined />
                </Button>
              )}
            </div>
            <div className={"tw-font-medium tw-text-lg"}>{title}</div>
            {isProfile && (
              <div className={"tw-font-medium tw-text-lg"}>
                My balance: {User.balance}
                <Button
                  style={{
                    borderRadius: "0.5rem",
                  }}
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Withdraw money
                </Button>
              </div>
            )}
            <div className={"tw-text-secondary"}>___________</div>
            <div className={"tw-font-light tw-flex tw-items-center "}>
              <BsFillTelephoneFill color={"#5877C5"} size={20} />
              <div className={"tw-text-lg tw-ml-2"}>
                {isEditMode ? (
                  <NumericFormat
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    className="tw-w-[150px] tw-inline tw-border-2 tw-border-secondary"
                  />
                ) : (
                  number
                )}
              </div>
            </div>
            <div className={"tw-font-light tw-my-1  tw-flex tw-items-center "}>
              <GrMail color={"#5877C5"} size={20} />
              <div className={"tw-text-lg tw-ml-2"}>{email}</div>
            </div>
            <div className={"tw-font-light tw-my-1  tw-flex tw-items-center "}>
              <BsTelegram color={"#5877C5"} size={20} />
              <div className={"tw-text-lg tw-ml-2"}>
                {isEditMode ? (
                  <input
                    value={socialMedia}
                    onChange={(e) => {
                      setSocialMedia(e.target.value);
                    }}
                    className="tw-w-[150px] tw-inline tw-border-2 tw-border-secondary"
                  />
                ) : (
                  telegramUsername
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={"tw-flex tw-flex-col tw-w-full tw-px-4"}>
          <div className={"tw-text-lg tw-font-bold tw-mt-4"}>About</div>
          <div className="tw-text-main">________</div>
          <div>{description}</div>
          <div className={"tw-flex tw-justify-between tw-my-8"}>
            <div>
              <img alt="money" src="/money.svg" className={"tw-inline"} />
              {isEditMode ? (
                <span className={"tw-ml-2 tw-text-main tw-text-lg"}>
                  <NumericFormat
                    value={moneyPerHour}
                    onChange={(e) => {
                      setMoneyPerHour(e.target.value);
                    }}
                    className="tw-w-[100px] tw-inline tw-border-2 tw-border-secondary"
                  />
                  /hour
                </span>
              ) : (
                <span className={"tw-ml-2 tw-text-main tw-text-lg"}>
                  {price}/hour
                </span>
              )}
            </div>
            <div>
              <img alt={"stars"} src="/star.svg" className={"tw-inline"} />
              <span className={"tw-ml-2 tw-text-main tw-text-lg tw-ml-6"}>
                {rating ? <span>{rating}/5</span> : <span>No ratings yet</span>}
              </span>
            </div>
          </div>
        </div>
        {!isProfile && (
          <>
            <PsychologistModal
              psychologistName={fullName}
              psychologistID={id}
            />
            <div className="">
              <div className="tw-font-bold tw-text-lg">
                Reviews for this psychologist:
              </div>
              {appointments?.map((app, index) => (
                <div className="tw-text-center">
                  {index + 1}) {app?.reviews?.[0]?.review}
                </div>
              ))}
            </div>
          </>
        )}
        {isProfile && isEditMode && (
          <div className="tw-my-8">
            <Button onClick={submitProfileChanges}>
              Submit profile changes
            </Button>
          </div>
        )}
        {isProfile && (
          <>
            <div className={"tw-font-bold tw-text-lg"}> Pending bookings</div>
            {filteredBookings.length > 0 ? (
              filteredBookings?.map((booking) => (
                <PendingBookingCard
                  approved={booking.approved}
                  appointed_at={booking.appointed_at}
                  end_time={booking.end_time}
                  nameId={
                    User.role === "patient"
                      ? booking.specialist_id
                      : booking.patient_id
                  }
                  id={booking.id}
                  patient_id={booking.patient_id}
                  specialist_id={booking.specialist_id}
                  comments={booking.comments}
                  room_id={booking.room_id}
                />
              ))
            ) : (
              <div>Empty...</div>
            )}
          </>
        )}
      </div>
      <Modal
        open={isOpen}
        keyboard={true}
        onCancel={() => setIsOpen(false)}
        width={"550px"}
        footer={null}
      >
        Enter your credit card information:
        <div>Card Number:</div>
        <PatternFormat
          className="tw-block tw-w-full tw-my-4 tw-border-2 tw-border-secondary"
          format="#### #### #### ####"
          placeholder="1234 1234 1234 1234"
          onChange={(e) => {
            setCardNumber(e.target.value);
          }}
        />
        <div>Cardholder's name:</div>
        <input
          className="tw-h-6 tw-w-full tw-border-2 tw-border-secondary"
          placeholder="NAME SURNAME"
          onChange={(e) => {
            setNameSurname(e.target.value);
          }}
        />
        <div className="tw-mt-4">CVC/CVV:</div>
        <PatternFormat
          className="tw-block tw-w-full tw-mb-4 tw-border-2 tw-border-secondary"
          format="###"
          placeholder="123"
          onChange={(e) => {
            setCvc(e.target.value);
          }}
        />
        <div className="mt-4">Amount of money you want to withdraw:</div>
        <NumericFormat
          className="tw-w-full tw-border-2 tw-border-secondary"
          onChange={(e) => {
            setMoney(e.target.value);
          }}
          value={money}
        />
        <div className="tw-flex tw-justify-center tw-mt-4">
          <Button onClick={addMoney}> Proceed</Button>
        </div>
      </Modal>
    </div>
  );
};

export default PsychologistCard;
