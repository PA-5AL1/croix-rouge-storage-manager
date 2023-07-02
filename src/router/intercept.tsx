import Error from "@/pages/err";
import { useDispatchMenu } from "@/store/hooks";
import { MenuItem } from "@/types";
import { getMenuParentKey } from "@/utils";
import { Spin } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const scrollPage = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

const fallback = <Spin style={{
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 500,
  fontSize: 24,
}} tip="页面加载中...." />

interface Props {
  [MENU_PATH]?: string
  [MENU_TITLE]?: string
  pageKey: string
  menuList: Array<MenuItem>
  [key: string]: any
}

function Intercept({ menuList, components: Components, [MENU_TITLE]: title, [MENU_PATH]: pagePath, pageKey, ...itemProps }: Props) {
  const [pageInit, setPageInit] = useState(false)
  const location = useLocation()
  const { stateSetOpenMenuKey, stateSetSelectMenuKey, stateAddOpenedMenu, stateSetCurrentPath } = useDispatchMenu()

  const currentPath = useMemo(() => {
    const { pathname, search } = location
    return pathname + search
  }, [location])

  // 监听 location 改变
  const onPathChange = useCallback(() => {
    stateSetCurrentPath(currentPath)
    stateAddOpenedMenu({ key: pageKey, path: currentPath, title: title || "未设置标题信息" });
  }, [currentPath, pageKey, title, stateSetCurrentPath, stateAddOpenedMenu])

  const setCurrentPageInfo = useCallback(() => {
    if (!title) {
      return;
    }
    document.title = title;
    stateSetSelectMenuKey([String(pageKey)]);
    let openkey = getMenuParentKey(menuList, pageKey);
    stateSetOpenMenuKey(openkey);
    stateAddOpenedMenu({ key: pageKey, path: currentPath, title });
  }, [currentPath, menuList, title, pageKey, stateSetOpenMenuKey, stateSetSelectMenuKey, stateAddOpenedMenu])

  const init = useCallback(() => {
    setCurrentPageInfo()
    scrollPage()
  }, [setCurrentPageInfo])

  useEffect(() => {
    if (init && !pageInit) {
      init()
      setPageInit(true)
    }
  }, [init, pageInit])

  useEffect(() => {
    if (pageInit) {
      onPathChange()
    }
  }, [onPathChange, pageInit])


  const hasPath = !menuList.find(
    (m) => (m[MENU_PARENTPATH] || "") + m[MENU_PATH] === pagePath
  );

  if (hasPath && pagePath !== "/" && pagePath !== "*") {
    return (
      <Error
        status="403"
        errTitle="权限不够"
        subTitle="Sorry, you are not authorized to access this page."
      />
    );
  }

  return (
    <Components
      {...itemProps}
      fallback={fallback}
    />
  );
}
export default Intercept
