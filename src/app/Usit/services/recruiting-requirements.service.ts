import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecruitingRequirementsService {
  //private baseUrl = "http://69.216.19.140:8080/usit/"; 
  //private baseUrl = "http://localhost:8090/usit/";
  private baseUrl: any = environment.API_BASE_URL;
  //private baseUrl1 : any = "http://localhost:8090/usit/";
  constructor(private http: HttpClient) { }

  // get max require number 
  getreqnumber() {
    return this.http.get(this.baseUrl + "requirement/getmaxnumber");
  }

  //to get all requirements
  getlist() {
    return this.http.get(this.baseUrl + "requirement/all");
  }

  //used for delete the requirement
  deleteEntity(id: number) {
    return this.http.delete(this.baseUrl + "requirement/delete/" + id);
  }

  //register requirement
  public registerRequirement(entity: any) {
    return this.http.post(this.baseUrl + "requirement/save", entity);
  }

  public getSkilldata(id: number) {
    return this.http.get(this.baseUrl + "technology/getskillsbyid/" + id);
  }

  //used for get one resource  // get single requirement
  getEntity(id: number) {
    return this.http.get(this.baseUrl + "requirement/getbyid/" + id);
  }

  //used for get one resource  // get single requirement
  getAssigneRecruiter(id: number) {
    return this.http.get(this.baseUrl + "requirement/getempl/" + id);
  }

  //Update requirement
  public updateRequirement(entity: any) {
    return this.http.post(this.baseUrl + "requirement/update", entity);
  }


  ///// fetching and display technologies
  public gettech() {
    return this.http.get(this.baseUrl + "technology/tech");
  }


  public getemployee() {
    return this.http.get(this.baseUrl + "users/recruiterlist");
  }

  getcitydetails() {
    return this.http.get(this.baseUrl + "city/city");
  }

  getstatedetails() {
    return this.http.get(this.baseUrl + "states/states");
  }
  ////////////

  //register vms
  //   public updateEntity(entity: any){
  //    return this.http.put(this.baseUrl+"recruiting/requirement/all",entity);
  //  }

  //http://localhost:8090/usit/recruiting/requirement/getmaxnumber

  public getemployeebyid(id: number) {
    return this.http.get(this.baseUrl + "recruiting/requirement/getempl/" + id);
  }

  getsubmissions() {
    return this.http.get(this.baseUrl + "sales/interview/submissiondetails");
  }

}
