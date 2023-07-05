import MyIcon from "@/components/icon";
import { Col, Input, Row } from "antd";
import { useState } from "react";
import "./icons.less";

interface IconItem {
  icon_id: string,
  name: string,
  font_class: string,
  unicode: string,
  unicode_decimal: number
}
interface MyIconItem extends IconItem {
  type: string
}
const iconData = require("@/assets/json/iconfont");
const prefix_name = iconData.css_prefix_text;
const initData: MyIconItem[] = iconData.glyphs.map((item: IconItem) => ({
  ...item,
  type: prefix_name + item.font_class,
}));

function useIcons() {
  const [icons, setIcons] = useState(initData);
  const change = (e: any) => {
    const val = e.target.value;
    if (!val || !val.replace(/\s/g, "")) {
      setIcons(initData);
      return;
    }
    const newData = initData.filter((i) => i.name.includes(val));
    setIcons(newData);
  };
  return { change, icons };
}

export default function Icons() {
  const { change, icons } = useIcons();
  return (
    <div className="icons-container">
      <h2>Personnalisation des icônes</h2>
      <div className="mt10">Vous pouvez utiliser les graphiques vectoriels sémantiques d'ant-design.</div>
      <div className="mt10">
          Vous pouvez également utiliser le
        <a href="https://www.iconfont.cn/" target="_blank" rel="noreferrer">
          iconfont
        </a>
          Pour ajouter une icône personnalisée, utilisez type="*" sur le composant créé avec createFromIconfontCN
      </div>
      <Row className="mt10">
        <Col span={8}>
          <Input placeholder="Rechercher dans la bibliothèque d'icônes localement pertinente" onChange={change} />
        </Col>
      </Row>
      <Row className="mt10 pd10">
        {icons.map((item: MyIconItem) => {
          return (
            <Col span={2} className="icon-item" key={item.icon_id}>
              <MyIcon type={item.type} />
              <div>{item.type}</div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

Icons.route = { [MENU_PATH]: "/icons" };
