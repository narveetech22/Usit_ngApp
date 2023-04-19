import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/Usit/modal/role';
import * as alertify from 'alertifyjs';
import { UsermanagementService } from 'src/app/Usit/services/usermanagement.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {
  submitted = false;
  form: any = FormGroup;
  id!: number;
  tech = new Role();
  message!: string;
  constructor(private service: UsermanagementService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.service.getrolebyid(this.id).subscribe(
      (response: any) => {// console.log(response.data); 
        this.tech = response.data
      }
    )
    this.form = this.formBuilder.group(
      {
        rolename: ['', Validators.required],
        description: [this.form.description],
        roleid: [this.form.roleid],
        status: [this.form.status],
        remarks: [this.form.remarks],
      }
    );
  }

  public onSubmit() {
    this.message = '';
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.tech.updatedby = localStorage.getItem('userid');
    this.service.updateROle(this.tech)
      .subscribe((data: any) => {
        if (data.status == 'Success') {
          alertify.success("Role Updated successfully");
          this.router.navigate(['list-roles']);
        }
        else {
          this.message = data.message;
          alertify.error("Role Already Exists");
        }
      });
  }
}
