import FormItemLabel from "antd/es/form/FormItemLabel";
import React, { useState, useEffect } from "react";
import api from "../../api/AxiosInstance";
import SearchPageCard from "../../components/SearchPageCard";
import Tag from "../../components/SearchPageCard/Tags";
import searchString from "../../mobx/searchString";
import User from "../../mobx/user";

const Collaborate = () => {
  const [prompt, setPrompt] = useState("");
  const [rankedSpecs, setRankedSpecs] = useState<any[]>([]);
  const [specVal, setSpecVal] = useState<any[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [tagsShowed, setTagsShowed] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [specialists, setSpecialists] = useState<any[]>([]);

  useEffect(() => {
    setSearch(searchString.search);
    // api.get("/specialist/getAll").then((response) => {
    //   console.log(response.data);
    //   setSpecialists(response.data);
    // });
  }, []);
  const fetchStuff = () => {
    setLoad(true);
    setTagsShowed(false);
    api
      .post(`/openai`, {
        prompt: prompt,
      })
      .then((response) => {
        setLoad(false);
        setRankedSpecs([]);
        setSpecVal(response?.data?.Specializations.Specializations);
        for (let spec in response?.data?.Specializations.Specializations) {
          setRankedSpecs((prev) => [...prev, spec]);
        }
        setTagsShowed(true);
        setSpecialists(response?.data?.Specializations.Specialists);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };
  const handleKeypress = (e: any) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      fetchStuff();
    }
  };
  return (
    <div>
      <div className={"tw-h-12"}>
        <div className={"tw-flex tw-justify-center tw-mt-10 tw-items-center"}>
          <input
            placeholder={"Share your problem with us"}
            className={
              "tw-h-10 tw-border-2 tw-w-1/3 tw-border-main tw-border-opacity-60 tw-p-6"
            }
            style={{ borderRadius: "20px" }}
            onChange={(e) => {
              setSearch(e.target.value);
              setPrompt(e.target.value);
            }}
            value={search}
            onKeyDown={handleKeypress}
          />
          <button
            className={"tw-bg-main tw-text-white tw-w-20 tw-h-10 tw-ml-4"}
            style={{ borderRadius: "10px" }}
            onClick={fetchStuff}
            disabled={load}
          >
            search
          </button>
        </div>
      </div>

      <div className="tw-flex tw-justify-center tw-mt-5 tw-items-center">
        {load ? (
          <img src="/blue-loader.gif" width="100" height="100" />
        ) : (
          <div className="tw-flex tw-flex-col tw-mt-5 tw-items-center tw-justify-center">
            <ul className="tw-flex tw-flex tw-justify-between">
              {rankedSpecs.map((spec) => (
                <Tag label={spec} number={specVal[spec]} />
              ))}
            </ul>
            {tagsShowed && (
              <div className="tw-flex tw-flex-col tw-mt-5 tw-items-center tw-justify-center">
                {specialists.map((specialist: any) => (
                  <SearchPageCard
                    name={`${specialist.first_name} ${specialist.last_name}`}
                    pricing={String(specialist.price)}
                    description={specialist.description}
                    psychologistID={specialist.id}
                    tags={specialist.specializations}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collaborate;
