import Router from "@/router";
import { Layout } from "antd";
import Footer from "../footer";
import Header from "../header";
import Menu from "../siderMenu";
import TopMenu from "../topMenu";
import { LayoutModeProps } from "./index";
const { Content } = Layout;

const SingleColumn = ({ visible }: LayoutModeProps) => {
  return (
    <Layout className="my-layout-body">
      <Header children={<Menu />} />
      <Layout>
        <Layout className="layout-content-wrap">
          {visible.topMenu && <TopMenu />}
          <Content className=" layout-content-body">
            <Router />
          </Content>
          {visible.footer && <Footer />}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SingleColumn;
