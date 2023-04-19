import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { Recruiter } from 'src/app/Usit/modal/recruiter';
import { RecruiterService } from 'src/app/Usit/services/recruiter.service';
@Component({
  selector: 'app-list-recruiter',
  templateUrl: './list-recruiter.component.html',
  styleUrls: ['./list-recruiter.component.css']
})
export class ListRecruiterComponent implements OnInit {
  hasAcces!: any;
  form: any = FormGroup;
  datarr: any[] = [];
  tech = new Recruiter();
  submitted = false;
  dtmodal!: string;
  //role!:any;
  department!: any;
  role!:any;
  searchstring!:any;
  loginId!:any;
  constructor(private service: RecruiterService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginId = localStorage.getItem('userid');
    this.hasAcces = localStorage.getItem('role');
    this.department = localStorage.getItem('department');
    //this.rolono = localStorage.getItem('department');

    this.getall();
    this.form = this.formBuilder.group(
      {
        remarks: ['', Validators.required],
      }
    );
  }

  getall() {
    return this.service.getAll().subscribe(
      ((response: any) => {
        // console.log(response.data)
        this.datarr = response.data;
       // console.log(JSON.stringify(response.data))
      })
    );
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
   // console.log(JSON.stringify(this.tech)+" ===================")
  }
  delete(id: number) {

    alertify.confirm("Remove Recruiter", "Are you sure you want to remove the Recruiter ? ", () => {
      this.service.deleteEntity(id).subscribe
        (
          (resp: any) => {
            if (resp.status == 'Success') {
              alertify.success("Recruiter Deleted successfully");
            }
            else {
              alertify.error("Record Deletion failed");
            }
            this.getall();
          }
        );
    }, function () { })

  }

  public action(id: number,rtype:string, action: string) {

    let type="";
    let act = "";

    if(this.department!=rtype && rtype!='Both' && (this.department!='Administration')){
      alertify.error("Your not Authorized to approve or reject Recruiter");
      return;
    }
    if(action=='Approved'){
      type=" Approve Recruiter";
      act = "Are you sure you want to Approve the Recruiter ?";
    }
    else{
      type="Reject Recruiter";
      act = "Are you sure you want to Reject the Recruiter ?";
    }
    alertify.confirm(type, act, () => {
      this.service.approve(this.hasAcces, action, id).subscribe
        (
          (response: any) => {
            alert(JSON.stringify(response))
            if (response.status == 'Approved') {
              alertify.success("Recruiter " + response.data + " successfully");
            }
            else {
              alertify.success("Recruiter " + response.data + " successfully");
            }
            this.getall();
          }
        );
    }, function () { })

   /* this.service.approve(this.ROLEID, action, id).subscribe(
      (response: any) => {
        if (response.status == 'Success') {
          alertify.success("Record Updated successfully");
        }
        else {
          alertify.error("Record Updation failed");
        }
        this.getall();
      })
      */
  }

  @ViewChild('closeModal') private closeModal:any= ElementRef;
  public updatestatus() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    //console.log(this.tech);
    this.service.changeStatus2(this.tech.id, this.tech.status, this.tech.remarks).subscribe(
      (response: any) => {
        alertify.success("Status Updated successfully");
        this.getall();
      });
      this.closeModal.nativeElement.click(); 
  }

    // pagination code
    page: number = 1;
    count: number = 0;
    tableSize: number = 20;
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
