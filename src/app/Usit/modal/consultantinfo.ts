import { Employee } from "./employee";
import { Requirements } from "./requirements";
import { Technologies } from "./technologies";
import { Visa } from "./visa";

export class Consultantinfo {
    consultantid!:number;
    consultantname!:string;
    firstname!:string;
    lastname!:string;
    contactnumber!:number;
    consultantemail!:string;
    comment!:string;
    position!:string;

    linkedin!:string;
    passportnumber!:string;
    projectavailabity!:string;
    availabilityforinterviews!:string;

    experience!:number;
    ratetype!:string;
    hourlyrate!:number;
    state!:string;
    city!:string;

    relocation!:string;
    relocatOther!:string;
    
    skills!:string;
    summary!:string;
    priority!:string;
    qualification!:string;
   // specialization!:string;
    university!:string;
    yop!:number;
    
    resume!:string;
    h1bcopy!:string;
    dlcopy!:string;

    companyname!:string;
    salesemp!:string;
    empcontact!:number;
    empemail!:string;
    remarks!:string;
    consultantflg!:string;
    isactive!:boolean;
    updatedby = new Employee();
    requirements = new Requirements();
    technology = new Technologies();
    visa = new Visa();
    addedby = new Employee();

    technologyarea!:string;
    visa_status!:string;
    companyemail!:number;
    companymobile!:string;
    createddate!:string;
    fullname!:string;
    status!:string;

    refname!:string;
    refcont!:string;
    refemail!:string;
    refname1!:string;
    refemail1!:string;
    refcont1!:string;
    
}
