import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesInterview } from 'src/app/Usit/modal/sales-interview';
import { SalesInterviewService } from 'src/app/Usit/services/sales-interview.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-list-interview',
  templateUrl: './list-interview.component.html',
  styleUrls: ['./list-interview.component.css']
})
export class ListInterviewComponent implements OnInit {
  hasAcces!: any;
  intentity = new SalesInterview();
  entity: any[] = [];
  submitted = false;
  registerForm: any = FormGroup;
  showAlert = false;
  flag!: string;
  searchstring!:any;
  constructor(private activatedRoute: ActivatedRoute, private service: SalesInterviewService, private rt: Router) { }

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.flag = this.activatedRoute.snapshot.params['flg'];
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
    this.service.getlist(flg,this.hasAcces,this.userid).subscribe(
      (response: any) => {
        this.entity = response.data;
      }
    )
  }
  edit(from2: any) {
  }

  delete(id: number) {
    alertify.confirm("Remove Record", "Are you sure you want to remove the record ? ", () => {
      this.service.deleteEntity(id).subscribe
        (
          (resp: any) => {
            if (resp.status == 'Success') {
              alertify.success("Record Deleted successfully");
            }
            else {
              alertify.error("Record Deletion failed");
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
