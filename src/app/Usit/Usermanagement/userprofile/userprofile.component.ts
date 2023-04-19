import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsermanagementService } from '../../services/usermanagement.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  form: any = FormGroup;
  currentpassword!: string;
  newpassword!: string;
  confirmpassword!: string;
  message!: string;
  fail!: string;
  submitted = false;
  username = localStorage.getItem('userName');
  designation = localStorage.getItem('role');
  constructor(private formBuilder: FormBuilder, private service: UsermanagementService) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    const addedby = localStorage.getItem('userid');
    this.form = this.formBuilder.group(
      {
        password: ['', Validators.required],
        userid: localStorage.getItem('userid'),
        newpassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')]],
        renewpassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')]],
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.newpassword != null && this.confirmpassword != null) {
      if (this.newpassword != this.confirmpassword) {
        this.fail = "New Password & Confirm Password are not same !";
        this.message = "";
        return;
      }
    }
    //console.log(JSON.stringify(this.form.value, null, 2));
    this.service.resetpassword(this.form.value)
      .subscribe((data: any) => {
        //console.log(data)
        if (data.status == 'samepassword') {
          alertify.warning("New Password and Old Password Both are same ");
          this.fail = " Your New Password and Old Password Both are same, please enter different password"
          //this.form.reset(); Kiran123$
          this.message = "";
          this.submitted = false;
        }
        else if (data.status == 'fail') {
          alertify.warning("Old Password is Incorrect ");
          this.message = "";
          this.fail = " Old Password is Incorrect";
          this.submitted = false;
        }
        else if (data.status == 'success') {
          alertify.success(data.message);
          this.message = data.message;
          this.fail = "";
          this.submitted = false;
          this.form.reset();
        }
        else {
          alertify.error("Sorry Server not available now");
        }
      });
  }

}
