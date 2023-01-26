import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import User from "../../mobx/user";
import React, { useRef } from "react";
import Peer from "peerjs";
import io from "socket.io-client";
//@ts-ignore
const socket = io.connect("https://helptalk-backend.up.railway.app");

const Videochat = observer(() => {
  const params = useParams<{ id?: string }>();
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const myPeer = new Peer(User.id);
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
      });
    });
  myPeer.on("open", (id: any) => {
    socket.emit("join-room", params.id, id);
  });
  return (
    <div>
      <div>Hello guys</div>
      <video
        playsInline
        muted
        autoPlay
        style={{ width: "300px" }}
        ref={myVideo}
      />
      <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} />
    </div>
  );
});

export default Videochat;
