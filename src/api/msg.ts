import ajax from "@/common/ajax";
import mock from "../mock/index";
import { MessageAPi, ResponseData,} from "@/types"

const request = process.env.REACT_APP_MOCK === "1" ? mock : ajax;

const addMsg = (data: any) => request.post("/addmessage", data) as Promise<ResponseData>;
const getMsg = (data: any) => request.get("/getmessage", data) as Promise<MessageAPi>;

export{
    addMsg,
    getMsg
}
