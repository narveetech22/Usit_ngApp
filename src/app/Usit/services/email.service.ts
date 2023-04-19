import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // private baseUrl = "http://69.216.19.140:8080/usit/"; 
  // private baseUrl = "http://localhost:8090/usit/";
  private baseUrl: any = environment.API_BASE_URL;
  // private baseUrl = "http://localhost:8090/usit/";
  //private baseUrl1 = "http://localhost:9080/kiran/";
  //private baseUrl = "http://69.216.19.140:8080/usit/"; 
  //private baseUrl = "http://localhost:8090/usit/";
  // private baseUrl : string = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }
  getallmail() {
    return this.http.get(this.baseUrl + "mail/getMails");
  }

  deleteEmailByIds(ids: any) {
    return this.http.post(this.baseUrl + "mail/deleteMailByIds", ids);
  }
  //used for get the resource
  deleteAndMove() {
    return this.http.get(this.baseUrl + "mail/deleteAndMove");
  }
  movemail() {
    return this.http.get(this.baseUrl + "mail/insertmails");
  }
  getbyid(id: number) {
    return this.http.get(this.baseUrl + "mail/getbyid/" + id);
  }
  extractmail(form: any) {
    return this.http.post(this.baseUrl + "email/extractemails", form);

  }

  downloadExcel() {
    return this.http.get(this.baseUrl + "email/getMails");
  }
}
