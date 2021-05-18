import React from "react";
import Head from "next/head";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  PageHeader,
  Space,
  Statistic,
} from "antd";
import Icon, {
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
const { Text } = Typography;
const { Meta } = Card;

import dynamic from "next/dynamic";
import { getTimeSession } from "../helper/datetimeCover";
import MyHeatmap from "../components/phanbo";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const Liquid = dynamic(
  () => import("@ant-design/charts").then((mod) => mod.Liquid),
  { ssr: false }
);
import SensorItem from "../components/sensorItem";
import DeviceStatus from "../components/deviceStatus";

const Drashboard = (props) => {
  const season = useSelector((state) => state.season);
  const house = useSelector((state) => state.house);
  const data = useSelector((state) => state.data);
  const router = useSelector((state) => state.router);
  const sensor = useSelector((state) => state.sensor);
  const device = useSelector((state) => state.device);

  const [currentSeason, setCurrentSeason] = React.useState(null);
  React.useEffect(() => {
    let tmp = season.db.filter(
      (ss) => ss.house === house.current && ss.is_active
    );
    if (tmp[0]) {
      setCurrentSeason(tmp[0]);
    }
  }, [season, house.current]);

  const lineChartConfig = {
    options: {
      chart: {
        background: "transparent",
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      theme: {
        mode: "dark",
        palette: "palette1",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "dark",
          shadeIntensity: 0.9,
        },
      },

      stroke: {
        width: 4,
        curve: "smooth",
      },
      grid: {
        show: true,
        borderColor: "rgba(0,0,0,0.3)",
        strokeDashArray: 0,
        position: "back",
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        itemMargin: {
          horizontal: 12,
          vertical: 5,
        },
      },
      xaxis: {
        type: "text",
      },

      yaxis: {
        labels: {
          show: true,
          formatter: (value) => {
            return Math.round(value * 100) / 100 + "°C";
          },
        },
        min: 25,
        max: 40,
      },

      responsive: [
        {
          breakpoint: 600,
          options: {
            chart: {
              toolbar: {
                show: false,
              },
            },
          },
        },
      ],
    },
  };
  const configLiquid = {
    percent: 0.5,
    outline: {
      border: 4,
      distance: 2,
    },
    theme: "dark",
    liquidStyle: function liquidStyle(_ref4) {
      var percent = _ref4.percent;
      return {
        fill: percent < 0.5 ? "#d89614" : "#1890ff",
        stroke: percent < 0.5 ? "#d89614" : "#1890ff",
      };
    },
    statistic: {
      content: {
        customHtml: (container, view, { percent }) => {
          const text = `<div>${(percent * 100).toFixed(0)}%</div>`;
          return text;
        },
      },
    },
    color: function color() {
      return "#1890ff";
    },
  };

  const tabList = [
    {
      key: "tab1",
      tab: "Nhiệt độ",
    },

    {
      key: "tab2",
      tab: "Phân bố nhiệt độ",
    },
    {
      key: "tab3",
      tab: "Độ ẩm",
    },
    {
      key: "tab4",
      tab: "Phân bố độ ẩm",
    },
  ];
  const contentList = {
    tab1: (
      <Chart
        options={{
          ...lineChartConfig.options,
          yaxis: {
            labels: {
              show: true,
              formatter: (value) => {
                return Math.round(value * 100) / 100 + "°C";
              },
            },
          },
          annotations: {
            yaxis: [
              {
                y: currentSeason
                  ? currentSeason.steps[currentSeason.steps_active].environments
                      .temperature[0]
                  : null,
                y2: currentSeason
                  ? currentSeason.steps[currentSeason.steps_active].environments
                      .temperature[1]
                  : null,
                borderColor: "red",
                fillColor: "#FEB019",
                opacity: 0.2,
                label: {
                  borderColor: "#333",
                  style: {
                    fontSize: "10px",
                    color: "#333",
                    background: "#FEB019",
                  },
                  text: "Nhiệt độ cho phép",
                },
              },
            ],
          },
        }}
        series={data.environments.temperature.serial || []}
        type="line"
        height={377}
      />
    ),
    tab2: (
      <MyHeatmap
        data={data.environments.temperature.serial || []}
        sensor={sensor}
      />
    ),
    tab3: (
      <Chart
        options={{
          ...lineChartConfig.options,
          yaxis: {
            min: 0,
            max: 100,
            labels: {
              show: true,
              formatter: (value) => {
                return value + "%";
              },
            },
          },
          chart: {
            background: "transparent",
            stacked: false,
          },
          annotations: {
            yaxis: [
              {
                y: currentSeason
                  ? currentSeason.steps[currentSeason.steps_active].environments
                      .humidity[0]
                  : null,
                y2: currentSeason
                  ? currentSeason.steps[currentSeason.steps_active].environments
                      .humidity[1]
                  : null,
                borderColor: "red",
                fillColor: "#FEB019",
                opacity: 0.2,
                label: {
                  borderColor: "#333",
                  style: {
                    fontSize: "10px",
                    color: "#333",
                    background: "#FEB019",
                  },
                  text: "Độ ẩm cho phép",
                },
              },
            ],
          },
        }}
        series={data.environments.humidity.serial || []}
        type="bar"
        height={377}
      />
    ),
    tab4: (
      <MyHeatmap
        data={data.environments.humidity.serial || []}
        sensor={sensor}
      />
    ),
  };
  const [activeTab, setActiveTab] = React.useState("tab1");
  const [time, setTime] = React.useState("");
  React.useEffect(() => {
    let interval = setInterval(() => {
      let str = new Date().toLocaleTimeString();
      setTime(str);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const roundNum = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  };

  const coverDevice = {
    on: {
      type: "success",
      name: "Hoạt động",
      icon: <SyncOutlined spin />,
      color: "#49aa19",
    },
    low: {
      type: "warning",
      name: "Pin yếu",
      icon: <ExclamationCircleOutlined />,
      color: "#d89614",
    },
    off: {
      type: "error",
      name: "Đăng tắt",
      icon: <CloseCircleOutlined />,
      color: "#d32029",
    },
  };
  const coverStatus = {
    hight: {
      type: "error",

      icon: <ArrowUpOutlined />,
      color: "#d32029",
    },
    normal: {
      type: "success",

      icon: <CheckOutlined />,
      color: "#49aa19",
    },
    low: {
      type: "error",

      icon: <ArrowDownOutlined />,
      color: "#d32029",
    },
  };
  const checkStatus = (range, value) => {
    if (value < range[0]) return "low";
    if (value > range[1]) return "hight";
    return "normal";
  };

  const [keyViewHardware, setKeyViewHardware] = React.useState("device");
  const tabListHardware = [
    {
      key: "sensor",
      tab: "Cảm biến",
    },
    {
      key: "device",
      tab: "Thiết bị điều chỉnh môi trường",
    },
  ];
  const currentSensors = (house, router, sensor) => {
    if (house.current) {
      let sensors = [];
      router.db.forEach((rt) => {
        if (rt.house === house.current) {
          sensor.db.forEach((sr) => {
            if (sr.router === rt._id) {
              sensors.push(sr);
            }
          });
        }
      });
      return sensors;
    }
    return [];
  };
  const currentDevices = (house, router, device) => {
    if (house.current) {
      let devices = [];
      router.db.forEach((rt) => {
        if (rt.house === house.current) {
          device.db.forEach((dv) => {
            if (dv.router === rt._id) {
              devices.push(dv);
            }
          });
        }
      });
      return devices;
    }
    return [];
  };

  const contentViewHardware = {
    sensor: (
      <>
        {currentSensors(house, router, sensor).map((sensor) => (
          <Col lg={8} md={12} sm={24}>
            <SensorItem
              sensorId={sensor.hardware_id}
              name={sensor.name}
              type="ESP8266"
              status={sensor.is_on ? "on" : "off"}
              lastUpdate={sensor.update_at}
            />
          </Col>
        ))}
      </>
    ),

    device: (
      <>
        {currentDevices(house, router, device).map((device) => (
          <Col lg={8} md={12} sm={24}>
            <DeviceStatus
              deviceId={device.hardware_id}
              name={device.name}
              type={device.type}
              port={device.port}
              lastUpdate={device.update_at}
              on_when={device.on_when}
            />
          </Col>
        ))}
      </>
    ),
  };

  return (
    <Space direction="vertical" size={16}>
      <PageHeader
        ghost={false}
        title={`Chào ${getTimeSession(new Date())}!`}
        extra={<Tag>{time}</Tag>}
      >
        <Space size={30}>
          {currentSeason && data.environments && (
            <>
              <Statistic
                title="Nhiệt độ cho phép"
                value={
                  currentSeason.steps[currentSeason.steps_active].environments
                    .temperature[0] +
                  " - " +
                  currentSeason.steps[currentSeason.steps_active].environments
                    .temperature[1]
                }
                valueStyle={{
                  color:
                    coverStatus[
                      checkStatus(
                        currentSeason.steps[currentSeason.steps_active]
                          .environments.temperature,
                        data.environments.temperature.current
                      )
                    ].color,
                  fontSize: "1.2em",
                }}
                prefix={
                  coverStatus[
                    checkStatus(
                      currentSeason.steps[currentSeason.steps_active]
                        .environments.temperature,
                      data.environments.temperature.current
                    )
                  ].icon
                }
                suffix="°C"
              />
              <Statistic
                title="Độ ẩm cho phép"
                value={
                  currentSeason.steps[currentSeason.steps_active].environments
                    .humidity[0] +
                  " - " +
                  currentSeason.steps[currentSeason.steps_active].environments
                    .humidity[1]
                }
                valueStyle={{
                  color:
                    coverStatus[
                      checkStatus(
                        currentSeason.steps[currentSeason.steps_active]
                          .environments.humidity,
                        data.environments.humidity.current
                      )
                    ].color,
                  fontSize: "1.2em",
                }}
                prefix={
                  coverStatus[
                    checkStatus(
                      currentSeason.steps[currentSeason.steps_active]
                        .environments.humidity,
                      data.environments.humidity.current
                    )
                  ].icon
                }
              />
              <Statistic
                title="Ánh sáng cho phép"
                value={
                  currentSeason.steps[currentSeason.steps_active].environments
                    .light[0] +
                  " - " +
                  currentSeason.steps[currentSeason.steps_active].environments
                    .light[1]
                }
                valueStyle={{
                  color:
                    coverStatus[
                      checkStatus(
                        currentSeason.steps[currentSeason.steps_active]
                          .environments.light,
                        data.environments.light.current
                      )
                    ].color,
                  fontSize: "1.2em",
                }}
                prefix={
                  coverStatus[
                    checkStatus(
                      currentSeason.steps[currentSeason.steps_active]
                        .environments.light,
                      data.environments.light.current
                    )
                  ].icon
                }
              />
            </>
          )}
        </Space>
      </PageHeader>
      <Head>
        <title>Giám sát</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Row gutter={[16, 16]}>
        <Col lg={18} md={24}>
          <Card
            title="Biểu đồ"
            bordered={false}
            tabList={tabList}
            activeTabKey={activeTab}
            onTabChange={(key) => {
              setActiveTab(key);
            }}
          >
            {contentList[activeTab]}
          </Card>
        </Col>
        <Col lg={6} md={24}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Nhiệt độ trung bình" bordered={false}>
                <div className="TemperatureContainer">
                  <Text className="TemperatureNum">
                    {data.environments.temperature.current &&
                      roundNum(data.environments.temperature.current, 1)}
                  </Text>
                  <Text type="secondary" className="TemperatureC">
                    °C
                  </Text>
                </div>
              </Card>
            </Col>

            <Col span={24}>
              <Card title="Độ ẩm trung bình" bordered={false}>
                <div style={{ height: 180, paddingX: 20 }}>
                  <Liquid
                    {...configLiquid}
                    percent={data.environments.humidity.current / 100}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col sm={24}>
          <Card
            bordered={false}
            title="Giám sát phần cứng"
            tabList={tabListHardware}
            activeTabKey={keyViewHardware}
            onTabChange={(key) => {
              setKeyViewHardware(key);
            }}
          >
            <Row gutter={[18, 18]}>{contentViewHardware[keyViewHardware]}</Row>
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default Drashboard;
