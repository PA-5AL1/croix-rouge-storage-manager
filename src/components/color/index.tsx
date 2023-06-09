import { Button, Col, Row } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import "./color.less";

interface Position {
  left: number
  top: number
}

interface ColorProps {
  color: string
  pageX: number
  pageY: number
  onSureChange: (color: string, key: string) => void
  colorKey: string
  isShow: boolean
  onClose: () => void
}

const getPositon = (x: number, y: number): Position => ({ left: x, top: y });


function Color({
  color,
  pageX,
  pageY,
  onSureChange,
  colorKey,
  isShow,
  onClose,
}: ColorProps) {
  const [changeColor, setColor] = useState(color);

  // 变化重置
  useEffect(() => {
    if (color) {
      setColor(color);
    }
  }, [color]);

  // 同步改变
  const onChange = useCallback((v) => {
    setColor(v);
  }, []);

  // 确认
  const onChangeComplete = useCallback(() => {
    onSureChange(changeColor, colorKey);
  }, [changeColor, onSureChange, colorKey]);

  return (
    <Row
      className={isShow ? "fixed-wrapper show" : "fixed-wrapper"}
      style={getPositon(pageX, pageY)}
      onClick={(e) => e.stopPropagation()}
    >
      <Col>
        <SketchPicker color={changeColor} onChange={onChange} />
      </Col>
      <Col>
        <Button type="primary" size="small" onClick={onChangeComplete}>
          确认
        </Button>
        <Button size="small" onClick={onClose}>
          取消
        </Button>
      </Col>
    </Row>
  );
}
export default memo(
  Color,
  (prev, next) =>
    prev.color === next.color &&
    prev.colorKey === next.colorKey &&
    prev.isShow === next.isShow &&
    prev.pageY === next.pageY &&
    prev.pageX === next.pageX &&
    prev.onSureChange === next.onSureChange &&
    prev.onClose === next.onClose
);
