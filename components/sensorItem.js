import React from "react";
import { Card, Typography, Tag, Space, Menu, Dropdown, Button } from "antd";
import Icon, {
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  EllipsisOutlined,
  ToolOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import SimpleChart from "../components/simpleChart";
import { useSelector } from "react-redux";

const { Text } = Typography;
const { Meta } = Card;
import SensorIcon from "../public/assets/icons/006-sensor.svg";
import TemperatureIcon from "../public/assets/icons/019-temperature.svg";
import HumidityIcon from "../public/assets/icons/015-humidifier.svg";
import LightIcon from "../public/assets/icons/007-light.svg";

export default function SensorItem(props) {
  const data = useSelector((state) => state.data);
  const [dataTemp, setDataTemp] = React.useState([]);
  const [dataHumi, setDataHumi] = React.useState([]);
  React.useEffect(() => {
    if (data) {
      let coppySerial = data.environments.temperature.serial.filter(
        (serial) => serial.hardware_id === props.sensorId
      );
      let coppySerial2 = data.environments.humidity.serial.filter(
        (serial) => serial.hardware_id === props.sensorId
      );
      if (coppySerial[0]) {
        setDataTemp(coppySerial[0].data);
      }
      if (coppySerial2[0]) {
        setDataHumi(coppySerial2[0].data);
      }
    }
  }, [data, props.sensorId]);

  const IconText = (props) => (
    <Space>
      <Icon style={{ fontSize: "1.2em" }} component={props.icon} />
      {props.text}
    </Space>
  );
  const cover = {
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
      name: "Lỗi",
      icon: <CloseCircleOutlined />,
      color: "#d32029",
    },
  };
  return (
    <Card
      hoverable
      title={props.name}
      type="inner"
      extra={
        <Space>
          <Tag icon={cover[props.status].icon} color={cover[props.status].type}>
            {cover[props.status].name}
          </Tag>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item icon={<ToolOutlined />}>Chỉnh sửa</Menu.Item>
                <Menu.Item icon={<DeleteOutlined />} danger>
                  Xóa
                </Menu.Item>
              </Menu>
            }
          >
            <EllipsisOutlined rotate={90} />
          </Dropdown>
        </Space>
      }
      actions={[
        <IconText
          icon={TemperatureIcon}
          text={
            dataTemp.length > 0
              ? dataTemp[dataTemp.length - 1].y + " °C"
              : "NaN"
          }
          key="list-vertical-star-o"
        />,
        <IconText
          icon={HumidityIcon}
          text={
            dataHumi.length > 0 ? dataHumi[dataHumi.length - 1].y + " %" : "NaN"
          }
          key="list-vertical-like-o"
        />,
        <IconText
          icon={LightIcon}
          text="NaN lux"
          key="list-vertical-message"
        />,
      ]}
    >
      <Meta
        avatar={
          <Tag
            style={{ padding: 8, borderRadius: 10 }}
            icon={
              <Icon
                component={(props) => (
                  <SensorIcon {...props} width={64} height={64} />
                )}
              />
            }
            color={cover[props.status].type}
          ></Tag>
        }
        title={"ID: " + props.sensorId}
        description={
          <Space direction="vertical">
            <Text type="secondary">Loại cảm biến: {props.type}</Text>
            <Text type="secondary">Tín hiệu cuối: {props.lastUpdate}</Text>
          </Space>
        }
      />

      <SimpleChart colors={[cover[props.status].color]} data={dataTemp} />
    </Card>
  );
}
