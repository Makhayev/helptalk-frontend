import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import User from "../../mobx/user";
import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import io from "socket.io-client";
import api from "../../api/AxiosInstance";
//@ts-ignore
const socket = io.connect("https://helptalk-backend.up.railway.app");
// const socket = io.connect("http://localhost:5431");

const Videochat = observer(() => {
  const params = useParams<{ id?: string }>();
  const myVideo = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<
    { msg: string; isFromMe: boolean }[]
  >([]);
  const userVideo = useRef<HTMLVideoElement>(null);
  const [guestName, setGuestName] = useState<string>("");
  const myPeer = new Peer(User.email);
  console.log(User.role);
  useEffect(() => {
    api
      .post(
        User.role === "specialist"
          ? "/book/getbyspecialistid"
          : "/book/getbypatientid",
        {
          id: User.id,
        }
      )
      .then((resp) => {
        console.log(resp.data);
        const appointment = resp.data.find(
          (appointment: any) => appointment.room_id === params?.id
        );
        if (User.role === "specialist") {
          api
            .post("/patient/getById", {
              id: parseInt(appointment?.patient_id),
            })
            .then((resp) => {
              setGuestName(`${resp.data.first_name} ${resp.data.last_name}`);
            });
        } else {
          api
            .post("/specialist/getById", {
              specialist_id: parseInt(appointment.specialist_id),
            })
            .then((resp) => {
              setGuestName(`${resp.data.first_name} ${resp.data.last_name}`);
            });
        }
      });
  }, [User.id]);
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      //@ts-ignore
      myVideo.current.srcObject = stream;
      myPeer.on("call", (call: any) => {
        call.answer(stream);
        call.on("stream", (stream: any) => {
          //@ts-ignore
          userVideo.current.srcObject = stream;
        });
      });

      socket.on("user-connected", (userId: any) => {
        const call = myPeer.call(userId, stream);
        call.on("stream", (stream: any) => {
          //@ts-ignore
          userVideo.current.srcObject = stream;
        });
        call.on("close", () => {
          userVideo?.current?.remove();
        });
      });
    });
  myPeer.on("open", (id: any) => {
    socket.emit("join-room", params.id, id);
  });
  useEffect(() => {
    socket.on("chat-message", (data: any) => {
      console.log(data.message);
      console.log(messages);
      if (messages?.[messages?.length - 1] !== data.message) {
        console.log("setter");
        setMessages((prev) => [
          ...prev,
          { msg: data.message, isFromMe: false },
        ]);
      }
    });
  }, []);

  return (
    <div>
      <div className="tw-flex tw-justify-evenly tw-my-20">
        <div>
          {" "}
          <video
            playsInline
            muted
            autoPlay
            style={{ width: "300px" }}
            ref={myVideo}
          />
          <div>
            {User.name} {User.surname}
          </div>
        </div>
        <div>
          {" "}
          <video
            playsInline
            ref={userVideo}
            autoPlay
            style={{ width: "300px" }}
          />
          <div>{guestName}</div>
        </div>
      </div>
      <div className="tw-flex tw-justify-center">
        <input className="tw-border-2 tw-border-dark tw-mr-4" ref={inputRef} />
        <button
          className="tw-border-2 tw-border-dark"
          onClick={() => {
            setMessages((prev) => [
              ...prev,
              { msg: inputRef?.current?.value ?? "", isFromMe: true },
            ]);
            socket.emit(
              "send-chat-message",
              params.id,
              inputRef?.current?.value
            );
          }}
        >
          send
        </button>
      </div>
      <div className={"tw-flex tw-flex-col tw-items-center"}>
        {messages.map((message) => (
          <>
            {message.isFromMe ? (
              <div className="tw-text-left tw-w-60"> You: {message.msg}</div>
            ) : (
              <div className="tw-text-right tw-w-60">
                {guestName}: {message.msg}{" "}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
});

export default Videochat;
