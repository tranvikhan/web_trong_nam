import React from "react";
import Head from "next/head";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  PageHeader,
  Descriptions,
  Tabs,
  Space,
  Radio,
  Form,
  Input,
  Modal,
  InputNumber,
  Dropdown,
  Menu,
  TreeSelect,
  Select,
  Result,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import Icon, {
  PlusOutlined,
  ToolOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import DeviceStatus from "../../components/deviceStatus";
import SensorItemConfig from "../../components/sensorItemConfig";
import FanIcon from "../../public/assets/icons/043-fan.svg";
import AirIcon from "../../public/assets/icons/015-humidifier.svg";
import HeaterIcon from "../../public/assets/icons/025-heater.svg";
import RouterIcon from "../../public/assets/icons/042-router.svg";

const { Meta } = Card;
const { TabPane } = Tabs;
const { Text, Title } = Typography;
const { TextArea } = Input;
export default function Devices() {
  const season = useSelector((state) => state.season);
  const house = useSelector((state) => state.house);
  const data = useSelector((state) => state.data);
  const router = useSelector((state) => state.router);
  const sensor = useSelector((state) => state.sensor);
  const device = useSelector((state) => state.device);

  const [showRouter, setShowRouter] = React.useState(false);
  const [currentSeason, setCurrentSeason] = React.useState(null);
  React.useEffect(() => {
    let tmp = season.db.filter(
      (ss) => ss.house === house.current && ss.is_active
    );
    if (tmp[0]) {
      setCurrentSeason(tmp[0]);
    }
  }, [season, house.current]);
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

  const [time, setTime] = React.useState("");
  const [keyView, setKeyView] = React.useState("sensor");
  React.useEffect(() => {
    let interval = setInterval(() => {
      let str = new Date().toLocaleTimeString();
      setTime(str);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const [visibleNSensor, setVisibleNSensor] = React.useState(false);
  const handlerToggleNSensor = () => {
    setVisibleNSensor(!visibleNSensor);
  };
  const [visibleNDevice, setVisibleNDevice] = React.useState(false);
  const handlerToggleNDevice = () => {
    setVisibleNDevice(!visibleNDevice);
  };
  const [visibleNRouter, setVisibleNRouter] = React.useState(false);
  const handlerToggleNRouter = () => {
    setVisibleNRouter(!visibleNRouter);
  };

  const [threeValue, setThreeValue] = React.useState(["temperature-high"]);
  const handleChangeThree = (value) => {
    console.log(value);
    setThreeValue(value);
  };

  const [collapsed, setCollapsed] = React.useState(false);
  const [form] = Form.useForm();

  const [requiredMark, setRequiredMarkType] = React.useState(false);

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  const onCollapse = () => {
    console.log(collapsed);
    setCollapsed(!collapsed);
  };
  const mapDV = {
    DV1: "temperature-high",
    DV2: "temperature-low",
    DV3: "humidity-low",
    DV4: "humidity-high",
  };

  const contentView = {
    sensor: (
      <>
        {currentSensors(house, router, sensor).map((sensor) => (
          <Col lg={8} md={12} sm={24}>
            <SensorItemConfig
              sensorId={sensor.hardware_id}
              name={sensor.name}
              type="ESP8266"
              status={sensor.is_on ? "on" : "off"}
              lastUpdate={sensor.update_at}
            />
          </Col>
        ))}

        <Col lg={8} md={12} sm={24}>
          <Button
            block
            onClick={handlerToggleNSensor}
            icon={<PlusOutlined />}
            style={{ height: "100%", minHeight: 50 }}
            type="dashed"
          >
            Th??m c???m bi???n
          </Button>
        </Col>
      </>
    ),

    deviceH: (
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

        <Col lg={8} md={12} sm={24}>
          <Button
            block
            onClick={handlerToggleNDevice}
            icon={<PlusOutlined />}
            style={{ height: "100%", minHeight: 50 }}
            type="dashed"
          >
            Th??m thi???t b???
          </Button>
        </Col>
      </>
    ),
  };

  const [routerStatus, setRouterStatus] = React.useState("on");
  const cover = {
    on: {
      type: "success",
      name: "Ho???t ?????ng",
      icon: <SyncOutlined spin />,
      color: "#49aa19",
    },
    low: {
      type: "warning",
      name: "Pin y???u",
      icon: <ExclamationCircleOutlined />,
      color: "#d89614",
    },
    off: {
      type: "error",
      name: "L???i",
      icon: <CloseCircleOutlined />,
      color: "#d32029",
    },
    disconnect: {
      type: "error",
      name: "L???i",
      icon: <CloseCircleOutlined />,
      color: "#d32029",
    },
    connect: {
      type: "processing",
      name: "Ho???t ?????ng",
      icon: <ApiOutlined />,
      color: "#49aa19",
    },
  };
  const tabList = [
    {
      key: "sensor",
      tab: "C???m bi???n",
    },
    {
      key: "deviceH",
      tab: "Thi???t b??? ??i???u ch???nh m??i tr?????ng",
    },
  ];

  return (
    <>
      <Modal
        visible={visibleNSensor}
        title="Th??m c???m bi???n m???i"
        onOk={handlerToggleNSensor}
        onCancel={handlerToggleNSensor}
        footer={[
          <Button key="back" onClick={handlerToggleNSensor}>
            H???y b???
          </Button>,
          <Button key="submit" type="primary" onClick={handlerToggleNSensor}>
            Th??m
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={requiredMark}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
        >
          <Form.Item label="M?? c???m bi???n">
            <Input placeholder="0001" />
          </Form.Item>
          <Form.Item label="M?? k??ch ho???t">
            <Input placeholder="0001-XADF-HLZ-ACS" />
          </Form.Item>
          <Form.Item label="T??n c???m bi???n">
            <Input placeholder="C???m bi???n a" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={visibleNRouter}
        title="Th??m b??? x??? l?? trung t??m m???i"
        onOk={handlerToggleNRouter}
        onCancel={handlerToggleNRouter}
        footer={[
          <Button key="back" onClick={handlerToggleNRouter}>
            H???y b???
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              setShowRouter(true);
              handlerToggleNRouter();
            }}
          >
            Th??m
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={requiredMark}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
        >
          <Form.Item label="M?? b??? x??? l??">
            <Input placeholder="0001" />
          </Form.Item>
          <Form.Item label="M?? k??ch ho???t">
            <Input placeholder="0001-XADF-HLZ-ACS" />
          </Form.Item>
          <Form.Item label="T??n b??? x??? l??">
            <Input placeholder="Raspberry Pi 3+" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={visibleNDevice}
        title="Th??m thi???t b??? ??i???u ch???nh m??i tr?????ng"
        onOk={handlerToggleNDevice}
        onCancel={handlerToggleNDevice}
        footer={[
          <Button key="back" onClick={handlerToggleNDevice}>
            H???y b???
          </Button>,
          <Button key="submit" type="primary" onClick={handlerToggleNDevice}>
            Th??m
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={requiredMark}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
        >
          <Form.Item label="T??n thi???t b???">
            <Input placeholder="Thi???t b???" />
          </Form.Item>
          <Form.Item label="M?? t???">
            <TextArea
              placeholder="Nh???p n???i dung m?? t??? ??? ????y"
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>
          <Form.Item label="Lo???i thi???t b???">
            <Select>
              <Select.Option value="DV1">Qu???t th??ng gi??</Select.Option>
              <Select.Option value="DV2">Qu???t s?????i</Select.Option>
              <Select.Option value="DV3">M??y phun s????ng</Select.Option>
              <Select.Option value="DV4">M??y h??t ???m</Select.Option>
              <Select.Option value="DV5">????n qu???nh quang</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="C???ng k???t n???i">
            <Select>
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
              <Select.Option value="4">4</Select.Option>
              <Select.Option value="5">5</Select.Option>
              <Select.Option value="6">6</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Thi???t b??? ???????c b???t khi">
            <TreeSelect
              treeData={treeData}
              value={threeValue}
              onChange={handleChangeThree}
              treeCheckable={true}
              showCheckedStrategy={TreeSelect.SHOW_CHILD}
              placeholder={"Please select"}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Head>
        <title>Ph???n c???ng</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Row gutter={[16, 16]}>
        <Col sm={24}>
          <Card
            title="B??? x??? l?? trung t??m"
            bordered={false}
            extra={
              router && [
                <Tag
                  icon={cover[routerStatus].icon}
                  color={cover[routerStatus].type}
                >
                  {cover[routerStatus].name}
                </Tag>,
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item icon={<ToolOutlined />}>Ch???nh s???a</Menu.Item>
                      <Menu.Item
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => setShowRouter(false)}
                      >
                        X??a
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <EllipsisOutlined rotate={90} />
                </Dropdown>,
              ]
            }
            actions={
              showRouter && [
                <Tag
                  key="port1"
                  icon={cover["connect"].icon}
                  color={cover["connect"].type}
                >
                  C???ng 1
                </Tag>,
                <Tag
                  key="port2"
                  icon={cover["connect"].icon}
                  color={cover["connect"].type}
                >
                  C???ng 2
                </Tag>,
                <Tag
                  key="port3"
                  icon={cover["connect"].icon}
                  color={cover["connect"].type}
                >
                  C???ng 3
                </Tag>,
                <Tag
                  key="port4"
                  icon={cover["connect"].icon}
                  color={cover["connect"].type}
                >
                  C???ng 4
                </Tag>,
                <Tag
                  key="port5"
                  icon={cover["disconnect"].icon}
                  color={cover["disconnect"].type}
                >
                  C???ng 5
                </Tag>,
                <Tag
                  key="port6"
                  icon={cover["disconnect"].icon}
                  color={cover["disconnect"].type}
                >
                  C???ng 6
                </Tag>,
              ]
            }
          >
            {showRouter ? (
              <Meta
                avatar={
                  <Tag
                    style={{ padding: 8, borderRadius: 10 }}
                    icon={
                      <Icon
                        component={(props) => (
                          <RouterIcon {...props} width={64} height={64} />
                        )}
                      />
                    }
                    color={cover[routerStatus].type}
                  ></Tag>
                }
                title={"ID: " + "001"}
                description={
                  <Space direction="vertical">
                    <Text type="secondary">B??? x??? l?? trung t??m 01</Text>
                    <Text type="secondary">T??n hi???u cu???i: 10/04/2021</Text>
                  </Space>
                }
              />
            ) : (
              <Result
                status="warning"
                title="C???nh b??o!"
                subTitle="B???n ch??a th??m b??? x??? l?? trung t??m, b???m n??t b??n d?????i ????? b???t ?????u"
                extra={
                  <Button
                    onClick={handlerToggleNRouter}
                    icon={<PlusOutlined />}
                  >
                    Th??m b??? x??? l??
                  </Button>
                }
              />
            )}
          </Card>
        </Col>

        {showRouter && (
          <Col sm={24}>
            <Card
              bordered={false}
              title="Danh s??ch ph???n c???ng"
              tabList={tabList}
              activeTabKey={keyView}
              onTabChange={(key) => {
                setKeyView(key);
              }}
            >
              <Row gutter={[18, 18]}>{contentView[keyView]}</Row>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
}

const treeData = [
  {
    title: "Nhi???t ?????",
    value: "temperature",
    key: "0-0",
    children: [
      {
        title: "Nhi???t ????? cao",
        value: "temperature-high",
        key: "0-0-0",
      },
      {
        title: "Nhi???t ????? th???p",
        value: "temperature-low",
        key: "0-0-1",
      },
    ],
  },
  {
    title: "????? ???m",
    value: "humidity",
    key: "0-1",
    children: [
      {
        title: "????? ???m cao",
        value: "humidity-high",
        key: "0-1-0",
      },
      {
        title: "????? ???m th???p",
        value: "humidity-low",
        key: "0-1-1",
      },
    ],
  },
  {
    title: "??nh s??ng",
    value: "light",
    key: "0-2",
    children: [
      {
        title: "??nh s??ng cao",
        value: "light-high",
        key: "0-2-0",
      },
      {
        title: "??nh s??ng th???p",
        value: "light-low",
        key: "0-2-1",
      },
    ],
  },
];
