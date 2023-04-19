export class Vms {
    id!: number;
    companyname!:string;
    recruitername!:string;
    mobile!:string;
    email!:string;
    headQuarters!:string;
    vendortype!:string;
    details!:string;
    status:string='Active';
    createddate!:string;
    remarks!:string;
    addedbyname!:string;
    addedby = localStorage.getItem('userid');
	updatedby = localStorage.getItem('userid');
    vms_stat = "Entry";
	tyretype!:string;
	client!:string;
	role = localStorage.getItem('roleId');
   
}
