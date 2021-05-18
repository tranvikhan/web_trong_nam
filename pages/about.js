import React from "react";
import Head from "next/head";
import { Card, Row, Col, Typography, Tag, Button, Result } from "antd";
const { Text } = Typography;
const { Meta } = Card;
import { useRouter } from "next/router";

export default function About() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Giới thiệu</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Giới thiệu" bordered={false}>
            <Result
              title="Xin chào!"
              subTitle="Đây là phần mềm quản lý môi trường bằng công nghệ IoT"
              extra={
                <Button
                  key="console"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Bản điều khiển
                </Button>
              }
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
