import React, { useState } from "react";
import axios from "axios";
const Collaborate = () => {
  const [prompt, setPrompt] = useState("");
  const [stringFromDB, setStringFromDB] = useState("");
  const fetchStuff = () => {
    axios
      .post(`${import.meta.env.VITE_VERCEL_URL}/openai`, {
        prompt: prompt,
      })
      .then((response) => {
        setStringFromDB(response?.data?.message);
        alert("success");
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };
  return (
    <div>
      <div className={"tw-h-24"}>
        <div className={"tw-flex tw-justify-center tw-mt-10 tw-items-center"}>
          <input
            placeholder={"Share your problem with us"}
            className={
              "tw-h-10 tw-border-2 tw-w-1/3 tw-border-main tw-border-opacity-60 tw-p-6"
            }
            onChange={(e) => {
              setPrompt(e?.target?.value);
            }}
            style={{ borderRadius: "20px" }}
          />
          <button
            className={"tw-bg-main tw-text-white tw-w-20 tw-h-10 tw-ml-4"}
            style={{ borderRadius: "10px" }}
            onClick={fetchStuff}
          >
            search
          </button>
        </div>
      </div>
      <div>
        {stringFromDB?.split(" ").map((str) => (
          <div> {str}</div>
        ))}
      </div>
    </div>
  );
};

export default Collaborate;
