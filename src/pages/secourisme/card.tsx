import { useState } from "react";
import { Card, Avatar, Row, Col, Typography, Modal, Form, Input } from "antd";
import MyIcon from "@/components/icon";
import "./index.less";

const list = [
  {
    img: "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
    title: "Ant Design",
    description:
      "",
  },
];

const { Meta } = Card;
const dRules = [
  {
    required: true,
    message: "Please input your description!",
  },
  {
    min: 50,
    message: "The description must be more than 50 words!",
  },
];
const tRules = [
  {
    required: true,
    message: "Please input your title!",
  },
];
const iRules = [
  {
    required: true,
    message: "Please input your img!",
  },
];
function useCardPage() {
  const [dataList, setList] = useState(list);
  const [showModal, setShow] = useState(false);
  const [form] = Form.useForm();

  const show = () => {
    setShow(true);
  };
  const hide = () => {
    setShow(false);
  };
  const addList = () => {
    form.validateFields().then((values) => {
      setList([...dataList, values]);
      form.resetFields();
      hide();
    });
  };
  return { show, dataList, showModal, hide, addList, form };
}

export default function CardPage() {
  const { show, showModal, addList, dataList, hide, form } = useCardPage();
  return (
    <div className="card-container">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card hoverable className="add-wapper" onClick={show}>
            <MyIcon type="icon_increase" />
            <p>新增</p>
          </Card>
        </Col>
        {dataList.map((item) => (
          <Col span={6} key={item.title}>
            <Card
              hoverable
              actions={[
                <MyIcon type="icon_edit" className="icon" />,
                <MyIcon className="icon" type="icon_setting" />,
              ]}
            >
              <Meta
                avatar={<Avatar src={item.img} />}
                title={item.title}
                description={
                  <Typography.Paragraph ellipsis={{ rows: 3, suffix: "..." }}>
                    {item.description}
                  </Typography.Paragraph>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="ajouter liste"
        visible={showModal}
        cancelText="annuler"
        okText="ajouter"
        onOk={addList}
        onCancel={hide}
      >
        <Form form={form}>
          <Form.Item label="link photo" name="img" rules={iRules}>
            <Input />
          </Form.Item>
          <Form.Item label="title" name="title" rules={tRules}>
            <Input />
          </Form.Item>
          <Form.Item label="description" name="description" rules={dRules}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
CardPage.route = { [MENU_PATH]: "/list/card" }
