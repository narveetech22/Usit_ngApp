import { Employee } from "./employee";
import { Submission } from "./submission";

export class SalesInterview {
    intrid!:number;
	submission = new Submission();
	interviewdate!:string;
	timezone!:string;
	round!:string;
	mode!:string;
	feedback!:string;
	interviewstatus!:string;
	users = new Employee();
	createddate!:string;
	updateddate!:string;
    status!:string;
    updatedby = localStorage.getItem('userid');
}
