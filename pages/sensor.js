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
} from "antd";
import SensorItem from "../components/sensorItem";
const { Text } = Typography;
const { Meta } = Card;
const { TabPane } = Tabs;

export default function SensorListView() {
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
  return (
    <Space direction="vertical" size={16}>
      <Head>
        <title>Cảm biến</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PageHeader
        ghost={false}
        title="Danh sách cảm biến"
        extra={<Tag>{time}</Tag>}
        subTitle="9/9 cảm biến"
        footer={
          <Tabs defaultActiveKey="all">
            <TabPane key="all" tab="Tất cả" />
            <TabPane key="on" tab="Đang chạy" />
            <TabPane key="off" tab="Pin yếu" />
            <TabPane key="error" tab="Lỗi" />
          </Tabs>
        }
      ></PageHeader>
      <Row gutter={[16, 16]}>
        <Col lg={8} md={12} sm={24}>
          <SensorItem
            sensorId="0001"
            name="Cảm biến 1"
            type="esp"
            status="on"
            lastUpdate="00:01:00 02/04/2021"
            data={{ temperature: 12.5, humidity: 20, light: 90 }}
          />
        </Col>
        <Col lg={8} md={12} sm={24}>
          <SensorItem
            sensorId="0001"
            name="Cảm biến 1"
            type="esp"
            status="on"
            lastUpdate="00:01:00 02/04/2021"
            data={{ temperature: 12.5, humidity: 20, light: 90 }}
          />
        </Col>
        <Col lg={8} md={12} sm={24}>
          <SensorItem
            sensorId="0001"
            name="Cảm biến 1"
            type="esp"
            status="low"
            lastUpdate="00:01:00 02/04/2021"
            data={{ temperature: 12.5, humidity: 20, light: 90 }}
          />
        </Col>
        <Col lg={8} md={12} sm={24}>
          <SensorItem
            sensorId="0001"
            name="Cảm biến 1"
            type="esp"
            status="low"
            lastUpdate="00:01:00 02/04/2021"
            data={{ temperature: 12.5, humidity: 20, light: 90 }}
          />
        </Col>

        <Col lg={8} md={12} sm={24}>
          <SensorItem
            sensorId="0001"
            name="Cảm biến 1"
            type="esp"
            status="low"
            lastUpdate="00:01:00 02/04/2021"
            data={{ temperature: 12.5, humidity: 20, light: 90 }}
          />
        </Col>
        <Col lg={8} md={12} sm={24}>
          <SensorItem
            sensorId="0001"
            name="Cảm biến 1"
            type="esp"
            status="off"
            lastUpdate="00:01:00 02/04/2021"
            data={{ temperature: 12.5, humidity: 20, light: 90 }}
          />
        </Col>
        <Col lg={8} md={12} sm={24}>
          <SensorItem
            sensorId="0001"
            name="Cảm biến 1"
            type="esp"
            status="off"
            lastUpdate="00:01:00 02/04/2021"
            data={{ temperature: 12.5, humidity: 20, light: 90 }}
          />
        </Col>
        <Col lg={8} md={12} sm={24}>
          <SensorItem
            sensorId="0001"
            name="Cảm biến 1"
            type="esp"
            status="on"
            lastUpdate="00:01:00 02/04/2021"
            data={{ temperature: 12.5, humidity: 20, light: 90 }}
          />
        </Col>
      </Row>
    </Space>
  );
}
