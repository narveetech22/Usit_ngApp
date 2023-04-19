import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  form:any= FormGroup;
  email!: string;
  message="";
  submitted = false;
  password!: string;
  newpassword!: string;
  resetPasswordToken!: string;
  
 constructor(private activatedRoute:ActivatedRoute,private formBuilder: FormBuilder) { }
 get f() { return this.form.controls; }
 ngOnInit(): void {
  this.resetPasswordToken = this.activatedRoute.snapshot.params['id'];
  this.form = this.formBuilder.group(
    {
     // userid : localStorage.getItem('userid'),
      resetPasswordToken : this.resetPasswordToken,
      password : ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')]],
      newpassword : ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')]],
    }
  );
 }
 registernow(){
  /*
  this.submitted = true;
  if (this.form.invalid) {
    return;
  }
  if(this.password!=null && this.newpassword!=null){
    if(this.password!=this.newpassword){
      this.message="New Password & Confirm Password are not same !";
      return;
    }
  }
    console.log(JSON.stringify(this.form.value, null, 2));
    this.service.myprofileresetlink(this.form.value)
    .subscribe((data:any)=>{
      console.log(data)
      if(data.status=='success'){
        alertify.warning("Your Password has been changed");
        this.message = " Your Password has been changed"
        this.form.reset(); //Kiran123$
        this.submitted = false;
       }
       else{
        alertify.error("Sorry Server not available now");
       }
    });
 */
 }

}
