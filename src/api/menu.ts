import ajax from "@/common/ajax";
import mock from "../mock/index";
import { ResponseData, MenuResponse, MenuListResponse,MenuInfoApi } from "@/types"

const request = process.env.REACT_APP_MOCK === "1" ? mock : ajax;

const getMenu = () => request.get("/getmenu") as Promise<MenuResponse>;
const getMenuList = () => request.get("/getmenulist") as Promise<MenuListResponse>;
const addMenu = (data: any) => request.post("/addmenu", data) as Promise<ResponseData>;
const delMenu = (data: any) => request.post("/delmenu", data) as Promise<ResponseData>;
const getMenuInfo = (data: any) => request.get("/getmenuinfo", data) as Promise<MenuInfoApi>;
const editMenu = (data: any) => request.post("/editmenuinfo", data) as Promise<ResponseData>;

export {
    getMenu,
    getMenuList,
    addMenu,
    delMenu,
    getMenuInfo,
    editMenu,
};
