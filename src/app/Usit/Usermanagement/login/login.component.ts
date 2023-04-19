import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Employee } from '../../modal/employee';
import { UsermanagementService } from '../../services/usermanagement.service';
import * as alertify from 'alertifyjs';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = FormGroup;
  user = new Employee();
  message = "";
  submitted = false;
  psw = "Narvee123$";
  rememberMe: any;
  loading = false;
  crds:any;
  password:any;
  email:any;


  show = false;
  // showPassword = false;
  constructor(private service: UsermanagementService, private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', Validators.required],
        rememberMe: ['', Validators.required],
       
      }
    );
    this.rememberMe = false;
  // this. onClick()
  
  }
  // onClick() {
  //   if (this.password === 'password') {
  //     this.password = 'text';
  //     this.show = true;
  //   } else {
  //     this.password = 'password';
  //     this.show = false;
  //   }
  // }
  userLogin() {
    this.submitted = true;
    // debugger

    
    if (this.form.invalid) {
      return;
    }  //user this.form.value
    // this.loading = true;
    this.service.login(this.form.value).subscribe(
      (result:any) => {
       // console.log(result.data)
    
       this.crds=this.form.value
       console.log(this.crds)
        this.user = result.data ;
        this.authService.login(this.user,this.form.value)
          .subscribe(data => {
            this.AutoLogin()
            
            // if(this.rememberme) {
            //   localStorage.setItem('rememberme', 'yes')
            // }
            
            this.router.navigate(['/dashboard']);
          
           
            alertify.success("Login Successful ");
          });
        

      }, (error: any) => {
        this.loading = false;
        if (error.status == 401) {
          //alert("hello")
          this.message = 'invalid credentials';
          alertify.error("invalid credentials");
         
            
        }
        else {
          this.message = 'Failed to connect Server';
          alertify.error("Failed to connect Server");
        }
      });
      
  }
  AutoLogin(){   
    const accessTokenObj = localStorage.getItem("token");
    // Retrieve rememberMe value from local storage
    const rememberMe = localStorage.getItem('rememberMe');
console.log(accessTokenObj , "tokennnnnnnnnnnnnnnnnnnnnnnnnn");
console.log(rememberMe)
    if (accessTokenObj && rememberMe == 'yes') {
      this.router.navigate(['/dashboard']);
    } else {
    
    }
   }
  



}
