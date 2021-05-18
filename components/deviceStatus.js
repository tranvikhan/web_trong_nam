import React from "react";
import { Card, Typography, Tag, Space, Menu, Dropdown, Button } from "antd";
import Icon, {
  SyncOutlined,
  CloseCircleOutlined,
  EllipsisOutlined,
  ToolOutlined,
  DeleteOutlined,
  SettingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

const { Text } = Typography;
const { Meta } = Card;
import FanIcon from "../public/assets/icons/043-fan.svg";
import AirIcon from "../public/assets/icons/015-humidifier.svg";
import HeaterIcon from "../public/assets/icons/025-heater.svg";
import QuatHutAm from "../public/assets/icons/039-air purifier.svg";

export default function DeviceStatus(props) {
  const house = useSelector((state) => state.house);
  const device = useSelector((state) => state.device);
  const season = useSelector((state) => state.season);
  const data = useSelector((state) => state.data);
  const [currentSeason, setCurrentSeason] = React.useState(null);
  const [status, setStatus] = React.useState("off");

  React.useEffect(() => {
    let tmp = season.db.filter(
      (ss) => ss.house === house.current && ss.is_active
    );
    if (tmp[0]) {
      setCurrentSeason(tmp[0]);
    }
  }, [season, house.current]);
  const cover = {
    on: {
      type: "success",
      name: "Bật",
      icon: <SyncOutlined spin />,
      color: "#49aa19",
    },
    off: {
      type: "error",
      name: "Đang tắt",
      icon: <CloseCircleOutlined />,
      color: "#d32029",
    },
  };
  const checkStatus = (range, value) => {
    if (value < range[0]) return "low";
    if (value > range[1]) return "high";
    return "normal";
  };
  React.useEffect(() => {
    if (currentSeason) {
      let checkTemperature = checkStatus(
        currentSeason.steps[currentSeason.steps_active].environments
          .temperature,
        data.environments.temperature.current
      );
      let checkHumidity = checkStatus(
        currentSeason.steps[currentSeason.steps_active].environments.humidity,
        data.environments.humidity.current
      );
      props.on_when.map((action) => {
        if (action === "temperature-high" && checkTemperature === "high") {
          setStatus("on");
        } else if (action === "temperature-low" && checkTemperature === "low") {
          setStatus("on");
        } else if (action === "humidity-high" && checkHumidity === "high") {
          setStatus("on");
        } else if (action === "humidity-low" && checkHumidity === "low") {
          setStatus("on");
        } else {
          setStatus("off");
        }
      });
    }
  }, [data, house, currentSeason, props.on_when]);

  return (
    <Card
      type="inner"
      hoverable
      title={props.name}
      extra={
        <Space>
          <Tag icon={cover[status].icon} color={cover[status].type}>
            {cover[status].name}
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
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <DeleteOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={
          <Tag
            style={{ padding: 8, borderRadius: 10 }}
            icon={
              props.type === "DV1" ? (
                <Icon
                  component={(p) => <FanIcon {...p} width={64} height={64} />}
                />
              ) : props.type === "DV2" ? (
                <Icon
                  component={(p) => (
                    <HeaterIcon {...p} width={64} height={64} />
                  )}
                />
              ) : props.type === "DV3" ? (
                <Icon
                  component={(p) => <AirIcon {...p} width={64} height={64} />}
                />
              ) : (
                <Icon
                  component={(p) => <QuatHutAm {...p} width={64} height={64} />}
                />
              )
            }
            color={cover[status].type}
          ></Tag>
        }
        title={"ID: " + props.deviceId}
        description={
          <Space direction="vertical">
            <Text type="secondary">Cổng: {props.port}</Text>
            <Text type="secondary">Tín hiệu cuối: {props.lastUpdate}</Text>
          </Space>
        }
      />
    </Card>
  );
}
