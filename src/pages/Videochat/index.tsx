import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import User from "../../mobx/user";
import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import io from "socket.io-client";
//@ts-ignore
// const socket = io.connect("https://helptalk-backend.up.railway.app");
const socket = io.connect("http://localhost:5431");

const Videochat = observer(() => {
  const params = useParams<{ id?: string }>();
  const myVideo = useRef<HTMLVideoElement>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const userVideo = useRef<HTMLVideoElement>(null);
  console.log(User.email);
  useEffect(() => {
    const myPeer = new Peer(User.email);
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
    socket.once("chat-message", (data: any) => {
      console.log(data.message);
      console.log(messages);
      if (messages?.[messages?.length - 1] !== data.message) {
        console.log("setter");
        setMessages((prev) => [...prev, data.message]);
      }
    });
  }, []);

  return (
    <div>
      <div className="tw-flex tw-justify-evenly tw-my-20">
        <video
          playsInline
          muted
          autoPlay
          style={{ width: "300px" }}
          ref={myVideo}
        />
        <video
          playsInline
          ref={userVideo}
          autoPlay
          style={{ width: "300px" }}
        />
      </div>
      <div className="tw-flex tw-justify-center">
        <input
          className="tw-border-2 tw-border-dark tw-mr-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="tw-border-2 tw-border-dark"
          onClick={() => {
            setMessages((prev) => [...prev, text]);
            socket.emit("send-chat-message", params.id, text);
            setText("");
          }}
        >
          send
        </button>
      </div>
      <div className={"tw-flex tw-flex-col tw-items-center"}>
        {messages.map((message) => (
          <div>{message}</div>
        ))}
      </div>
    </div>
  );
});

export default Videochat;
