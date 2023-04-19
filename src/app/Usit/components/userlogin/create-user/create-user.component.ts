import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as alertify from 'alertifyjs';
import { UsermanagementService } from 'src/app/Usit/services/usermanagement.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
})
export class CreateUserComponent implements OnInit {

  form: any = FormGroup;
  submitted = false;
  consultant = false;
  message!: string;
  constructor(private _service:UsermanagementService,private formBuilder: FormBuilder) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        personalcontactnumber: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]],
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')]],
        status: 'Request',
        technology: [''],
        experience: [''],
        location: [''],
        role: this.formBuilder.group({
          roleid: 1,
        }),
        designation: ['', Validators.required]
      }
    );

    this.form.get('accounttype').valueChanges.subscribe((res: any) => {
      const tech = this.form.get('technology');
      const exp = this.form.get('experience');
      const loc = this.form.get('location');
      if (res === "Consultant" || res === "Jobseeker") {
        this.consultant = true;
        tech.setValidators(Validators.required);
        exp.setValidators(Validators.required);
        exp.setValidators(Validators.pattern("^[0-9]*$"));
        loc.setValidators(Validators.required);
      }
      else {
        this.consultant = false;
        tech.clearValidators();
        exp.clearValidators();
        loc.clearValidators();
      }
      tech.updateValueAndValidity();
      exp.updateValueAndValidity();
      loc.updateValueAndValidity();
    });

  }
  userLogin() {
    this.message = '';
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    //console.log(JSON.stringify(this.form.value, null, 2));

    this._service.registerEMployee(this.form.value)
      .subscribe((data: any) => {
        if (data.status == 'Success') {
          alertify.success("Registration Successful");
          this.message = " Your Successfully register. you will recieve login link after admin approval"
          this.form.reset();
          this.submitted = false;
        }
        else {
          alertify.error("Sorry Server not available now");
        }
      });
  }
}
