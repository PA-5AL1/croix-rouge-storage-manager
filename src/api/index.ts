import ajax from "@/common/ajax";
import { LoginApi, MenuInfoApi, MenuListResponse, MenuResponse, MessageAPi, PowerApi, ResponseData, ResponseUserInfo, UserListApi, VisitorApi, VisitorListApi } from "@/types";
import mock from "../mock/index";

const request = process.env.REACT_APP_MOCK === "1" ? mock : ajax;


const login = (data: any) => request.post("/login", data) as Promise<LoginApi>;

const addMsg = (data: any) => request.post("/addmessage", data) as Promise<ResponseData>;
const getMsg = (data: any) => request.get("/getmessage", data) as Promise<MessageAPi>;


const getPower = () => request.get("/getpower") as Promise<PowerApi>;


const getMenu = () => request.get("/getmenu") as Promise<MenuResponse>;
const getMenuList = () => request.get("/getmenulist") as Promise<MenuListResponse>;
const addMenu = (data: any) => request.post("/addmenu", data) as Promise<ResponseData>;
const delMenu = (data: any) => request.post("/delmenu", data) as Promise<ResponseData>;
const getMenuInfo = (data: any) => request.get("/getmenuinfo", data) as Promise<MenuInfoApi>;
const editMenu = (data: any) => request.post("/editmenuinfo", data) as Promise<ResponseData>;


const getVisitorList = (data: any) => request.get("/getiplist", data) as Promise<VisitorListApi>;
const getVisitorData = () => request.get("/getvisitordata") as Promise<VisitorApi>;


const getUserList = (data: any) => request.get("/getuserlist", data) as Promise<UserListApi>;
const addUser = (data: any) => request.post("/adduserinfo", data) as Promise<ResponseData>;
const getUser = (data: any) => request.get("/getuserinfo", data) as Promise<ResponseData & { data: ResponseUserInfo }>;
const editUser = (data: any) => request.post("/edituserinfo", data) as Promise<ResponseData>;


const editType = (data: any) => request.post("/edittype", data) as Promise<ResponseData>;
const addType = (data: any) => request.post("/addtype", data) as Promise<ResponseData>;
export {
  addMenu,
  addMsg, addType, addUser, delMenu, editMenu, editType, editUser, getMenu, getMenuInfo, getMenuList, getMsg,
  getPower, getUser, getUserList, getVisitorData, getVisitorList, login
};
