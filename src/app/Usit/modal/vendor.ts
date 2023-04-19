import { City } from "./city";
import { Employee } from "./employee";
import { States } from "./states";
import { PinCode } from "./pin-code";

export class Vendor {
    vmsid!:number;
	company!:string;
    companytype!:string;
    location1!:string;
    location2!:string;
    //city!:string;
    state!:string;
    zipcode!:string;
    fedid!:string;
    tyretype!:string;
    vendortype!:string;
    client!:string;
    status!:string;
    createddate!:string;
    updateddate!:string;
    addedby = localStorage.getItem('userid');
	updatedby = localStorage.getItem('userid');
    role = localStorage.getItem('roleno');
    remarks!:string;
    details!:string;
    vms_stat!:string;
    addedbyname!:string;
    staff!:string;
	revenue!:string;
	website!:string;
	facebook!:string;
	industrytype!:string;
	linkedinid!:string;
	twitterid!:string;
    user = new Employee();
    city = new City();
    states = new States();
    pincode = new PinCode();
    id!:number;

}
