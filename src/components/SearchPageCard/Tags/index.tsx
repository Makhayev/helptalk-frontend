import React from "react";
import internal from "stream";
//@ts-ignore
import Painter from "paint-by-the-numbers";

interface tagProps {
  label: string;
  number?: number;
}

const Tag = ({ label, number = 0 }: tagProps) => {
  let p = new Painter(1, 80, "#58ff0f", "#0d2a00");
  let color = p.getRGBA(number);

  return (
    <div
      className={"tw-w-fit tw-mx-2 tw-text-white tw-py-1 tw-px-4 tw-rounded-xl"}
      style={{ backgroundColor: number == 0 ? "grey" : color }}
    >
      {label}
    </div>
  );
};

export default Tag;
