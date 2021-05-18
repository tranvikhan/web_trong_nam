import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Heatmap = dynamic(
  () => import("@ant-design/charts").then((mod) => mod.Heatmap),
  { ssr: false }
);

const MyHeatmap = (props) => {
  const [data, setData] = useState([]);
  const [newData,setNewData] = useState([
    {
      xField: "10",
      yField: "5",
      value: 20,
      name: "Cảm biến nhiệt độ 1",
      id: "SR0001",
    },
    {
      xField: "5",
      yField: "10",
      value: 20,
      name: "Cảm biến nhiệt độ 2",
      id: "SR0002",
    }
  ])

  useEffect(()=>{
    let fake = [];
    if(props.sensor && props.data){
      props.sensor.db.map((sr)=>{
          props.data.map(serial=>{
            if(serial.hardware_id === sr.hardware_id ){
              if(sr._id === 1){
                fake.push( {
                  xField: "10",
                  yField: "5",
                  value: serial.data.length >0 ? serial.data[serial.data.length - 1].y :0 ,
                  name: serial.name,
                  id: serial.hardware_id,
                })
              }
              if(sr._id === 2){
                fake.push(  {
                  xField: "5",
                  yField: "10",
                  value:  serial.data.length >0 ? serial.data[serial.data.length - 1].y :0 ,
                  name: serial.name,
                  id: serial.hardware_id,
                })
              }
              
            }
          })
      })
      setNewData(fake);
    }

  },[props.sensor,props.data])

  const mapOnReady = (plot) => {
    plot.on("element:click", (...args) => {
      let value = { ...args }[0].data.data;
      //props.onClickSell(value);
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
    setData(fake);
  };

  var config = {
    data: data,
    xField: "xField",
    yField: "yField",
    colorField: "value",
    shape: "circle",
    theme: "dark",
    type: "density",
    height: 394,
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
    /* color: ["#6E32C2","#1890FF","#12CCCC","#141414", "#141414", "#141414","#FF8C12","#FA541C","#F51D27" ], */
    color:
      "#6E32C2-#1890FF-#12CCCC-#80FF73-#FAFFA8-#FFC838-#FF8C12-#FA541C-#F51D27",
    annotations: [
      {
        type: "region ",
      },
    ],
    legend: {
      layout: "horizontal",
      position: "bottom",
      maxWidth: 400,
      rail: {
        size: 10,
        defaultLength: 400,
      },
    },
  };
  return (
    <Heatmap {...config} onReady={mapOnReady} data={[...data,...newData]}/>
  );
};

export default MyHeatmap;
