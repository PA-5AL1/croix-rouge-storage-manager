import ajax from "@/common/ajax";
import {  ResponseData, SecourismeAPi, HygieneAPi, LogistiqueAPi, BricolageAPi, UniformeAPi, FormationAPi } from "@/types"

const request =  ajax;

const addSecourisme = (data: any) => request.post("/addSecourisme", data) as Promise<ResponseData>;
const updateSecourisme = (data: any) => request.put("/addSecourisme", data) as Promise<ResponseData>;
const deleteSecourisme = (data: any) => request.delete("/addSecourisme", data) as Promise<ResponseData>;
const getSecourisme = (data: any) => request.get("/getSecourisme", data) as Promise<SecourismeAPi>;

const addHygiene = (data: any) => request.post("/addHygiene", data) as Promise<ResponseData>;
const getHygiene = (data: any) => request.get("/getHygiene", data) as Promise<HygieneAPi>;

const addLogistique = (data: any) => request.post("/addLogistique", data) as Promise<ResponseData>;
const getLogistique = (data: any) => request.get("/getLogistique", data) as Promise<LogistiqueAPi>;

const addBricolage = (data: any) => request.post("/addBricolage", data) as Promise<ResponseData>;
const getBricolage = (data: any) => request.get("/getBricolage", data) as Promise<BricolageAPi>;

const addUniforme = (data: any) => request.post("/addUniforme", data) as Promise<ResponseData>;
const getUniforme = (data: any) => request.get("/getUniforme", data) as Promise<UniformeAPi>;

const addFormation = (data: any) => request.post("/addFormation", data) as Promise<ResponseData>;
const getFormation = (data: any) => request.get("/getFormation", data) as Promise<FormationAPi>;



export {
    addSecourisme,
    getSecourisme,
    addHygiene,
    getHygiene,
    addLogistique,
    getLogistique,
    addBricolage,
    getBricolage,
    addUniforme,
    getUniforme,
    addFormation,
    getFormation,
}
