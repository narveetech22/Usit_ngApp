import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecruitinginterviewService {
  //private baseUrl = "http://69.216.19.140:8080/usit/"; 
  //private baseUrl = "http://localhost:8090/usit/";
  private baseUrl: any = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }

  //register vms
  public getsubdetails() {
    return this.http.get(this.baseUrl + "recruiting/submission/getsubdetails");
  }

  //register vms
  public registerEntity(entity: any) {
    return this.http.post(this.baseUrl + "recruiting/interview/save", entity);
  }

  //used for get the resource
  getlist() {
    return this.http.get(this.baseUrl + "recruiting/interview/interviews");
  }

  //used for delete the resource
  deleteEntity(id: number) {
    return this.http.delete(this.baseUrl + "recruiting/interview/delete/" + id);
  }


  //used for get one resource
  getEntity(id: number) {
    return this.http.get(this.baseUrl + "recruiting/interview/getbyid/" + id);
  }

  //register vms
  public updateEntity(entity: any) {
    return this.http.put(this.baseUrl + "recruiting/requirement/all", entity);
  }

  ////////////////////////// submission service /////////////////////////////
  public getsubmissiondata() {
    return this.http.get(this.baseUrl + "recruiting/submission/all");
  }

  deletesubmission(id: number) {
    return this.http.delete(this.baseUrl + "recruiting/submission/delete/" + id);
  }

  //used for get one resource
  getsubdetailsbyid(id: number) {
    return this.http.get(this.baseUrl + "recruiting/submission/getbyid/" + id);
  }

  //register vms
  public registerSubmission(entity: any) {
    return this.http.post(this.baseUrl + "recruiting/submission/save", entity);
  }
}
