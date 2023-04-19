import { City } from "./city";
import { Employee } from "./employee";
import { States } from "./states";
import { Vendor } from "./vendor";

export class Recruiter {
    recid!:number;
    recruitertype!:string;
    recruiter!:string;
    usnumber!:string;
    innumber!:string;
    country!:string;
    state!:string;
    iplogin!:string;
    fedid!:string;
    details!:string;
    email!:string;
    vmsid!:Number;
    status!:string;
    createddate!:string;
    addedby!:number;// localStorage.getItem('userid');
	updatedby = localStorage.getItem('userid');
    role!:number;// = localStorage.getItem('roleId');
    remarks!:string;
    addedbyname!:string;
    rec_stat!:string;
    user = new Employee();
    vendor = new Vendor();
    states = new States();
    city = new City();
    id!:number;
}
