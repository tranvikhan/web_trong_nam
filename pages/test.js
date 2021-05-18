import React from "react";
import { Space, Card, Row, Col, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { CodeOutlined } from "@ant-design/icons";

const { Text } = Typography;
const Mqtt = (props) => {
  const messagesEndRef = React.useRef(null);
  const mqtt = useSelector((state) => state.mqtt);
  const [log, setLog] = React.useState([]);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
    console.log(mqtt.datas);
    if (mqtt.datas) setLog((log) => [...log, mqtt.datas]);
  }, [mqtt.datas]);
  return (
    <Row>
      <Col span={24}>
        <Card
          title={
            <Text>
              <CodeOutlined /> Console
            </Text>
          }
          bordered={false}
        >
          <div style={{ height: 400, overflowY: "auto" }}>
            <Space direction="vertical">
              {log.map((d, i) => (
                <Text code key={i}>
                  {d.topic}: {`${JSON.stringify(d.message, null, 4)}`}
                </Text>
              ))}
              <div ref={messagesEndRef} />
            </Space>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Mqtt;
