import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Space, Typography } from "antd";
const Heatmap = dynamic(
  () => import("@ant-design/charts").then((mod) => mod.Heatmap),
  { ssr: false }
);

const SensorsMap = (props) => {
  const [data, setData] = useState([]);

  const mapOnReady = (plot) => {
    plot.on("element:click", (...args) => {
      let value = { ...args }[0].data.data;
      props.onClickSell(value);
    });
    let fake = new Array();
    for (let i = 0; i <= 10; i++) {
      for (let j = 0; j <= 20; j++) {
        fake.push({
          xField: j + "",
          yField: i + "",
          value: 0,
        });
      }
    }
    fake.push({
      xField: "10",
      yField: "5",
      value: 10,
      name: "Cảm biến nhiệt độ 1",
      id: "SR00001",
    });
    fake.push({
      xField: "5",
      yField: "10",
      value: 10,
      name: "Cảm biến nhiệt độ 2",
      id: "SR00002",
    });
    setData(fake);
  };
  var config = {
    data: data,
    xField: "xField",
    yField: "yField",
    colorField: "value",
    shape: "circle",
    theme: "dark",
    xAxis: {
      grid: {
        line: {
          style: {
            stroke: "black",
            lineWidth: 1,
            strokeOpacity: 0.4,
          },
        },
      },
    },
    yAxis: {
      grid: {
        line: {
          style: {
            stroke: "black",
            lineWidth: 1,
            strokeOpacity: 0.4,
          },
        },
      },
    },
    tooltip: {
      customContent: (title, data) => {
        return (
          <div style={{ padding: 10 }}>
            <h4 level={5}>
              {data[0] && data[0].data.name ? data[0].data.name : "Không có"}
            </h4>
            <p>
              {data[0] && data[0].data.name
                ? data[0].data.id
                : "Vị trí chưa thêm cảm biến"}
            </p>
          </div>
        );
      },
    },
    sizeRatio: 0.5,
    color: ["#141414", "#141414", "#141414", "#164c7e"],
  };
  return <Heatmap {...config} onReady={mapOnReady} {...props} />;
};

export default SensorsMap;
