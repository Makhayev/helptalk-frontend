import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { doc, collection, getDoc } from "firebase/firestore";
import db from "../Collaborate/db";
import xlsx from "json-as-xlsx";
import { Button, Input, Modal } from "antd";
import api from "../../api";

const AdminProfile = () => {
  const [unconfirmedSpecialists, setUnconfirmedSpecialists] = useState<any[]>(
    []
  );
  const [msg, setMsg] = useState<string>("");
  const [chartData, setChartData] = useState<any[]>([
    { value: 335, name: "Sample spec 1" },
    { value: 310, name: "Sample spec 2" },
    { value: 274, name: "Sample spec 3" },
    { value: 235, name: "Sample spec 4" },
    { value: 400, name: "Sample spec 5" },
  ]);
  const [excelData, setExcelData] = useState<any[]>([
    { value: 335, name: "Sample spec 1" },
    { value: 310, name: "Sample spec 2" },
    { value: 274, name: "Sample spec 3" },
    { value: 235, name: "Sample spec 4" },
    { value: 400, name: "Sample spec 5" },
  ]);

  useEffect(() => {
    (async () => {
      const docRef = doc(collection(db, "specs"), "2023");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setChartData([]);
        setExcelData([]);
        let sum = 0;
        for (let spec of Object.keys(docSnap.data())) {
          sum += docSnap.data()[spec];
        }
        for (let spec of Object.keys(docSnap.data())) {
          setChartData((prev) => [
            ...prev,
            {
              value: docSnap.data()[spec],
              name: spec,
              weight: docSnap.data()[spec] / sum,
            },
          ]);
          setExcelData((prev: any) => [
            ...prev,
            { name: spec, value: docSnap.data()[spec] },
          ]);
        }
      }
    })();
  }, []);

  const option = {
    backgroundColor: "#ffffff",
    title: {
      left: "center",
      top: 50,
      textStyle: {
        color: "#5877C5",
      },
    },

    tooltip: {
      trigger: "item",
    },

    visualMap: {
      show: false,
      min: 0,
      max: 50,
      inRange: {
        colorLightness: [0, 1],
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "90%",
        center: ["50%", "50%"],
        data: chartData.sort(function (a, b) {
          return a.weight - b.weight;
        }),
        roseType: "radius",
        label: {
          color: "#5877C5",
        },
        labelLine: {
          lineStyle: {
            color: "#5877C5",
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        itemStyle: {
          color: "#5877C5",
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },

        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: function () {
          return Math.random() * 200;
        },
      },
    ],
  };
  let data = [
    {
      sheet: "Adults",
      columns: [
        { label: "Spec", value: "name" }, // Top level data
        { label: "Quantity", value: (row: any) => row.value }, // Custom format
        // { label: "Phone", value: (row :any) => (row.more ? row.more.phone || "" : "") }, // Run functions
      ],
      content: excelData,
      //[
      //   // { name: "Andrea", value: 20 },
      //   // { name: "Luis", value: 21 },

      // ],
    },
  ];

  let settings = {
    fileName: "SpecsData", // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
    // Display the columns from right-to-left (the default value is false)
  };

  useEffect(() => {
    api.get("/admin/getUnconfirmedSpecialists").then((res) => {
      console.log(res.data);
      setUnconfirmedSpecialists(res.data);
    });
  }, []);

  const handleApprove = (email: string) => {
    api.post("/admin/approveSpecialist", { email: email }).then((res) => {
      console.log(res);
    });
  };

  const handleReject = (email: string) => {
    api
      .post("/admin/declineSpecialist", { email: email, message: msg })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <ReactEcharts option={option} />
      <div className="tw-flex tw-justify-center tw-mt-4">
        <Button shape="round" onClick={() => xlsx(data, settings)}>
          Download data
        </Button>
      </div>
      <div className="tw-flex tw-justify-center tw-flex-col tw-items-center">
        {unconfirmedSpecialists.map((spec) => {
          return (
            <div className="tw-z-0 tw-grid tw-grid-cols-4 tw-w-2/3 tw-h-48 tw-my-4 tw-border-2 tw-rounded-xl tw-border-secondary tw-drop-shadow-sm">
              <div className="tw-flex tw-justify-center tw-items-center ">
                <img
                  src="defaultPsychologistImage.png"
                  alt="psychologist image"
                  className={"tw-w-3/4 tw-h-3/4"}
                />
              </div>
              <div
                className={
                  "tw-col-span-2 tw-flex tw-flex-col tw-justify-around"
                }
              >
                <div className={"tw-text-main tw-text-lg tw-underline tw-mt-4"}>
                  {spec.first_name} {spec.last_name}
                </div>
                <div>{spec.email}</div>
                <div>{spec.description}</div>
                <div>
                  <Button
                    onClick={() => {
                      handleApprove(spec.email);
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => {
                      handleReject(spec.email);
                    }}
                  >
                    Reject
                  </Button>
                  <Input
                    onChange={(e) => {
                      setMsg(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div
                className={
                  "tw-flex-col tw-flex tw-justify-around tw-items-start"
                }
              >
                <div
                  className={"tw-flex tw-justify-start tw-items-center tw-ml-2"}
                >
                  <img src="money.svg" className={"tw-inline"} />
                  <span className={"tw-ml-2 tw-text-main tw-text-lg"}>
                    {spec.price}$ per hour
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProfile;
