import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesInterviewService {

  //private baseUrl = "http://69.216.19.140:8080/usit/"; 
  //private baseUrl = "http://localhost:8090/usit/";
  private baseUrl: any = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }

  //register vms
  public registerEntity(entity: any) {
    return this.http.post(this.baseUrl + "sales/interview/save", entity);
  }

  //register vms
  public updateEntity(entity: any) {
    return this.http.put(this.baseUrl + "users/update", entity);
  }

  //used for get the resource
  getlist(flg: string,access:string,userid:number) {
    return this.http.get(this.baseUrl + "sales/interview/all/" + flg+"/"+access+"/"+userid);
  }

  getsubmissions(flg: string,id:any,role:string) {
    return this.http.get(this.baseUrl + "sales/interview/submissiondetails/" + flg+"/"+id+"/"+role);
  }

  //used for delete the resource
  deleteEntity(id: number) {
    return this.http.delete(this.baseUrl + "sales/interview/delete/" + id);
  }

  //used for get one resource
  getEntity(id: number) {
    return this.http.get(this.baseUrl + "sales/interview/getinterview/" + id);
  }


}
