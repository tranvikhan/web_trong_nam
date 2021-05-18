import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SimpleChart = (props) => {
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [45, 100],
      },
    },
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    tooltip: {
      theme: "dark",
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
    colors: props.colors || ["#49aa19"],
  };
  const type = props.type || "area";
  const series = [{ name: props.name || "Data", data: props.data || [] }];

  return <Chart options={options} series={series} type={type} height={45} />;
};

export default SimpleChart;
