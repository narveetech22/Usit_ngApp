import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { Role } from 'src/app/Usit/modal/role';
import { RoleService } from 'src/app/Usit/services/role.service';
import { UsermanagementService } from 'src/app/Usit/services/usermanagement.service';

@Component({
  selector: 'app-register-role',
  templateUrl: './register-role.component.html',
  styleUrls: ['./register-role.component.css']
})
export class RegisterRoleComponent implements OnInit {

  form: any = FormGroup;
  submitted = false;
  message!: string;
  roleent = new Role();

  constructor(private service: UsermanagementService, private router: Router, private formBuilder: FormBuilder) { }

  MyArrayType = Array<{ id: number, text: string }>;
  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        rolename: ['', Validators.required],
        //roleno: ['', Validators.required],
        description: [this.form.description]
      }
    );
  }
  public onSubmit() {
    this.message = '';
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.service.addrole(this.roleent)//this.form.value
      .subscribe((data: any) => {
        if (data.status == 'Success') {
          alertify.success("Role Added successfully");
          this.router.navigate(['list-roles']);
        }
        else {
          this.message = data.message;
          alertify.error("Role Already Exists");
        }
      });
  }

}
