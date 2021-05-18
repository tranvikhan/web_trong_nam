import Head from "next/head";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Form,
  Input,
  Space,
  InputNumber,
  Result,
  Select,
  Modal,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
const { Text } = Typography;
const { TextArea } = Input;
import React, { useState, useEffect } from "react";
import SensorsMap from "../../components/sensorsMap";

export default function GardenInfo() {
  const user = useSelector((state) => state.user);
  const access = useSelector((state) => state.access);
  const house = useSelector((state) => state.house);

  React.useEffect(() => {
    let current = house.db.filter((hr) => hr._id === house.current);
    if (current[0]) {
      console.log({
        ...formData,
        _id: current[0]._id,
        name: current[0].name,
        description: current[0].description,
        size_x: current[0].size.x,
        size_y: current[0].size.y,
      });
      onFormChange({
        name: "Nhà trồng nấm A",
        description: "Tỉnh Hậu Giang",
        size_x: 20,
        size_y: 10,
      });
    }
  }, [house]);

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState(false);

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const [form1] = Form.useForm();
  const [formData, setFormData] = useState({
    _id: 1,
    name: "A",
    description: "SAS",
    size_x: 20,
    size_y: 10,
  });

  const onFormChange = (value) => {
    setFormData({ ...formData, ...value });
  };
  const handelFinish1 = () => {
    console.log(formData);
  };

  const [visibleSensorInMap, setVisibleSensorInMap] = useState(false);
  const handlerToggleSensorInMap = () => {
    setVisibleSensorInMap(!visibleSensorInMap);
  };
  const [modeAdd, setModeAdd] = useState(false);

  return (
    <>
      <Head>
        <title>Cấu hình thông tin nhà trồng</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Cấu hình thông tin vườn" bordered={false}>
            <Row gutter={[16, 16]}>
              <Col lg={8} md={24}>
                <Result
                  status="success"
                  title="Tuyệt vời!"
                  subTitle="Vườn trồng của bạn đã đầy đủ thông tin cấu hình"
                />
              </Col>
              <Col lg={16} md={24}>
                <Form
                  form={form1}
                  layout="vertical"
                  initialValues={formData}
                  onFinish={handelFinish1}
                  onValuesChange={onFormChange}
                >
                  <Form.Item label="Mã nhà trồng" name="_id">
                    <Input placeholder="0001" disabled />
                  </Form.Item>
                  <Form.Item label="Tên nhà trồng" name="name">
                    <Input placeholder="Nấm rơm" />
                  </Form.Item>
                  <Form.Item label="Mô tả" name="description">
                    <TextArea
                      placeholder="Vườn chất nấm rơm ở Hậu Giang"
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                  </Form.Item>
                  <Row gutter={[16, 16]}>
                    <Col lg={12} md={24}>
                      <Form.Item label="Chiều dài (x)" name="size_x">
                        <InputNumber
                          style={{ width: "100%" }}
                          min={1}
                          max={100}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={24}>
                      <Form.Item label="Chiều rộng (y)" name="size_y">
                        <InputNumber
                          style={{ width: "100%" }}
                          min={1}
                          max={100}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Space direction="vertical">
                    <Text type="warning">Đơn vị (m)</Text>
                    <Space style={{ textAlign: "center" }}>
                      <Form.Item>
                        <Button
                          onClick={() => {
                            form1.submit();
                          }}
                        >
                          Lưu thông tin
                        </Button>
                      </Form.Item>
                    </Space>
                  </Space>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Bố trí cảm biến" bordered={false}>
            <div
              style={{ display: "flex", width: "100%", alignItems: "center" }}
            >
              <SensorsMap
                style={{ width: "100%" }}
                onClickSell={(data) => {
                  console.log(data);
                  handlerToggleSensorInMap();
                }}
              />

              <Tag
                style={{
                  textOrientation: "mixed",
                  writingMode: "vertical-lr",
                  marginRight: 0,
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
              >
                Vị trí của cửa
              </Tag>
            </div>
          </Card>
        </Col>
      </Row>
      <Modal
        visible={visibleSensorInMap}
        title={
          modeAdd ? "Thêm cảm biến vào vị trí" : "Chỉnh sửa cảm biến của vị trí"
        }
        onOk={handlerToggleSensorInMap}
        onCancel={handlerToggleSensorInMap}
        footer={[
          <Button key="back" onClick={handlerToggleSensorInMap}>
            Hủy bỏ
          </Button>,
          !modeAdd && (
            <Button
              key="submit"
              type="danger"
              onClick={handlerToggleSensorInMap}
            >
              Xóa
            </Button>
          ),
          <Button
            key="submit"
            type="primary"
            onClick={handlerToggleSensorInMap}
          >
            {modeAdd ? "Thêm" : "Lưu"}
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
          <Row gutter={[16, 16]}>
            <Col lg={12} md={24}>
              <Form.Item label="Tọa độ x">
                <InputNumber
                  style={{ width: "100%" }}
                  disabled
                  defaultValue={10}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="Tọa độ y">
                <InputNumber
                  style={{ width: "100%" }}
                  disabled
                  defaultValue={20}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Cảm biến">
            <Select>
              <Select.Option value="SR0001">Cảm biến 1</Select.Option>
              <Select.Option value="SR0002">Cảm biến 2</Select.Option>
              <Select.Option value="SR0003">Cảm biến 3</Select.Option>
              <Select.Option value="SR0004">Cảm biến 4</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
