import ajax from "@/common/ajax";
import {
    ResponseData,
    RecordAPi
} from "@/types"

const request =  ajax;


const addRecord = (data: any) => request.post("/addRecord", data) as Promise<ResponseData>;
const getRecord = (data: any) => request.get("/getRecord", data) as Promise<RecordAPi>;

export {
    addRecord,
    getRecord
}
