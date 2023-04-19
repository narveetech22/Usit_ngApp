import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Employee } from './Usit/modal/employee';
import { ActivatedRoute, Router } from '@angular/router';
//import { map } from 'rxjs/operators';
import * as alertify from 'alertifyjs';
import { RoleService } from './Usit/services/role.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn: boolean = false;
  user = new Employee();
  selectedRoles: string[] = [];
  id!:any;
  rememberMe:any
  constructor(private route: ActivatedRoute, private router: Router,private service:RoleService) { }

  login(user: any,logincrd:any) {
   console.log("authentication " + JSON.stringify(user))
    this.isUserLoggedIn = true;
    localStorage.setItem('userName', user.fullname);
    localStorage.setItem('token', 'HTTP_TOKEN ' + user.token);
    localStorage.setItem('role', user.roles);
    localStorage.setItem('department',user.department);
    localStorage.setItem('userid', user.userid);
    localStorage.setItem('rememberMe', logincrd.rememberMe);
    localStorage.setItem('email', logincrd.email);
    localStorage.setItem('password', logincrd.password);
    
    this.id = user.roleno;

    if (this.rememberMe) {
    
      localStorage.setItem('email', logincrd.email);
      localStorage.setItem('token', user.token);
     
  } else {
    
      sessionStorage.setItem('email', logincrd.email);
      sessionStorage.setItem('token', user.token);
  
  }
    /* getting previlages of logged in user
    this.service.getallprivilages(this.id).subscribe(
      (response: any) => {
        console.log("=== "+JSON.stringify(response.data));
       // response.data.forEach(
         // client:any => {
         // if (client.privid != null) {
           // this.selectedRoles.push(client.privid);
         // }
        //});saikiran@narveetech.com
      }
    );

    */

  

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap(val => {
        //console.log("Is User Authentication is successful: " + val);
      })
    );

  }

  logout(): void {
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('roleno');
    localStorage.removeItem('userid');
    localStorage.removeItem('department');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    
  }

  signout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userid');
    localStorage.removeItem('roleno');
    localStorage.removeItem('department');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    alertify.warning("Token expired please login");
    this.router.navigate(['/']);
    //this.router.navigateByUrl('signin');
  }

  isUserSignedin() {
    return localStorage.getItem('token') !== null;
  }

  getSignedinUser() {
    return localStorage.getItem('user') as string;
  }

  getToken() {
    let token = localStorage.getItem('token') as string;
    return token;
  }
  
}
