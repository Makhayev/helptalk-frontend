import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { doc, collection, getDoc } from "firebase/firestore";
import db from "../Collaborate/db";
import xlsx from "json-as-xlsx"

const AdminProfile = () => {
  const [chartData, setChartData] = useState<any[]>([
    { value: 335, name: "Sample spec 1" },
    { value: 310, name: "Sample spec 2" },
    { value: 274, name: "Sample spec 3" },
    { value: 235, name: "Sample spec 4" },
    { value: 400, name: "Sample spec 5" },
  ]);
  const [excelData, setExcelData] = useState<any[]>(
    [
      { value: 335, name: "Sample spec 1" },
      { value: 310, name: "Sample spec 2" },
      { value: 274, name: "Sample spec 3" },
      { value: 235, name: "Sample spec 4" },
      { value: 400, name: "Sample spec 5" },
    ]
  );

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
          setExcelData((prev : any) => [...prev, {name: spec, value: docSnap.data()[spec]}])
        }
      }
      
      // await chartData.map((item) => {
      //   console.log(item.value)
      //   setExcelData((prev : any) => [...prev, {name: item.name, value: item.value.toString()}])
      // })
      
        
      

    })();
  }, []);

  const option = {
    backgroundColor: "#ffffff",
    title: {
      //text: "Customized Pie",
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
      { label: "Quantity", value: (row : any) => row.value }, // Custom format
      // { label: "Phone", value: (row :any) => (row.more ? row.more.phone || "" : "") }, // Run functions
    ],
     content: excelData
    //[
    //   // { name: "Andrea", value: 20 },
    //   // { name: "Luis", value: 21 },

    // ],
  },
  
]

let settings = {
  fileName: "SpecsData", // Name of the resulting spreadsheet
  extraLength: 3, // A bigger number means that columns will be wider
  writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
  writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
   // Display the columns from right-to-left (the default value is false)
}

  return <div>
    <ReactEcharts option={option} />
    <button onClick={()=>xlsx(data, settings)}>Download data</button>
  </div>;
};

export default AdminProfile;
