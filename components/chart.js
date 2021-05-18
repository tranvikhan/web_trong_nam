import React, { Component } from "react";
import dynamic from "next/dynamic";
import { subscribe } from "react-mqtt-client";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const MyChart = (props) => {
  const [series, setSeries] = React.useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ]);
  const [config, setConfig] = React.useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
  });

  React.useEffect(() => {
    let newData = [...props.data.reverse().map((dt) => dt.Temperature)];
    if (newData.length > 10) {
      newData.shift;
    }
    setSeries([
      {
        ...series.name,
        data: newData,
      },
    ]);
    console.log(props.data.map((dt) => dt.Temperature));
  }, [props.data]);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={config.options}
            series={series}
            type="line"
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default MyChart;
/* export default subscribe({ topic: "sensor/0001" })(MyChart); */
