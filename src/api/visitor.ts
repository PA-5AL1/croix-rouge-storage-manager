import ajax from "@/common/ajax";
import mock from "../mock/index";
import {  VisitorApi, VisitorListApi, } from "@/types"

const request = process.env.REACT_APP_MOCK === "1" ? mock : ajax;

const getVisitorList = (data: any) => request.get("/getiplist", data) as Promise<VisitorListApi>;
const getVisitorData = () => request.get("/getvisitordata") as Promise<VisitorApi>;

export{
    getVisitorList,
    getVisitorData
}
