import ajax from "@/common/ajax";
import mock from "../mock/index";
import {  LoginApi,} from "@/types"

const request = process.env.REACT_APP_MOCK === "1" ? mock : ajax;

const login = (data: any) => request.post("/login", data) as Promise<LoginApi>;

export {
    login
}
