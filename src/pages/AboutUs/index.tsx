import React, { LegacyRef, useEffect, useRef, useState } from "react";
// @ts-ignore
import Peer from "simple-peer/simplepeer.min.js";
import io from "socket.io-client";
import { Button, Input } from "antd";
//@ts-ignore
const socket = io.connect("http://localhost:5431");

const AboutUs = () => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState<MediaStream>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef<LegacyRef<HTMLVideoElement>>();
  const userVideo = useRef<LegacyRef<HTMLVideoElement>>();
  const connectionRef = useRef();
  console.log(socket);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        //@ts-ignore
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id: string) => {
      setMe(id);
    });

    socket.on("callUser", (data: any) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);
  const callUser = (id: string) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data: any) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream: any) => {
      //@ts-ignore
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal: any) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    //@ts-ignore
    connectionRef.current = peer;
  };

  const joinRoom = () => {};

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data: any) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream: any) => {
      //@ts-ignore
      userVideo.current.srcObject = stream;
    });

    // @ts-ignore
    peer.signal(callerSignal);
    // @ts-ignore
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    //@ts-ignore
    connectionRef.current.destroy();
  };
  return (
    <div className="tw-h-96 tw-bg-secondary">
      <div className={"tw-flex"}>
        <div>
          {stream && (
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              style={{ width: "300px" }}
            />
          )}
        </div>
        <div>
          {callAccepted && !callEnded ? (
            <video
              playsInline
              ref={userVideo}
              autoPlay
              style={{ width: "300px" }}
            />
          ) : null}
        </div>
      </div>

      <div>myId: {me}</div>
      <Input value={name} onChange={(event) => setName(event.target.value)} />
      <Input
        value={idToCall}
        onChange={(event) => setIdToCall(event.target.value)}
      />
      {callAccepted && !callEnded ? (
        <Button color="secondary" onClick={leaveCall}>
          End Call
        </Button>
      ) : (
        <Button
          color="primary"
          aria-label="call"
          onClick={() => callUser(idToCall)}
        >
          Call
        </Button>
      )}
      {idToCall}
      <div>
        {receivingCall && !callAccepted ? (
          <div className="caller">
            <h1>{name} is calling...</h1>
            <Button color="primary" onClick={answerCall}>
              Answer
            </Button>
          </div>
        ) : null}
      </div>
      <div>
        <Button onClick={joinRoom}>Join room</Button>
      </div>
    </div>
  );
};

export default AboutUs;
