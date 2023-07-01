import ajax from "@/common/ajax";
import mock from "../mock/index";
import {  PowerApi} from "@/types"

const request = process.env.REACT_APP_MOCK === "1" ? mock : ajax;

const getPower = () => request.get("/getpower") as Promise<PowerApi>;

export {
    getPower
}
