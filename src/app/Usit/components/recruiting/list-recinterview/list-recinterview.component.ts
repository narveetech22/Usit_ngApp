import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SalesInterview } from 'src/app/Usit/modal/sales-interview';
//import { SalesInterviewService } from 'src/app/Usit/services/sales-interview.service';
import * as alertify from 'alertifyjs';
import { RecruitinginterviewService } from 'src/app/Usit/services/recruitinginterview.service';

@Component({
  selector: 'app-list-recinterview',
  templateUrl: './list-recinterview.component.html',
  styleUrls: ['./list-recinterview.component.css']
})
export class ListRecinterviewComponent implements OnInit {

  intentity = new SalesInterview();
  entity: any[] = [];
  submitted = false;
  registerForm: any = FormGroup;
  showAlert = false;
  message!: string;
  hasAcces!: any;
  constructor(private service: RecruitinginterviewService, private rt: Router) { }

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.hasAcces = localStorage.getItem('role');
    this.getAll();
  }

  getAll() {
    this.service.getlist().subscribe(
      (response: any) => {
        this.entity = response.data;
        //console.log(response+" kiran"+JSON.stringify(this.entity));
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
            this.getAll();
          }
        );
    }, function () { })
  }


  generatePageItems(total: number, current: number, width: number) {
    const MINIMAL_PAGE_ITEM_COUNT = 7;
    if (width < MINIMAL_PAGE_ITEM_COUNT) {
      throw new Error(`Must allow at least ${MINIMAL_PAGE_ITEM_COUNT} page items`);
    }
    if (width % 2 === 0) {
      throw new Error(`Must allow odd number of page items`);
    }
    if (total < width) {
      return [...new Array(total).keys()];
    }
    const left = Math.max(0, Math.min(total - width, current - Math.floor(width / 2)));
    const items: (string | number)[] = new Array(width);
    for (let i = 0; i < width; i += 1) {
      items[i] = i + left;
    }
    // replace non-ending items with placeholders
    if (items[0] > 0) {
      items[0] = 0;
      items[1] = 'prev-more';
    }
    if (items[items.length - 1] < total - 1) {
      items[items.length - 1] = total - 1;
      items[items.length - 2] = 'next-more';
    }
    return items;
  }

    // pagination code
    page: number = 1;
    count: number = 0;
    tableSize: number = 10;
    tableSizes: any = [3, 6, 9, 12];
  
    onTableDataChange(event: any) {
      this.page = event;
      this.getAll();
    }
    onTableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.getAll();
    }
}
