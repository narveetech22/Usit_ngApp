export class Email {
    id!:number;
	subject!:string;
	body!:any;
	from!:string;
	tomail!:string;
	ccmail!:string;
	//attachment!:string;
	subjectcategory!:string;
	company!:string;
	createddate!:string;
	addedby = localStorage.getItem('userid');
	updatedby = localStorage.getItem('userid');
	sentdate!:string;
	isSelected!:boolean;
}
