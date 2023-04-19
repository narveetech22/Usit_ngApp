import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RecruitingRequirementsService } from 'src/app/Usit/services/recruiting-requirements.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-list-requirements',
  templateUrl: './list-requirements.component.html',
  styleUrls: ['./list-requirements.component.css']
})
export class ListRequirementsComponent implements OnInit {
  entity: any[] = [];
  submitted = false;
  registerForm: any = FormGroup;
  showAlert = false;
  message!: string;
  hasAcces!: any;
  searchstring!:any;
  constructor(private service: RecruitingRequirementsService, private router: Router) {
    this.hasAcces = localStorage.getItem('role');
  }

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.getAll();

  }

  getAll() {
    this.service.getlist().subscribe(
      (response: any) => {
        this.entity = response.data;
      }
    )
  }
  delete(id: number) {
    alertify.confirm("Remove Record", "Are you sure you want to remove the record ? ", () => {
      this.service.deleteEntity(id).subscribe
        (
          (resp: any) => {
            if (resp.status == 'success') {
              alertify.success("Record Deleted successfully");
            }
            else {
              alertify.error(resp.message);
            }
            this.getAll();
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
    this.getAll();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAll();
  }
}
