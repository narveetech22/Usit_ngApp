import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Usit/modal/employee';
import * as alertify from 'alertifyjs';
import { UsermanagementService } from 'src/app/Usit/services/usermanagement.service';
import { ElementRef,  ViewChild } from '@angular/core';
@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  form: any = FormGroup;
  datarr: Employee[] = [];
  tech = new Employee();
  submitted = false;
  searchstring!:any;
  constructor(private service: UsermanagementService, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.getall();
    this.form = this.formBuilder.group(
      {
        remarks: ['', Validators.required],
      }
    );
  }

  getall() {//listEmployees
    return this.service.listEmployees().subscribe(
      ((response: any) => {
        this.datarr = response.data;
        // console.log(response.data)
      }));
  }
  togglestatus!:any;
  get f() { return this.form.controls; }
  edit(editform: any) {
    this.tech = editform;
    if(this.tech.status=="Active"){
      this.togglestatus = "In Active";
    }
    else{
      this.togglestatus = "Active";
    }
  }
  deletevms(id: number) {
    alertify.confirm("Remove Employee", "Are you sure you want to remove the Employee ? ", () => {
      this.service.deleteEmployeeById(id).subscribe
        (
          (resp: any) => {
            if (resp.status == 'Success') {
              alertify.success("Employee Deleted successfully");
            }
            else {
              alertify.error("Record Deletion failed");
            }
            this.getall();
          }
        );
    }, function () { })
  }
  @ViewChild('closeModal') private closeModal:any= ElementRef;
  public updatestatus() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.service.changeEmployeeStatus(this.tech).subscribe(
      (response: any) => {
        if (response.status == 'Success') {
          alertify.success("Status Updated successfully");
        }
        else {
          alertify.error("Status Not Updated ");
        }
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
