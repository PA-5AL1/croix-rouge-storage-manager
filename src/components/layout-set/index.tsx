import twoImg from "@/assets/images/layout1.jpg";
import singImg from "@/assets/images/layout2.jpg";
import twoFlanksImg from "@/assets/images/layout3.jpg";
import { useDispatchLayout, useDispatchVisible, useStateLayout, useStateVisible } from "@/store/hooks";
import * as Types from "@/store/layout/actionTypes";
import { LayoutMode, LayoutModes, State } from "@/types";
import { setLayoutMode, setCompVisible as util_setCompVisible } from "@/utils";
import { Button, Drawer, Radio, Row, message } from "antd";
import { useCallback, useState } from "react";
import MyIcon from "../icon";
import "./index.less";


const modes: LayoutModes = [
  {
    img: singImg,
    mode: Types.SINGLE_COLUMN,
    alt: "mise en page sur une seule colonne",
  },
  {
    img: twoImg,
    mode: Types.TWO_COLUMN,
    alt: "mise en page à deux colonnes",
  },
  {
    img: twoFlanksImg,
    mode: Types.TWO_FLANKS,
    alt: "mise en page des deux côtés",
  },
];
const RadioArray = [
  {
    l: "montrer",
    v: true,
  },
  {
    l: "cacher",
    v: false,
  },
];

function LayoutSet() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const wakeup = useCallback(() => setDrawerVisible(true), []);
  const onClose = useCallback(() => setDrawerVisible(false), []);
  const layoutMode = useStateLayout()
  const componentsVisible = useStateVisible()
  const { stateSetVisible } = useDispatchVisible()
  const { stateChangeLayout } = useDispatchLayout()
  const setLayout = useCallback((mode: LayoutMode) => {
    stateChangeLayout(mode)
    message.success("Mise en page définie avec succès！");
  }, [stateChangeLayout])
  const saveLayout = useCallback(() => {
    setLayoutMode(layoutMode);
    util_setCompVisible(componentsVisible);
    message.success("Mise en page enregistrée localement avec succès！");
  }, [layoutMode, componentsVisible])
  return (
    <div className="layoutset-container">
      <MyIcon type="icon_setting" onClick={wakeup} />
      <Drawer
        className="layoutset-drawer"
        title="définir la mise en page"
        placement="right"
        closable={false}
        onClose={onClose}
        width={300}
        visible={drawerVisible}
      >
        <h2 className="title">sélectionner la mise en page</h2>
        <Row justify="space-around">
          {modes.map((m) => (
            <div
              key={m.mode}
              onClick={() => setLayout(m.mode)}
              className={m.mode === layoutMode ? "col active" : "col"}
            >
              <img src={m.img} alt={m.alt + m.mode + layoutMode}></img>
            </div>
          ))}
        </Row>
        <h2 className="title">affichage des composants</h2>
        {Object.keys(componentsVisible).map((key) => (
          <Row key={key} className="visible-list">
            {key === "footer" ? "footer：" : "haut basculer la navigation："}
            <Radio.Group
              onChange={(e) => stateSetVisible(key as keyof State["componentsVisible"], e.target.value)}
              value={componentsVisible[key as keyof State["componentsVisible"]]}
            >
              {RadioArray.map((i) => (
                <Radio value={i.v} key={i.l}>
                  {i.l}
                </Radio>
              ))}
            </Radio.Group>
          </Row>
        ))}
        <Row className="save" justify="center">
          <Button type="primary" onClick={saveLayout}>
            enregistrer cette mise en page
          </Button>
        </Row>
      </Drawer>
    </div>
  );
}

export default LayoutSet
