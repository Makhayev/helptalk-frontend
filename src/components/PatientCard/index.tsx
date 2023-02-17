import React, { useRef, useState } from "react";
import api from "../../api/AxiosInstance";
import { BsFillTelephoneFill, BsTelegram } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { Button, Input, Modal } from "antd";
import { NumericFormat, PatternFormat } from "react-number-format";
import User from "../../mobx/user";
import alert from "../../mobx/alert";
import { EditOutlined } from "@ant-design/icons";

interface psychologistPageProps {
  imageURL?: string;
  imageAlt?: string;
  fullName?: string;
  number?: string;
  email?: string;
  telegramUsername?: string;
  balance?: number;
  isProfile?: boolean;
}

const PsychologistCard = ({
  imageURL = "/defaultPsychologistImage.png",
  imageAlt = "zhankin",
  fullName = "Arman Zhankin",
  number = "87006641743",
  email = "arman.zhankin@gmail.com",
  telegramUsername = "@Zhankin",
  balance,
  isProfile = false,
}: psychologistPageProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [nameSurname, setNameSurname] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");
  const [money, setMoney] = useState<string>("");
  const [phone, setPhone] = useState<string>(number);
  const [socialMedia, setSocialMedia] = useState<string>(telegramUsername);

  const addMoney = () => {
    if (
      money !== "" &&
      cardNumber.trim().length === 19 &&
      nameSurname.split(" ").length > 1 &&
      cvc.trim().length === 3
    ) {
      api
        .post("/patient/topUp", {
          email: User.email,
          balance: parseInt(money),
        })
        .then((response) => {
          alert.openAlert(5000, "success", "Money added to your balance!");
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
    console.log(User.email);
    api
      .post("/patient/updateProfile", {
        email: User.email,
        socialmedia_account: socialMedia,
        phone: phone,
      })
      .then((response) => {
        alert.openAlert(5000, "success", "Your info has been updated...");
        setTimeout(() => {
          location.reload();
        }, 3000);
      });
  };

  return (
    <div className={"tw-flex tw-justify-center"}>
      <div
        style={{ height: "35vh", width: "40vw" }}
        className={
          "tw-border-secondary tw-border-2 tw-flex tw-flex-col tw-items-center tw-p-5"
        }
      >
        <div className={"tw-flex tw-w-full tw-justify-start"}>
          <img src={imageURL} style={{ width: "20vw" }} alt={imageAlt} />
          <div
            className={
              "tw-flex tw-flex-col tw-justify-between tw-h-3/4 tw-ml-2"
            }
          >
            <div className={"tw-text-xl tw-font-bold"}>
              {fullName}{" "}
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
            <div className={"tw-font-medium tw-text-lg"}>client</div>
            {balance !== undefined && (
              <div className={"tw-font-medium tw-text-lg"}>
                My balance: {balance}
                <Button
                  style={{
                    borderRadius: "0.5rem",
                  }}
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Add money
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
        {isProfile && isEditMode && (
          <div className="tw-my-8">
            <Button onClick={submitProfileChanges}>
              Submit profile changes
            </Button>
          </div>
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
        <div className="mt-4">Amount of money you want to add:</div>
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
