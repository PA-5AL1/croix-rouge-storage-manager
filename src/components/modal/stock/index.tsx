import { useEffect, useState } from "react";
import { Modal, message, FormInstance } from "antd";
import MyForm, { FormItemData } from "@/components/form";
import {editStockInfo, getStockInfo} from "@/api/stock";

export type StockID = null | number
interface StockProps {
  m_id: StockID
  isShow: boolean
  onCancel: (id: StockID, s: boolean) => void
  onOk: () => void
}

const initFormItems: FormItemData[] = [
  {
    itemType: "input",
    itemProps: {
      name: "name",
      rules: [{ required: true, message: "s'il vous plaît entrez le nom de l'article" }],
      label: "le nom de l'article",
    },
    childProps: {
      placeholder: "le nom de l'article",
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "weight",
      rules: [{ required: true, message: "le poids de l'article" }],
      label: "le poids de l'article",
    },
    childProps: {
      placeholder: "le poids de l'article",
    },
  },
  {
    itemType: "input",
    itemProps: {
      rules: [{ required: true, message: "s'il vous plaît entrez la description" }],
      name: "description",
      label: "la description",
    },
    childProps: {
      placeholder: "la description",
    },
  },
  {
    itemType: "input",
    itemProps: {
      rules: [{ required: true, message: "s'il vous plaît entrez le fournisseur" }],
      name: "provider",
      label: "le fournisseur",
    },
    childProps: {
      placeholder: "le fournisseur",
    },
  },
];

export default function UserModal({ m_id, isShow, onCancel, onOk }: StockProps) {
  const [form, setForm] = useState<FormInstance | null>(null);
  const [formItems, setItems] = useState<FormItemData[]>([]);


  useEffect(() => {
    if (m_id && form) {
      getStockInfo({ m_id }).then((res) => {
        if (res.data) {
          form.setFieldsValue(res.data);
        }
      });
      let items = initFormItems.map((i) => ({ ...i }));
      items.forEach((i) => {
        if (i.itemProps.name === "m_id") {
          i.itemProps.rules = undefined;
        }
      });
      setItems(items);
    } else if (!m_id) {
      // set formItem
      let items = initFormItems.map((i) => ({ ...i }));
      setItems(items);
    }
  }, [m_id, form]);

  const submit = () => {
    form && form.validateFields().then((values) => {
      values.m_id = m_id;
      editStockInfo(values).then((res) => {
        if (res.status === 0) {
          message.success(res.msg);
          close();
          onOk();
        }
      });
    });
  };
  const close = () => {
    form && form.resetFields();
    onCancel(null, false);
  };
  return (
    <Modal
      maskClosable={false}
      title="Modifier les informations"
      visible={isShow}
      okText="confirmer"
      cancelText="annuler"
      onCancel={close}
      onOk={submit}
    >
      <MyForm handleInstance={setForm} items={formItems} />
    </Modal>
  );
}
