import { Employee } from "./employee";
import { Technologies } from "./technologies";

export class Requirements {
	reqnumber!:string;
	duration!:string;
    requirementid!:number;
	postedon!:string;
	vendor!:string;
	jobtitle!:string;
	category!:string;
	email!:string;
	mobile!:string;
	jobdescription!:string;
	recruitername!:string;
	location!:string;
	jobexperience!:string;
    jobskills!:string;
	employmenttype!:string;
	salary!:number;
	source!:string;
	updateddate!:string;
	status!:string;
	//users = new Employee();
	updatedby = localStorage.getItem('userid');
	createddate!:string;
	technology = new Technologies();
	//empid:any=[];
}
