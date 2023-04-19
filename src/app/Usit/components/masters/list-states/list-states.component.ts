import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { States } from 'src/app/Usit/modal/states';
import { MastersService } from 'src/app/Usit/services/masters.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-list-states',
  templateUrl: './list-states.component.html',
  styleUrls: ['./list-states.component.css']
})
export class ListStatesComponent implements OnInit {

  form: any = FormGroup;
  datarr: States[] = [];
  tech = new States();
  submitted = false;
  dtmodal!: string;
  hasAcces!: any;
  constructor(private service: MastersService, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.hasAcces = localStorage.getItem('role');
    this.getall();
  }

  getall() {
    return this.service.getAllstates().subscribe(
      ((response: any) => {
        this.datarr = response.data;
      })
    );
  }

  delete(id: number) {
    alertify.confirm("Remove Record", "Are you sure you want to remove the State ? ", () => {
      this.service.deletestate(id).subscribe
        (
          (resp: any) => {
            if (resp.status == 'success') {
              alertify.success("State Deleted successfully");
            }
            else if (resp.status == 'fail') {
              alertify.error(resp.message);
            }
            else {
              alertify.error(resp.message);
            }
            this.getall();
          }
        );
    }, function () { })
  }


  // pagination code
  POSTS: any;
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
