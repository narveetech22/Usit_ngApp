import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  //private baseUrl = "http://69.216.19.140:8080/usit/"; 
  //private baseUrl = "http://localhost:8090/usit/";
  private baseUrl: any = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }

  //register vms
  // public dummy(entity: any) {
  //   return this.http.post(this.baseUrl + "city/save", entity);
  // }
  /// previllages //

  //register vms
  public registerprevilage(entity: any) {
    return this.http.post(this.baseUrl + "priv/save", entity);
  }

  //

  //used for get one resource
  getallprivilages(id: number) {
    return this.http.get(this.baseUrl + "priv/all/" + id);
  }

  public restapi(entity: any) {
    return this.http.post(this.baseUrl + "priv/savePrevileges", entity);
  }

}
