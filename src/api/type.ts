import ajax from "@/common/ajax";
import mock from "../mock/index";
import { ResponseData,} from "@/types"

const request = process.env.REACT_APP_MOCK === "1" ? mock : ajax;

const editType = (data: any) => request.post("/edittype", data) as Promise<ResponseData>;
const addType = (data: any) => request.post("/addtype", data) as Promise<ResponseData>;

export {
    editType,
    addType
}
