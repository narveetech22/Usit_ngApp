export class Masters {
  get(arg0: string) {
    throw new Error('Method not implemented.');
  }
  e164Number(e164Number: any) {
    throw new Error('Method not implemented.');
  }
    // for visa
    vid!:number;
	description!:string;
	addedby = localStorage.getItem('userid');
    visastatus!:string; // visa status
    updatedby= localStorage.getItem('userid');
    id!:number;
    statename!:string;
    cityname!:string;
    pincode!:string;
    name!:string;
}
