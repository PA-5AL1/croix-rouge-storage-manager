import { useState } from "react";
import { Card, Row, Col, Typography, } from "antd";
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

function useCardPage() {
    const [dataList, setList] = useState(list);

    const show = () =>{
        console.log(111)

    }
    return {  dataList, show };
}



export default function CardPage() {
    const { show,  dataList,  } = useCardPage();

    return (
        <div className="card-container">
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Card hoverable className="add-wapper" onClick={show}>
                        <MyIcon type="icon_increase" />
                        <p>Ajouter</p>
                    </Card>
                </Col>
                {dataList.map((item) => (
                    <Col span={6} key={item.title}>
                        <Card
                            hoverable
                            cover={<img alt="example" src={item.img} />}
                            style={{ width: 340 }}
                        >
                            <Meta
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
        </div>
    );
}
CardPage.route = { [MENU_PATH]: "/list/card" }
