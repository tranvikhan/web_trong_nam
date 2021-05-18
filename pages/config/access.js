import React from "react";
import Head from "next/head";
import Image from "next/image";
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

import { PlusOutlined } from "@ant-design/icons";
const { Text } = Typography;
const { Meta } = Card;
const { TabPane } = Tabs;

export default function SensorListView() {
  const tabList = [
    {
      key: "All",
      tab: "Tất cả",
    },
    {
      key: "Owner",
      tab: "Chủ sở hữu",
    },
    {
      key: "Manager",
      tab: "Người quản lý",
    },
    {
      key: "Viewer",
      tab: "Người xem",
    },
  ];
  const [tabActive, setTabActive] = React.useState("All");

  return (
    <>
      <Head>
        <title>Truy cập</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Card
        title="Quyền truy cập"
        subTitle="8/8 người"
        bordered={false}
        extra={[<Button icon={<PlusOutlined />}>Thêm người truy cập</Button>]}
        tabList={tabList}
        activeTabKey={tabActive}
        onTabChange={(key) => {
          setTabActive(key);
        }}
      >
        <Row gutter={[24, 24]}>
          <Col lg={6} md={12} sm={24}>
            <Card
              type="inner"
              hoverable
              cover={<img alt="example" src="/assets/image/avatar/300_9.jpg" />}
            >
              <Meta title="Trần Vi Khan" description="tranvikhan@gmail.com" />
              <Meta description="Chủ sở hữu" style={{ marginTop: 10 }} />
            </Card>
          </Col>

          <Col lg={6} md={12} sm={24}>
            <Card
              hoverable
              type="inner"
              cover={<img src="/assets/image/avatar/300_1.jpg" />}
            >
              <Meta
                title="Dương Ý Nguyện"
                description="nguyenduong@gmail.com"
              />
              <Meta description="Người quản lý" style={{ marginTop: 10 }} />
            </Card>
          </Col>

          <Col lg={6} md={12} sm={24}>
            <Card
              hoverable
              type="inner"
              cover={<img src="/assets/image/avatar/300_24.jpg" />}
            >
              <Meta
                title="Nguyễn Quốc Toàn"
                description="quoctoan99@gmail.com"
              />
              <Meta description="Người xem" style={{ marginTop: 10 }} />
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
}
