import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/Usit/modal/vendor';
import { VendorService } from 'src/app/Usit/services/vendor.service';
import * as alertify from 'alertifyjs';
import { RecruiterService } from 'src/app/Usit/services/recruiter.service';
import { Recruiter } from 'src/app/Usit/modal/recruiter';
import { read, utils, writeFile } from 'xlsx';
@Component({
  selector: 'app-list-vendor',
  templateUrl: './list-vendor.component.html',
  styleUrls: ['./list-vendor.component.css']
})
export class ListVendorComponent implements OnInit {
  list: any[] = [];
  hasAcces!: any;
  form: any = FormGroup;
  datarr: any[] = [];//Vendor[] = [];
  entity: any[] = [];
  tech = new Vendor();
  submitted = false;
  dtmodal!: string;
  recrData: Recruiter[] = [];
  role!: any;
  company!: string;
  arr = new Array(100);
  department!: any;// 1;//localStorage.getItem('ROLEID');
  file!: any;
  togglestatus!: any;
  errmsg!: any;
  searchstring!:any;
  loginId!:any;
  constructor(private rservice: RecruiterService, private service: VendorService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.hasAcces = localStorage.getItem('role');
    this.loginId = localStorage.getItem('userid');
    this.department = localStorage.getItem('department');
    this.getall();
    this.form = this.formBuilder.group(
      {
        remarks: ['', Validators.required],
      }
    );
  }
  handleImport(event: any) {
    this.file = event.target.files[0];
    const files = event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          // if(rows.toString)
          this.list = rows;
          //  this.excel2 = rows;
          // console.log(rows)
        }
      }
      reader.readAsArrayBuffer(file);
    }
  }

  getrecrinfo(id: number, company: string) {
    this.company = company;
    return this.rservice.getEntitybyCompany(id).subscribe(
      ((response: any) => {
        this.recrData = response.data;
      })
    );
  }

  getall() {
    return this.service.getAll().subscribe(
      ((response: any) => {
       //console.log(response.data)
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
    // console.log(this.tech)
  }
  delete(id: number) {
    alertify.confirm("Remove Vendor", "Are you sure you want to remove the Vendor ? ", () => {
      this.service.deleteEntity(id).subscribe
        (
          (resp: any) => {
            if (resp.status == 'success') {
              alertify.success("Vendor Deleted successfully");
            }
            else {
              this.errmsg = resp.message;
              alertify.error(resp.message);
            }
            this.getall();
          }
        );
    }, function () { })
  }

  public action(id: number,ctype:string, action: string) {
    let type = "";
    let act = "";
    if(this.department!=ctype && ctype!='Both' && (this.department!='Administration')){
      alertify.error("Your not Authorized to approve or reject the Vendor");
      return;
    }
    if (action == 'Approved') {
      type = " Approve Vendor";
      act = "Are you sure you want to Approve the Vendor ?";
    }
    else {
      type = "Reject Vendor";
      act = "Are you sure you want to Reject the Vendor ?";
    }
    alertify.confirm(type, act, () => {
      this.service.approvevms(this.hasAcces, action, id).subscribe
        (
          (response: any) => {
            if (response.status == 'Approved') {
              alertify.success("Vendor " + response.data + " successfully");
            }
            else {
              alertify.success("Vendor " + response.data + " successfully");
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
    //console.log(JSON.stringify(this.tech)+" ------");
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
