import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../modal/employee';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {

  private baseUrl: string = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }

  // login controller signin method
  login(user: Employee): Observable<any> {
    console.log(user)
    return this.http.post<any>(this.baseUrl + 'login/signin', user,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(map((resp) => {
        return resp;
      }));
  }

  // send forgot password reset link
  // myprofileresetlink
  sendresetlink(user: any) {
    return this.http.post(this.baseUrl + "login/sendlink", user);
  }
  // reset user profile password
  resetpassword(user: any) {
    return this.http.post(this.baseUrl + "login/reset_password", user);
  }

  // roles management
  //register vms
  public addrole(entity: any) {
    return this.http.post(this.baseUrl + "roles/save", entity);
  }

  roleslist() {
    return this.http.get(this.baseUrl + "roles/all");
  }

  public deleterole(id: number) {
    return this.http.delete(this.baseUrl + "roles/delete/" + id);
  }

  //used for delete the resource
  changeROleStatus(entity: any) {
    return this.http.patch(this.baseUrl + "roles/status", entity);
  }

  //used for get one resource
  getrolebyid(id: number) {
    return this.http.get(this.baseUrl + "roles/getrole/" + id);
  }

  //update role
  public updateROle(entity: any) {
    return this.http.put(this.baseUrl + "roles/updaterole", entity);
  }

  //employee management

  getRolesdropdown() {
    return this.http.get(this.baseUrl + "users/getroles");
  }

  getManagerdropdown() {
    return this.http.get(this.baseUrl + "users/manageDropDown");
  }

  getTLdropdown(id: number) {
    return this.http.get(this.baseUrl + "users/TlDropDown/" + id);
  }

  //register EMployee
  public registerEMployee(entity: any) {
    return this.http.post(this.baseUrl + "users/save", entity)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // error logging,  you can do a lot more, see below
          console.error('An error occurred:', error.error)
          return throwError(error)
        })
      );
  }


  //used for get the resource
  listEmployees() {
    return this.http.get(this.baseUrl + "users/all");
  }

  public deleteEmployeeById(id: number) {
    return this.http.delete(this.baseUrl + "users/delete/" + id);
  }

  //used for delete the resource
  changeEmployeeStatus(entity: any) {
    return this.http.patch(this.baseUrl + "users/status", entity);
  }

  //used for get one resource
  getEmployeeById(id: number) {
    return this.http.get(this.baseUrl + "users/userbyid/" + id);
  }

  //used for get one resource
  getEmployeeInfoById(id: number) {
    return this.http.get(this.baseUrl + "users/userinfo/" + id);
  }
  //Update Employee
  public updateEmployee(entity: any) {
    return this.http.put(this.baseUrl + "users/update", entity);
  }
}
