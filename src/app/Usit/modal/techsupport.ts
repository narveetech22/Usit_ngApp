import { Technologies } from "./technologies";

export class Techsupport {
    id!:number;
    name!:string;
    pseudoname!:string;
    mobile!:string;
    secmobile!:number;
    email!:string;
    precompany!:string;
    experience!:number;
    location!:string;
   // technology!:string;
    skills!:string;
    status="Active";
    remarks!:string;
    technology = new Technologies();
}
