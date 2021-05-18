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
import HouseItem from "../components/houseItem";
const { Text } = Typography;
const { Meta } = Card;
const { TabPane } = Tabs;

export default function Home() {
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
        <title>Tổng quan</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PageHeader
        ghost={false}
        title="Danh sách nhà trồng"
        extra={<Tag>{time}</Tag>}
        subTitle="3 nhà trồng"
        footer={
          <Tabs defaultActiveKey="all">
            <TabPane key="all" tab="Tất cả" />
            <TabPane key="on" tab="Hoạt động tốt" />
            <TabPane key="off" tab="Đang điều chỉnh môi trường" />
            <TabPane key="error" tab="Lỗi kết nối" />
          </Tabs>
        }
      ></PageHeader>
      <Row gutter={[16, 16]}>
        <Col lg={8} md={12} sm={24}>
          <HouseItem
            sensorId="0001"
            name="Nhà trồng nấm rơm"
            type="Sở hữu"
            status="on"
            lastUpdate="00:01:00 02/04/2021"
            data={{ temperature: 12.5, humidity: 20, light: 90 }}
          />
        </Col>
        <Col lg={8} md={12} sm={24}>
          <HouseItem
            sensorId="0002"
            name="Nhà trồng nấm A"
            type="Sở hữu"
            status="on"
            lastUpdate="00:01:00 02/04/2021"
            data={{ temperature: 40.5, humidity: 70, light: 90 }}
          />
        </Col>
        <Col lg={8} md={12} sm={24}>
          <HouseItem
            sensorId="0003"
            name="Nhà trồng nấm B"
            type="Được chia sẽ"
            status="low"
            lastUpdate="00:01:00 02/04/2021"
            data={{ temperature: 35.5, humidity: 60, light: 90 }}
          />
        </Col>
      </Row>
    </Space>
  );
}
