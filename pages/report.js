import React from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col, Typography, Tag, Table, Space } from "antd";

const columns = [
  {
    title: "Mã thiết bị",
    dataIndex: "obj_id",
    key: "obj_id",
  },
  {
    title: "Hoạt động",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Trạng thái",
    key: "value",
    dataIndex: "value",
    render: (tag) => (
      <Tag color={tag.is_on ? "green" : "red"}>{tag.is_on ? "Bật" : "Tắt"}</Tag>
    ),
  },
  {
    title: "Thời gian",
    dataIndex: "update_at",
    key: "update_at",
  },
  {
    title: "Hành động",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>Xóa</a>
      </Space>
    ),
  },
];

export default function Report() {
  const [data, setData] = React.useState([]);
  const report = useSelector((state) => state.report);
  const house = useSelector((state) => state.house);
  React.useEffect(() => {
    if (house.current) {
      let newData = report.db
        .filter((rp) => rp.ref === "Device" && rp.house === house.current)
        .reverse();

      setData([...newData]);
    }
  }, [report.db, house.current]);

  return (
    <>
      <Head>
        <title>Giám sát</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Báo cáo" bordered={false}>
            <Table columns={columns} dataSource={data} />
          </Card>
        </Col>
      </Row>
    </>
  );
}
