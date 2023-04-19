
import { Role } from 'src/app/Usit/modal/role';
export class Employee {
    userid!:number;
    firstname!:string;
    lastname!:string;
    fullname!:string;
    pseudoname!:string;
    email!:string;
    personalcontactnumber!:number;
    companycontactnumber!:number;
    password!:string;
    designation!:string;
    //isactive='Active';
    manager!:number;
    teamlead!:number;
    //Role role:any=[];
    //Role!: Role [];
    //role : Role[] = [];
    createddate!:string;
    role= new Role();
    status="Active";
    remarks!:string;
    technology!:string;
    experience!:number;
    location!:string;
    department!:string;
    addedby = localStorage.getItem('userid');
	updatedby = localStorage.getItem('userid');
   
}



