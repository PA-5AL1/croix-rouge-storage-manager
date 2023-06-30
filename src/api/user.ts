import ajax from "@/common/ajax";
import mock from "../mock/index";
import {  ResponseData, UserListApi, ResponseUserInfo, PowerApi} from "@/types"

const request = process.env.REACT_APP_MOCK === "1" ? mock : ajax;

const getUserList = (data: any) => request.get("/getuserlist", data) as Promise<UserListApi>;
const addUser = (data: any) => request.post("/adduserinfo", data) as Promise<ResponseData>;
const getUser = (data: any) => request.get("/getuserinfo", data) as Promise<ResponseData & { data: ResponseUserInfo }>;
const editUser = (data: any) => request.post("/edituserinfo", data) as Promise<ResponseData>;
const getPower = () => request.get("/getpower") as Promise<PowerApi>;

export {
    getUserList,
    addUser,
    getUser,
    editUser,
    getPower
}
