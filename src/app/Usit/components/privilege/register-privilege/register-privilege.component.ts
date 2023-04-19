import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from 'src/app/Usit/services/role.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-register-privilege',
  templateUrl: './register-privilege.component.html',
})
export class RegisterPrivilegeComponent implements OnInit {
  form: any = FormGroup;
  message!: string;
  submitted = false;
  constructor(private service: RoleService, private formBuilder: FormBuilder) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        type: ['', Validators.required],
        name: ['', Validators.required],
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.service.registerprevilage(this.form.value)//this.form.value
      .subscribe((data: any) => {
        //console.log(data.status)
        if (data.status == 'Success') {
          alertify.success("Previlage Added successfully");
          //this.form.reset();
          //this.router.navigate(['list-roles']);
          //this.Redirect();
        }
        else {
          this.message = data.message;
          alertify.error("Previlage Already Exists");
        }
        //console.log(data);
      });

  }

}
