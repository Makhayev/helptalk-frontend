import React from "react";
import { observer } from "mobx-react-lite";
import SearchPageCard from "../../components/SearchPageCard";

const Search = observer(() => {
  return (
    <div>
      <div className={"tw-h-24"}>
        <div className={"tw-flex tw-justify-center tw-mt-10 tw-items-center"}>
          <input
            placeholder={"Share your problem with us"}
            className={
              "tw-h-10 tw-border-2 tw-w-1/3 tw-border-main tw-border-opacity-60 tw-p-6"
            }
            style={{ borderRadius: "20px" }}
          />
          <button
            className={"tw-bg-main tw-text-white tw-w-20 tw-h-10 tw-ml-4"}
            style={{ borderRadius: "10px" }}
          >
            search
          </button>
        </div>
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
        <SearchPageCard />
        <SearchPageCard />
        <SearchPageCard />
      </div>
    </div>
  );
});

export default Search;
