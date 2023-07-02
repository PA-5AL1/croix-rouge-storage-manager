import Layout from "@/layout";
import { useDispatchUser, useStateUserInfo } from "@/store/hooks";
import { getLocalUser } from "@/utils";
import Login from "@pages/login";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";

const isHash = process.env.REACT_APP_ROUTER_ISHASH === "1"
const RouterBasename = process.env.REACT_APP_ROUTERBASE || "/"


export default function AppRouter() {
  const [loading, setLoad] = useState(false);
  const { stateSetUser } = useDispatchUser()
  const userInfo = useStateUserInfo()


  useEffect(() => {
    if (!userInfo) {
      let localInfo = getLocalUser();
      if (localInfo && localInfo.isLogin === true) {
        stateSetUser(localInfo);
      }
      return setLoad(false);
    }
    setLoad(false);
  }, [stateSetUser, userInfo]);

  if (loading)
    return (
      <Spin size="large" wrapperClassName="loading-page" tip="Loading...">
        <div className="loading-page"></div>
      </Spin>
    );
  if (!userInfo) return <Login />;
  if (isHash) {
    return <HashRouter basename={RouterBasename}>
      <Layout />
    </HashRouter>
  }
  return (
    <BrowserRouter basename={RouterBasename}>
      <Layout />
    </BrowserRouter>
  );
}
