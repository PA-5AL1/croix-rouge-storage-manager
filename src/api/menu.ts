import ajax from "@/common/ajax";
import mock from "../mock/index";
import { ResponseData, MenuResponse, MenuListResponse } from "@/types"

const request = process.env.REACT_APP_MOCK === "1" ? mock : ajax;

const getMenu = () => request.get("/getmenu") as Promise<MenuResponse>;
const getMenuList = () => request.get("/getmenulist") as Promise<MenuListResponse>;
const addMenu = (data: any) => request.post("/addmenu", data) as Promise<ResponseData>;

export {
    getMenu,
    getMenuList,
    addMenu
};
