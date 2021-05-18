import React from "react";
import Head from "next/head";
import moment from "moment";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Slider,
  Form,
  Input,
  Steps,
  Space,
  DatePicker,
  InputNumber,
  Switch,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addSeason,
  removeSeason,
  updateSeason,
  addStep,
  updateStep,
  removeStep,
} from "../../redux/featrures/seasonRedux";
const { Text, Title } = Typography;
const { Step } = Steps;
const { Meta } = Card;
const { RangePicker } = DatePicker;
import { useRouter } from "next/router";

// Step Item Configuratio
const StepItem = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = React.useState("tab1");
  const router = useRouter();

  const marksT = {
    0: "0°C",
    100: {
      style: {
        color: "#d32029",
      },
      label: <strong>100°C</strong>,
    },
  };
  const marksH = {
    0: "0%",
    100: {
      style: {
        color: "#d32029",
      },
      label: <strong>100%</strong>,
    },
  };
  const marksL = {
    0: "0nit",

    1000: {
      style: {
        color: "#d32029",
      },
      label: <strong>1000nit</strong>,
    },
  };
  const handleSubmit = () => {
    form.submit();
  };

  const handleCancel = () => {
    router.push("/");
  };
  const onFinish = (values) => {
    const { temperature, humidity, light, name, day, ignored } = values;
    console.log({ temperature, humidity, light, name, day, ignored });
    dispatch(
      updateStep({
        season_id: props.season._id,
        step: {
          _id: props.data._id,
          info: {
            name: name || props.data.info.name,
            day: day || props.data.info.day,
            ignored: ignored !== undefined ? ignored : props.data.info.ignored,
          },
          environments: {
            temperature: temperature || props.data.environments.temperature,
            humidity: humidity || props.data.environments.humidity,
            light: light || props.data.environments.light,
          },
        },
      })
    );
  };

  const tabList = [
    {
      key: "tab1",
      tab: "Thông tin chung",
    },
    {
      key: "tab2",
      tab: "Nhiệt độ",
    },
    {
      key: "tab3",
      tab: "Độ ẩm",
    },
    {
      key: "tab4",
      tab: "Ánh sáng",
    },
  ];
  const contentList = {
    tab1: (
      <Row gutter={[16, 4]}>
        <Col span={12}>
          <Form.Item label="Tên giai đoạn" name="name">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Thời gian giai đoạn" name="day">
            <InputNumber
              style={{ width: "100%" }}
              min={1}
              max={500}
              formatter={(value) => `${value} ngày`}
              parser={(value) => value.replace(" ngày", "")}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Bỏ qua giai đoạn này" name="ignored">
            <Switch defaultChecked={props.data.info.ignored} />
          </Form.Item>
        </Col>
      </Row>
    ),
    tab2: (
      <Form.Item label="Nhiệt độ" name="temperature">
        <Slider
          range
          marks={marksT}
          min={0}
          max={100}
          step={0.1}
          tooltipVisible
        />
      </Form.Item>
    ),
    tab3: (
      <Form.Item label="Độ ẩm" name="humidity">
        <Slider range marks={marksH} min={0} max={100} tooltipVisible />
      </Form.Item>
    ),
    tab4: (
      <Form.Item label="Ánh sáng" name="light">
        <Slider range marks={marksL} min={0} max={1000} tooltipVisible />
      </Form.Item>
    ),
  };

  if (!props.isShow)
    return (
      <Space direction="vertical">
        <Text type="secondary" style={{ fontSize: "1.2em" }}>
          {props.data.info.name}
        </Text>
        <Space size={18}>
          <Text type="secondary">Nhiệt độ: 20.5-36.7°C</Text>
          <Text type="secondary">Độ ẩm: 20-30%</Text>
          <Text type="secondary">Cường độ ánh sáng: 500-1000 nit</Text>
        </Space>
      </Space>
    );
  return (
    <Card
      title={props.data.info.name}
      tabList={tabList}
      activeTabKey={activeTab}
      onTabChange={(key) => {
        setActiveTab(key);
      }}
    >
      <Form
        layout="vertical"
        name="basic"
        form={form}
        initialValues={{ ...props.data.environments, ...props.data.info }}
        onFinish={onFinish}
      >
        <Row gutter={8}>
          <Col span={24}>{contentList[activeTab]}</Col>
        </Row>
      </Form>
      <Space align="end">
        <Button onClick={handleSubmit}>Lưu</Button>
        <Button
          onClick={() => {
            dispatch(
              removeStep({
                season_id: props.season._id,
                step_id: props.data._id,
              })
            );
          }}
        >
          Xóa
        </Button>
      </Space>
    </Card>
  );
};

export default function Environment() {
  const dispatch = useDispatch();
  const season = useSelector((state) => state.season);
  const house = useSelector((state) => state.house);

  const [currentSeason, setCurrentSeason] = React.useState(null);
  React.useEffect(() => {
    let tmp = season.db.filter(
      (ss) => ss.house === house.current && ss.is_active
    );
    if (tmp[0]) {
      setCurrentSeason(tmp[0]);
      setCurrentStep(tmp[0].steps_active);
    }
  }, [season, house.current]);

  const [currentStep, setCurrentStep] = React.useState(1);
  const onChangeStep = (i) => {
    setCurrentStep(i);
  };

  return (
    <>
      <Head>
        <title>Thông số môi trường</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="Thông số môi trường"
            bordered={false}
            extra={
              <DatePicker
                onChange={(date) => {
                  if (currentSeason)
                    dispatch(
                      updateSeason({
                        ...currentSeason,
                        start_day: moment(date).format("YYYY-MM-DD"),
                      })
                    );
                }}
                defaultValue={moment(
                  (currentSeason && currentSeason.start_day) || "2021-04-20",
                  "YYYY-MM-DD"
                )}
                format={(value) =>
                  `Ngày bắt đầu mùa vụ: ${value.format("DD/MM/YYYY")}`
                }
              />
            }
          >
            <Steps
              percent={40}
              size="small"
              current={currentStep}
              onChange={onChangeStep}
              direction="vertical"
            >
              {currentSeason &&
                currentSeason.steps &&
                currentSeason.steps.map((st, i) => (
                  <Step
                    key={i}
                    title={`Giai đoạn ${i + 1}`}
                    subTitle={`(${st.info.day} ngày)`}
                    status={
                      st.info.ignored
                        ? "error"
                        : currentSeason && i < currentSeason.steps_active
                        ? "finish"
                        : currentSeason && i === currentSeason.steps_active
                        ? "process"
                        : "wait"
                    }
                    description={
                      <StepItem
                        data={st}
                        isShow={i === currentStep}
                        season={currentSeason}
                      />
                    }
                  />
                ))}
            </Steps>
            <Button
              type="dashed"
              block
              onClick={() => {
                if (currentSeason)
                  dispatch(addStep({ season_id: currentSeason._id }));
              }}
            >
              Thêm giai đoạn
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
}
