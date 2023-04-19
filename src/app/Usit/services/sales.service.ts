import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { SalesConsultant } from '../modal/sales-consultant';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  //private baseUrl = "http://69.216.19.140:8080/usit/"; 
  //private baseUrl = "http://localhost:8090/usit/";
  private baseUrl: any = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }

  // download file
  downloadfile(id: number, type: string): Observable<Blob> {
    return this.http.get(this.baseUrl + "sales/consultant/downloadfiles/" + id + "/" + type, {
      responseType: 'blob'
    });
  }

  //register vms
  public registerEntity(entity: any) {
    return this.http.post(this.baseUrl + "sales/consultant/save", entity);
  }

  //register vms
  public updateEntity(entity: any) {
    return this.http.post(this.baseUrl + "sales/consultant/update", entity);
  }

  //register vms
  public registerEntity2(entity: any, dl2: any) {
    return this.http.get(this.baseUrl + "sales/consultant/uploadMultiple?file1=" + JSON.stringify(dl2) + "&jsondata=" + JSON.stringify(entity));
  }

  //register vms
  public getvisa() {
    return this.http.get(this.baseUrl + "visa/visas");
  }

  public gettech() {
    return this.http.get(this.baseUrl + "technology/tech");
  }

  //used for get the resource
  getAll() {
    return this.http.get(this.baseUrl + "sales/consultant/all");
  }
  //used for get one resource
  getEntityById(id: number) {
    return this.http.get(this.baseUrl + "sales/consultant/getconsultant/" + id);
  }
  //used for delete the resource
  deleteEntity(id: number) {
    return this.http.delete(this.baseUrl + "sales/consultant/delete/" + id);
  }

  //used for delete the resource
  // toggleStatus(consultant: SalesConsultant) {
  //   return this.http.patch(this.baseUrl + "usit/sales/status", consultant);
  // }


  changeStatus2(id: number, status: boolean, remarks: string) {
    return this.http.get(this.baseUrl + "sales/consultant/status?id=" + id + "&status=" + status + "&remarks=" + remarks);
  }

}
