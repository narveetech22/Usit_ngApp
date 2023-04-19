import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  //private baseUrl = "http://69.216.19.140:8080/usit/"; 
  //private baseUrl = "http://localhost:8090/usit/";
  private baseUrl: any = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }

  public duplicatecheck(phonenumber: number) {
    return this.http.get(this.baseUrl + "consultant/duplicatecheck/" + phonenumber);
  }

  public duplicatecheckEmail(email: string) {
    return this.http.get(this.baseUrl + "consultant/duplicateMail/" + email);
  }

  public duplicatecheckedit(phonenumber: number, id: number) {
    return this.http.get(this.baseUrl + "consultant/duplicatecheck/" + phonenumber + "/" + id);
  }
  public duplicatecheckEmailEdit(email: string, id: number) {
    return this.http.get(this.baseUrl + "consultant/duplicateMailEdit/" + email+ "/" + id);
  }

  //register consultant
  public registerconsultant(entity: any) {
    return this.http.post(this.baseUrl + "consultant/saveconsultant", entity);
  }

  public getSkilldata(id: number) {
    return this.http.get(this.baseUrl + "technology/getskillsbyid/" + id);
  }

  getConsultantList() {
    return this.http.get(this.baseUrl + "consultant/all");
  }

  //used for get consultant entity
  getConsultantById(id: number) {
    return this.http.get(this.baseUrl + "consultant/getbyid/" + id);
  }


  getConsultantList2(flg: string, access: string, userid: number) {
    return this.http.get(this.baseUrl + "consultant/all/" + flg + "/" + access + "/" + userid);
  }

  //used for delete the consultant
  deleteEntity(id: number) {
    return this.http.delete(this.baseUrl + "consultant/delete/" + id);
  }

  changeCOnsultantStatus(id: number, status: string, remarks: string) {
    return this.http.get(this.baseUrl + "consultant/status?id=" + id + "&status=" + status + "&remarks=" + remarks);
  }

  //used for delete the consultant
  moveToSales(id: number, flg: string, remarks: string, userid: number) {
    return this.http.get(this.baseUrl + "consultant/movedtosales/" + id + "/" + flg + "/" + remarks + "/" + userid);
  }


  //used for delete the consultant
  consultantTracker(id: number) {
    return this.http.get(this.baseUrl + "consultant/consultantTrack/" + id);
  }



  downloadfile(id: number): Observable<Blob> {
    return this.http.get(this.baseUrl + "consultant/downloadfiles/" + id, {
      responseType: 'blob'
    });
  }

  // download file
  downloadresume(id: number, flg: string): Observable<Blob> {
    return this.http.get(this.baseUrl + "consultant/download/" + id + "/" + flg, {
      responseType: 'blob'
    });
  }

  removingfile(id: number, flg: string) {
    return this.http.get(this.baseUrl + "consultant/removefile/" + id + "/" + flg);
  }

  removingfiles(id: number) {
    return this.http.get(this.baseUrl + "consultant/removefiles/" + id);
  }

  // supporting drop down apis
  public getrequirements() {
    return this.http.get(this.baseUrl + "requirement/getrequirements");
  }
  public getvisa() {
    return this.http.get(this.baseUrl + "visa/visas");
  }
  public gettech() {
    return this.http.get(this.baseUrl + "technology/tech");
  }
  getcitydetails() {
    return this.http.get(this.baseUrl + "city/city");
  }
  getstatedetails() {
    return this.http.get(this.baseUrl + "states/states");
  }


  getQualification() {
    return this.http.get(this.baseUrl + "qualification/all");
  }

  // for report
  //register consultant
  public consultant_report(entity: any) {
    return this.http.post(this.baseUrl + "consultant/creport", entity);
  }

  //register consultant
  public consultant_DrillDown_report(startDate: any,status:any) {
    return this.http.get(this.baseUrl + "consultant/consultantreport/"+startDate+"/"+status);
  }

}
