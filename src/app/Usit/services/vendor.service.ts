import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

   //private baseUrl = "http://69.216.19.140:8080/usit/"; 
  //private baseUrl = "http://localhost:8090/usit/";
  private baseUrl : any = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }

  //register vms
  public registerEntity(entity: any) {
    return this.http.post(this.baseUrl + "vendor/save", entity);
  }

  //used for get the resource
  getAll() {
    return this.http.get(this.baseUrl + "vendor/all");
  }

  deleteEntity(id: number) {
    return this.http.delete(this.baseUrl + "vendor/delete/" + id);
  }
  getEntity(id: number) {
    return this.http.get(this.baseUrl + "vendor/vendor/" + id);
  }

  //register vms
  public updateEntity(entity: any) {
    return this.http.put(this.baseUrl + "vendor/vendor", entity);
  }
  approvevms(role: string, action: string, id: number) {//this.role,action,id
    return this.http.get(this.baseUrl + "vendor/approve?stat=" + action + "&id=" + id);
  }

  //used for delete the resource
  changeStatus(entity: any) {
    return this.http.patch(this.baseUrl + "vendor/status", entity);
  }

  changeStatus2(id: number, status: string, remarks: string) {
    return this.http.get(this.baseUrl + "vendor/status?id=" + id + "&status=" + status + "&remarks=" + remarks);
  }

  search(keyword: string) {
    return this.http.get(this.baseUrl + "users/search2/" + keyword);
  }

  uploadexcel(file: any) {
    return this.http.post(this.baseUrl + "vendor/upload", file);
  }

}
