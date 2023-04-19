import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecruitingService {

  //private baseUrl = "http://69.216.19.140:8080/usit/"; 
  //private baseUrl = "http://localhost:8090/usit/";
  private baseUrl: any = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }

  //used for get the Consultants
  getlist() {
    return this.http.get(this.baseUrl + "recruiting/consultant/all");
  }
  // update status of the consultant
  changeStatus2(id: number, status: string, remarks: string) {
    return this.http.get(this.baseUrl + "recruiting/consultant/status?id=" + id + "&status=" + status + "&remarks=" + remarks);
  }

  //used for delete the consultant
  deleteEntity(id: number) {
    return this.http.delete(this.baseUrl + "recruiting/consultant/delete/" + id);
  }

  //register consultant
  public registerEntity(entity: any) {
    return this.http.post(this.baseUrl + "recruiting/consultant/save", entity);
  }

  //used for get consultant entity
  getEntity(id: number) {
    return this.http.get(this.baseUrl + "recruiting/consultant/getbyid/" + id);
  }

  //suporting drop downs
  public getvisa() {
    return this.http.get(this.baseUrl + "visa/visas");
  }
  public gettech() {
    return this.http.get(this.baseUrl + "technology/tech");
  }

  public getrequirements() {
    return this.http.get(this.baseUrl + "recruiting/requirement/getrequirements");
  }

  public getrequirementsforEMployee(id: any) {
    return this.http.get(this.baseUrl + "recruiting/requirement/getrequirementsforEmpl/" + id);
  }
  getcitydetails() {
    return this.http.get(this.baseUrl + "city/city");
  }

  getstatedetails() {
    return this.http.get(this.baseUrl + "states/states");
  }
  //register vms

  downloadfile(id: number): Observable<Blob> {
    return this.http.get(this.baseUrl + "recruiting/consultant/downloadfiles/" + id, {
      responseType: 'blob'
    });
  }

  // download file
  downloadresume(id: number): Observable<Blob> {
    return this.http.get(this.baseUrl + "recruiting/consultant/downloadresume/" + id, {
      responseType: 'blob'
    });
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
