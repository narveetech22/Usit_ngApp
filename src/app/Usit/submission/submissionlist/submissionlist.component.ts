import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Submission } from '../../modal/submission';
import { SubmissionService } from '../../services/submission.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-submissionlist',
  templateUrl: './submissionlist.component.html',
  styleUrls: ['./submissionlist.component.css']
})
export class SubmissionlistComponent implements OnInit {
  entity: Submission[] = [];
  submitted = false;
  flag!: any;
  hasAcces!: any;
  searchstring!:any;
  constructor(private activatedRoute: ActivatedRoute, private _service: SubmissionService, private router: Router, private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.flag = this.activatedRoute.snapshot.params['flg'];
   // console.log("kiran " + this.flag)
    if (this.flag == 'sales') {
      this.flag = "sales";
    }
    else {
      this.flag = "Recruiting";
    }
    this.hasAcces = localStorage.getItem('role');
    this.getAll(this.flag);
  }
  userid!: any;
  getAll(flg: string) {
    this.userid = localStorage.getItem('userid');
    this._service.getsubmissiondata(flg,this.hasAcces,this.userid).subscribe(
      (response: any) => {
        this.entity = response.data;
      }
    )
  }

  delete(id: number) {
    alertify.confirm("Remove Record", "Are you sure you want to remove the record ? ", () => {
      this._service.deletesubmission(id).subscribe
        (
          (resp: any) => {
            if (resp.status == 'Success') {
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
