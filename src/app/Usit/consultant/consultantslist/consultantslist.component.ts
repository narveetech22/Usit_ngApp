import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { ConsultantService } from 'src/app/Usit/services/consultant.service';
import { Consultantinfo } from 'src/app/Usit/modal/consultantinfo';

@Component({
  selector: 'app-consultantslist',
  templateUrl: './consultantslist.component.html',
  styleUrls: ['./consultantslist.component.css']
})
export class ConsultantslistComponent implements OnInit {

  hasAcces!: any;
  consultant: Consultantinfo[] = [];
  consultant2 = new Consultantinfo();
  message: any;
  showAlert = false;
  form: any = FormGroup;
  submitted = false;
  flag!: any;
  searchstring!: any;
  ttitle!: string;
  ttitle1!: string;
  tclass!: string;
  consultant_track: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private _service: ConsultantService, private route: ActivatedRoute, private rt: Router, private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.flag = this.activatedRoute.snapshot.params['flg'];
    // alert(this.flag+" ======")
    if (this.flag == 'sales') {
      this.flag = "sales";
      this.ttitle = "back to pre sales";
      
      this.ttitle1 = "move to sales";
      this.tclass = "bi bi-arrow-left-square-fill";
    }
    else if (this.flag == 'presales') {
      this.flag = "presales";
      this.ttitle = "move to sales";
      this.ttitle1 = "back to pre sales";
      this.tclass = "bi bi-arrow-right-square-fill";
    }
    else {
      this.flag = "Recruiting";
    }

    this.hasAcces = localStorage.getItem('role');

    this.getAll(this.flag);
    this.form = this.formBuilder.group(
      {
        comment: ['', Validators.required],
      }
    );
  }

  get f() { return this.form.controls; }
  userid!: any;
  getAll(flg: string) {
    this.userid = localStorage.getItem('userid');
    this._service.getConsultantList2(flg, this.hasAcces, this.userid).subscribe(
      (response: any) => {
        // console.log(response.data)
        this.consultant = response.data;
        console.log( this.consultant)
      
     

      }
     
    
      
    )
    for(let cons in this.consultant ) {
 console.log(cons)
  

    }
    
  
    // if(this.consultant.length==0){

    //   console.log('hello')
      
    
    // }else{
    //   console.log('hello1')
    // }

  }
  
  delete(id: number) {
    alertify.confirm("Remove Record", "Are you sure you want to remove the record ? ", () => {
      this._service.deleteEntity(id).subscribe
        (
          (resp: any) => {
            if (resp.status == 'success') {
              alertify.success("Record Deleted successfully");
            }
            else {
              alertify.error(resp.message);
            }
            this.getAll(this.flag);
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
    if (this.flag == 'sales') {
      this.msg = "Record Moved to Pre Sales";
      this.alertfi = "Are you sure you want to move Consultant to Pre Sales ? "
    }
    else {
      this.msg = "Record Moved to  Sales";
      this.alertfi = "Are you sure you want to move Consultant to Sales ? ";
    }
    this._service.moveToSales(this.consultant2.consultantid, this.flag, this.consultant2.comment,this.userid).subscribe(
      (response: any) => {
        alertify.success(this.msg);
        this.getAll(this.flag);
      });
      this.closeModal.nativeElement.click(); 
  }

  togglestatus!: any;
  edit(vms: any) {
    this.consultant2 = vms;
    this._service.consultantTracker(this.consultant2.consultantid).subscribe(
      (response: any) => {
        this.consultant_track = response.data;
        //alert(this.consultant_track);
      });
    //consultantTrack
  }

  moveProfileToSales(vms: any){
    this.consultant2 = vms;
    alertify.confirm("Move Profile", "Are you sure you want to move Profile to Sales ? ", () => {
      this._service.moveToSales(this.consultant2.consultantid, this.flag, this.consultant2.comment,this.userid).subscribe
        (
          (resp: any) => {
            if (resp.status == 'success') {
              alertify.success("Profile moved to sales successfully");
            }
            else {
              alertify.error(resp.message);
            }
            this.getAll(this.flag);
          }
        );
    }, function () { })
    
  }
  alertfi!: string;
  msg!: string;
  // pagination code
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  onTableDataChange(event: any) {
    this.page = event;
    this.getAll(this.flag);
  }
  
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAll(this.flag);
  }

}
