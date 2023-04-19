import { Consultantinfo } from "./consultantinfo";
import { Employee } from "./employee";
import { Requirements } from "./requirements";
import { Vendor } from "./vendor";

export class Submission {
    submissionid!: number;
    endclient!: string;;
    position!: string;
    projectlocation!: string;
    submissionrate!: string;
    implpartner!: string;
    relocationassistance!:string;
    vendor!: string;
    ratetype!: string;
    emplname!: string;
    empcontact!: string;
    empmail!: string;
    updatedby=localStorage.getItem('userid');
    createddate!: string;
    updateddate!: string;
    status = "Active";
    user = new Employee();
    remarks!: string;
    requirement = new Requirements();
    consultant = new Consultantinfo();
    substatus!:string;
    consultantname!:string;
    pseudoname!:string;
    reqnumber!:string;
    flg!:string;
    fullname!:string;
 
}
