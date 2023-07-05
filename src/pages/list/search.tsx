import { addMsg, getMsg } from "@/api";
import MyPagination, { PageInfo } from "@/components/pagination";
import MyTable from "@/components/table";
import { MapKey, MessageList } from "@/types";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Spin,
  message,
} from "antd";
import { useState } from "react";
import "./card.less";

export default function SearchPage() {
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [pageData, setPageData] = useState<PageInfo>({ page: 1 });
  const [tableData, setData] = useState<MessageList>([]);
  const [tableCol, setCol] = useState<MapKey>([]);
  const [load, setLoad] = useState(true);
  const [total, setTotal] = useState(0);
  const [showModal, setShow] = useState(false);

  // 获取列表
  const getDataList = (data: PageInfo) => {
    getMsg(data).then((res) => {
      const { data, status } = res;
      if (status === 0 && data) {
        let { list, total, mapKey } = data;
        mapKey = mapKey.map((i) => {
          if (i.key === "description") {
            i.width = 500;
          }
          return i;
        });
        setCol(mapKey);
        setTotal(total);
        setData(list.map((i) => ({ ...i, key: i.m_id })));
        setLoad(false);
        return;
      }
    });
  };

  // 添加列表
  const addList = () => {
    form.validateFields().then((values) => {
      addMsg(values).then((res) => {
        if (res.status === 0) {
          form.resetFields();
          message.success(res.msg);
          setShow(false);
          search();
        }
      });
    });
  };

  // 顶部搜索
  const search = () => {
    let data = searchForm.getFieldsValue();
    setPageData({ page: 1 })
    getDataList(data);
  };

  // 页码改版
  const pageChange = (pageData: PageInfo) => {
    let data = searchForm.getFieldsValue();
    getDataList({ ...pageData, ...data });
    setPageData(pageData);
  };

  const tableTop = (
    <Row justify="space-between" gutter={80}>
      <Col style={{ lineHeight: "32px" }}></Col>
      <Col>
        <Button type="primary" onClick={() => setShow(true)}>
          ajouter un article
        </Button>
      </Col>
    </Row>
  );
  return (
    <div className="search-container">
      <Spin spinning={load}>
        <div className="top-form">
          <Form layout="inline" form={searchForm}>
            <Form.Item name="name">
              <Input placeholder="le nom de l'article" />
            </Form.Item>
            <Form.Item name="description">
              <Input placeholder="la description" />
            </Form.Item>
            <Button onClick={search} type="primary" className="submit-btn">
              recherche
            </Button>
            <Button
              onClick={() => {
                searchForm.resetFields();
                search();
              }}
            >
              vide
            </Button>
          </Form>
        </div>
        <MyTable
          title={() => tableTop}
          dataSource={tableData}
          columns={tableCol}
          pagination={false}
          saveKey="MyListSearch"
        />
        <MyPagination
          page={pageData.page}
          immediately={getDataList}
          change={pageChange}
          total={total}
        />
      </Spin>
      <Modal
        title="ajouter un article"
        visible={showModal}
        cancelText="annuler"
        okText="ajouter"
        onOk={() => addList()}
        onCancel={() => setShow(false)}
      >
        <Form form={form}>
          <Form.Item
            label="le nom de l'article"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="la description"
            name="description"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre description",
              },
              {
                min: 10,
                message: "La description doit faire plus de 10 mots",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
SearchPage.route = {
  [MENU_PATH]: "/list/search",
};
