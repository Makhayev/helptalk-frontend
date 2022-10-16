import React from "react";
import { observer } from "mobx-react-lite";

const Search = observer(() => {
  return (
    <div>
      <div className={"tw-h-96"}>
        <div className={"tw-flex tw-justify-center"}>
          <input
            placeholder={"Share your problem with us"}
            className={
              "tw-h-10 tw-border-2 tw-w-1/3 tw-border-secondary tw-border-opacity-60 tw-p-6"
            }
          />
        </div>
      </div>
    </div>
  );
});

export default Search;
