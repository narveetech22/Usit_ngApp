import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as alertify from 'alertifyjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/Usit/modal/role';
import { Router } from '@angular/router';
import { UsermanagementService } from 'src/app/Usit/services/usermanagement.service';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent implements OnInit {
  form: any = FormGroup;
  datarr: Role[] = [];
  tech = new Role();
  submitted = false;

  dtmodal!: string;
  constructor(private service: UsermanagementService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getall();
    this.form = this.formBuilder.group(
      {
        remarks: ['', Validators.required],
      }
    );
  }

  getall() {
    return this.service.roleslist().subscribe(
      ((response: any) => {
        this.datarr = response.data;
      })
    );
  }
  get f() { return this.form.controls; }
  edit(editform: any) {
    this.tech = editform;
    if (this.tech.status == "Active") {
      this.togglestatus = "In Active";
    }
    else {
      this.togglestatus = "Active";
    }

  }
  deletevms(id: number) {
    alertify.confirm("Remove Role", "Are you sure you want to remove the Role ? ", () => {
      this.service.deleterole(id).subscribe
        (
          (resp: any) => {
            if (resp.status == 'success') {
              alertify.success("Role Deleted successfully");
              this.getall();
            }
            else {
              alertify.error(resp.message);
            }

          }
        );
    }, function () { })
  }

  @ViewChild('closeModal') private closeModal:any= ElementRef;
  togglestatus!: any;
  public updatestatus() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.dtmodal = "Active";
    this.service.changeROleStatus(this.tech).subscribe(
      (response: any) => {
        alertify.success("Status Updated successfully");
        this.getall();
      });
      this.closeModal.nativeElement.click();
  }
  // pagination code
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  onTableDataChange(event: any) {
    this.page = event;
    this.getall();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getall();
  }
}
