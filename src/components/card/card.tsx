import { useState } from "react";
import { Card, Avatar, Row, Col, Typography, Modal, Form, Input } from "antd";
import "./index.less";

const list = [
  {
    img: "",
    title: "Design",
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
    min: 3,
    message: "The description must be more than 3 words!",
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

        </Col>
        {dataList.map((item) => (
          <Col span={6} key={item.title}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
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
        title="添加列表"
        visible={showModal}
        cancelText="取消"
        okText="添加"
        onOk={addList}
        onCancel={hide}
      >
        <Form form={form}>
          <Form.Item label="图片链接" name="img" rules={iRules}>
            <Input />
          </Form.Item>
          <Form.Item label="标题" name="title" rules={tRules}>
            <Input />
          </Form.Item>
          <Form.Item label="描述" name="description" rules={dRules}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
CardPage.route = { [MENU_PATH]: "/list/card" }
