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
import Link from "next/link";

const { Text } = Typography;
const { Meta } = Card;
import SensorIcon from "../public/assets/icons/003-garage.svg";
import TemperatureIcon from "../public/assets/icons/019-temperature.svg";
import HumidityIcon from "../public/assets/icons/015-humidifier.svg";
import LightIcon from "../public/assets/icons/007-light.svg";

export default function HouseItem(props) {
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
      name: "Điều chỉnh",
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
    <Link href="/drashboard">
      <Card
        hoverable
        title={props.name}
        type="inner"
        extra={
          <Space>
            <Tag
              icon={cover[props.status].icon}
              color={cover[props.status].type}
            >
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
            text={props.data.temperature + " °C"}
            key="list-vertical-star-o"
          />,
          <IconText
            icon={HumidityIcon}
            text={props.data.temperature + " %"}
            key="list-vertical-like-o"
          />,
          <IconText
            icon={LightIcon}
            text={props.data.light + " lux"}
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
      </Card>
    </Link>
  );
}
