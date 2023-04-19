import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Submission } from '../modal/submission';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  //private baseUrl = "http://69.216.19.140:8080/usit/"; 
  //private baseUrl = "http://localhost:8090/usit/";
  private baseUrl: any = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }

  getconsultantdropdown(flg: string) {
    return this.http.get(this.baseUrl + "consultant/consultantinfo/" + flg);
  }

  getCompanies(flg:string) {
    return this.http.get(this.baseUrl + "recruiter/venodorCompanies/"+flg);
  }

  //used for create the resource
  registersubmission(submission: Submission) {
    return this.http.post(this.baseUrl + "submission/savesubmission", submission);
  }

  // supporting drop down apis
  public getrequirements() {
    return this.http.get(this.baseUrl + "requirement/getrequirements");
  }

  public getsubmissiondata(flg: string,access:string,userid:number) {
    return this.http.get(this.baseUrl + "submission/all/" + flg+"/"+access+"/"+userid);
  }

 
  deletesubmission(id: number) {
    return this.http.delete(this.baseUrl + "submission/delete/" + id);
  }


  //used for get one resource
  getsubdetailsbyid(id: number) {
    return this.http.get(this.baseUrl + "submission/getbyid/" + id);
  }
}
