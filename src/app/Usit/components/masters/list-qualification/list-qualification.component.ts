import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PinCode } from 'src/app/Usit/modal/pin-code';
import { MastersService } from 'src/app/Usit/services/masters.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-list-qualification',
  templateUrl: './list-qualification.component.html',
  styleUrls: ['./list-qualification.component.css']
})
export class ListQualificationComponent implements OnInit {


  form: any = FormGroup;
  datarr: any[] = [];
  tech = new PinCode();
  submitted = false;
  dtmodal!: string;
  hasAcces!: any;
  constructor(private service: MastersService, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.hasAcces = localStorage.getItem('role');
    this.getall();
  }

  getall() {
    return this.service.getAllQualification().subscribe(
      ((response: any) => {
        this.datarr = response.data;
       // alert(this.datarr)
      })
    );
  }

  delete(id: number) {
    alertify.confirm("Remove Qualification", "Are you sure you want to remove the Qualification ? ", () => {
      this.service.deleteQualification(id).subscribe
        (
          (resp: any) => {
            if (resp.status == 'success') {
              alertify.success("Qualification Deleted successfully");
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
