import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import React from "react";

import Image from "next/image";
import {
  Layout,
  Menu,
  Select,
  Avatar,
  Dropdown,
  Row,
  Col,
  Typography,
  Divider,
  Button,
  Badge,
  Popover,
  Space,
  Alert,
  Form,
  Input,
  Modal,
  InputNumber,
} from "antd";
const { Text, Title } = Typography;
const { TextArea } = Input;

import {
  DesktopOutlined,
  PieChartOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  BellOutlined,
  PlusOutlined,
  CodeOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { Option, OptGroup } = Select;
const { SubMenu } = Menu;

function MainLayout({ children }) {
  const user = useSelector((state) => state.user);
  const access = useSelector((state) => state.access);
  const house = useSelector((state) => state.house);

  const [collapsed, setCollapsed] = React.useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = React.useState({
    name: "Nhà trồng nấm",
    description: "Tỉnh Hậu Giang",
    size_x: 20,
    size_y: 10,
  });

  const onFormChange = (value) => {
    setFormData({ ...formData, ...value });
  };
  const handlerSubmit = () => {
    console.log(formData);
    handlerToggleNew();
  };
  const router = useRouter();

  const onCollapse = () => {
    console.log(collapsed);
    setCollapsed(!collapsed);
  };
  const [visibleModalNew, setVisibleModalNew] = React.useState(false);
  const handlerToggleNew = () => {
    setVisibleModalNew(!visibleModalNew);
  };

  const menuUser = (
    <Menu>
      <div style={{ padding: 10 }}>
        <Title level={5}>Trần Vi Khan</Title>
        <Text>tranvikhan@gmail.com</Text>
        <Divider style={{ marginTop: 16, marginBottom: 0 }} />
      </div>
      <Menu.Item icon={<InfoCircleOutlined />}>Thông tin</Menu.Item>
      <Menu.Item icon={<CodeOutlined />}>
        <Link href="/test">Console</Link>
      </Menu.Item>
      <Menu.Item danger icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  const contentNotification = (
    <Space direction="vertical">
      <Space
        direction="vertical"
        style={{ width: 350, height: 400, overflowY: "auto" }}
      >
        <Alert
          message="Success Tips"
          description="Detailed description and advice about successful copywriting."
          type="success"
          showIcon
          closable
        />
        <Alert
          message="Thông báo"
          description="Quạt phun sương đã tắt"
          type="info"
          showIcon
          closable
        />
        <Alert
          message="Thông báo"
          description="Quạt phun sương đã bật"
          type="warning"
          showIcon
          closable
        />
        <Alert
          message="Cảnh báo"
          description="Nhiệt độ cao hơn nhiệt độ cho phép"
          type="error"
          showIcon
          closable
        />
        <Alert
          message="Lời mời cộng tác"
          description="Vi Khan mời bạn cùng quản lý kho 'Nấm rơm 5' lúc 15:30:20 01/04/2021"
          type="info"
          action={
            <Space direction="vertical">
              <Button size="small" block type="primary">
                Chấp nhận
              </Button>
              <Button size="small" block danger type="ghost">
                Từ chối
              </Button>
            </Space>
          }
          closable
        />
      </Space>
      <Button block type="link" danger>
        Xóa tất cả
      </Button>
    </Space>
  );

  return (
    <>
      <Modal
        visible={visibleModalNew}
        title="Tạo nhà trồng mới"
        onCancel={handlerToggleNew}
        footer={[
          <Button key="back" onClick={handlerToggleNew}>
            Hủy bỏ
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              form.submit();
            }}
          >
            Tạo
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ ...formData }}
          onFinish={handlerSubmit}
          onValuesChange={onFormChange}
        >
          <Form.Item label="Tên nhà trồng" name="name">
            <Input placeholder="Nhập tên" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <TextArea
              placeholder="Nhập nội dung mô tả ở đây"
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col lg={12} md={24}>
              <Form.Item label="Chiều dài (x)" name="size_x">
                <InputNumber style={{ width: "100%" }} min={1} max={500} />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="Chiều rộng (y)" name="size_y">
                <InputNumber style={{ width: "100%" }} min={1} max={500} />
              </Form.Item>
            </Col>
          </Row>
          <Text type="warning">Đơn vị (m)</Text>
        </Form>
      </Modal>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          className="site-layout-background"
        >
          <div className="logo">
            <Link href="/">
              <Image
                src="/assets/image/logoBlue.png"
                alt="Picture of the author"
                height={80}
                width={100}
                layout="intrinsic"
              />
            </Link>
          </div>
          <Menu
            theme="dark"
            selectedKeys={[router.pathname]}
            defaultSelectedKeys={[router.pathname]}
            mode="inline"
          >
            <Menu.Item key="/drashboard" icon={<PieChartOutlined />}>
              <Link href="/drashboard">Giám sát</Link>
            </Menu.Item>
            <Menu.Item key="/report" icon={<DesktopOutlined />}>
              <Link href="/report"> Báo cáo </Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<SettingOutlined />} title="Cấu hình">
              <Menu.Item key="/config/info">
                <Link href="/config/info">Nhà trồng</Link>
              </Menu.Item>
              <Menu.Item key="/config/hardware">
                <Link href="/config/hardware">Phần cứng</Link>
              </Menu.Item>
              <Menu.Item key="/config/access">
                <Link href="/config/access">Người truy cập</Link>
              </Menu.Item>
              <Menu.Item key="/config/environment">
                <Link href="/config/environment">Thông số môi trường</Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="/about" icon={<QuestionCircleOutlined />}>
              <Link href="/about"> Giới thiệu</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-header">
            <Row>
              <Col span={12}>
                <Select
                  defaultValue={house.current}
                  style={{ width: 200 }}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "4px 0" }} />
                      <Button
                        type="link"
                        onClick={handlerToggleNew}
                        icon={<PlusOutlined />}
                      >
                        Tạo vườn trồng mới
                      </Button>
                    </>
                  )}
                >
                  <OptGroup label="Vườn của tôi">
                    {access.db.map((ac) => {
                      if (
                        ac.user === user.active &&
                        ac.role === "Owner" &&
                        ac.accepted
                      ) {
                        return house.db.map(
                          (hr) =>
                            hr._id === ac.house && (
                              <Option value={hr._id}>{hr.name}</Option>
                            )
                        );
                      }
                    })}
                  </OptGroup>
                  <OptGroup label="Vườn được chia sẽ">
                    {access.db.map((ac) => {
                      if (
                        ac.user === user.active &&
                        ac.role != "Owner" &&
                        ac.accepted
                      ) {
                        return house.db.map(
                          (hr) =>
                            hr._id === ac.house && (
                              <Option value={hr._id}>{hr.name}</Option>
                            )
                        );
                      }
                    })}
                  </OptGroup>
                </Select>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Space size="middle">
                  <Popover
                    title="Thông báo"
                    content={contentNotification}
                    trigger="click"
                  >
                    <Badge count={1}>
                      <Button shape="circle" icon={<BellOutlined />} />
                    </Badge>
                  </Popover>
                  <Dropdown overlay={menuUser}>
                    <Avatar
                      style={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ cursor: "pointer" }}>K</span>
                    </Avatar>
                  </Dropdown>
                </Space>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: "16px" }}>{children}</Content>
          <Footer style={{ textAlign: "center" }}>
            <Text type="secondary">CUSC SOFTWARE ©2021 Created by Vi Khan</Text>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default MainLayout;
