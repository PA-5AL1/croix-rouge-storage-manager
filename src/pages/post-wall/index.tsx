import "./index.less";
import {Card, Row, Col, Button, Modal, Form, Input, message} from 'antd';
import React, { useState } from 'react';
import {addMsg, getMsg} from "@/api";
import {PageInfo} from "@/components/pagination";
import TextEditor from "@/components/text-editor";


export default function PostWallPage() {

    const { Meta } = Card;
    const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };

    const toTextEditor = () => {

    }

    return (
        <div className="search-container">
            <Button type="primary" onClick={toTextEditor}>
                ajouter une commentaire
            </Button>

            <br />
            <br />
            <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>

                <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
            </Row>
        </div>
    );
}
PostWallPage.route = {
    // [MENU_PATH]: "/list/text-editor",
    [MENU_PATH]: "/list/card",
};
