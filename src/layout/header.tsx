import logo from "@/assets/images/logo.svg";
import MyIcon from "@/components/icon/";
import { useDispatchUser, useStateUserInfo } from "@/store/hooks";
import { MENU, TOKEN, USER_INFO, clearLocalDatas } from "@/utils";
import { Dropdown, Layout, Menu } from "antd";
import { useCallback } from "react";

interface LayoutHeaderProps {
  children: JSX.Element | null
}

const { Header } = Layout;


const RightMenu = ({ logout }: { logout: () => void }) => (
  <Menu className="right-down">
    <Menu.Item
      key="logout"
      onClick={logout}
      icon={<MyIcon type="icon_disconnectdevice" />}
    >
        se déconnecter
    </Menu.Item>
  </Menu>
);

const getPopupContainer = (HTMLElement: HTMLElement) => HTMLElement;

export default function LayoutHeader({ children }: LayoutHeaderProps) {
  const userInfo = useStateUserInfo()
  const { stateClearUser } = useDispatchUser()
  const logout = useCallback(() => {
    clearLocalDatas([USER_INFO, TOKEN, MENU]);
    window.location.reload();
    stateClearUser();
  }, [stateClearUser]);
  return (
    <Header className="header">
      <div className="logo">
        <img src={logo} alt="logo"></img>
        <span>Le croix-rouge</span>
      </div>
      {children}
      <div className="right">
        <Dropdown
          placement="bottomCenter"
          getPopupContainer={getPopupContainer}
          overlay={<RightMenu logout={logout} />}
        >
          <div>administrateur：{userInfo && userInfo.username}</div>
        </Dropdown>
      </div>
    </Header>
  );
};
