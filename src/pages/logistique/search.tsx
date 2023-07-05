import { useState } from "react";
import {
  Form,
  Input,
  Modal,
  Button,
  Row,
  Col,
  Spin,
  message,
} from "antd";
import MyPagination, { PageInfo } from "@/components/pagination";
import MyTable from "@/components/table";
import "./index.less";
import {LogistiqueList, MapKey,} from "@/types"
import { addLogistique, getLogistique,} from "@/api/stock";

export default function SearchPage() {
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [pageData, setPageData] = useState<PageInfo>({ page: 1 });
  const [tableData, setData] = useState<LogistiqueList>([]);
  const [tableCol, setCol] = useState<MapKey>([]);
  const [load, setLoad] = useState(true);
  const [total, setTotal] = useState(0);
  const [showModal, setShow] = useState(false);

  // get list
  const getDataList = (data: PageInfo) => {
    getLogistique(data).then((res) => {
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

  // add list
  const addList = () => {
    form.validateFields().then((values) => {
      addLogistique(values).then((res) => {
        if (res.status === 0) {
          form.resetFields();
          message.success(res.msg);
          setShow(false);
          search();
        }
      });
    });
  };

  // top search
  const search = () => {
    let data = searchForm.getFieldsValue();
    setPageData({ page: 1 })
    getDataList(data);
  };

  // page change
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
          saveKey="MyListSearch4"
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
                message: "Veuillez entrer le nom",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label="le poids de l'article"
              name="weight"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le poids",
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
                min: 3,
                message: "La description doit faire plus de 3 mots",
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
  [MENU_PATH]: "/list/logistique",
};
