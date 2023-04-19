import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RecruiterService {

  //private baseUrl = "http://69.216.19.140:8080/usit/"; 
  //private baseUrl = "http://localhost:8090/usit/";
  private baseUrl: any = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }

  //register vms
  public registerEntity(entity: any) {
    return this.http.post(this.baseUrl + "recruiter/save", entity);
  }

  //used for get the resource
  getAll() {
    return this.http.get(this.baseUrl + "recruiter/all");
  }

  deleteEntity(id: number) {
    return this.http.delete(this.baseUrl + "recruiter/delete/" + id);
  }
  getEntity(id: number) {
    return this.http.get(this.baseUrl + "recruiter/recruiter/" + id);
  }

  getEntitybyCompany(id: number) {
    return this.http.get(this.baseUrl + "recruiter/recrbycompany/" + id);
  }

  //register vms
  public updateEntity(entity: any) {
    return this.http.put(this.baseUrl + "recruiter/recruiter", entity);
  }

  getCompanies(flg:string) {
    return this.http.get(this.baseUrl + "recruiter/venodorCompanies/"+flg);
  }

  //used for delete the resource
  changeStatus(entity: any) {
    return this.http.patch(this.baseUrl + "recruiter/status", entity);
  }

  changeStatus2(id: number, status: string, remarks: string) {
    return this.http.get(this.baseUrl + "recruiter/status?id=" + id + "&status=" + status + "&remarks=" + remarks);
  }

  approve(role: number, action: string, id: number) {//this.role,action,id
    return this.http.get(this.baseUrl + "recruiter/approve?stat=" + action + "&id=" + id);
  }

  uploadexcel(file: any) {
    return this.http.post(this.baseUrl + "recruiter/upload", file);
  }

}
