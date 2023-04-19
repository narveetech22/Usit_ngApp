import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MastersService } from 'src/app/Usit/services/masters.service';
import * as alertify from 'alertifyjs';
import { Masters } from 'src/app/Usit/modal/masters';

@Component({
  selector: 'app-list-visa',
  templateUrl: './list-visa.component.html',
  styleUrls: ['./list-visa.component.css']
})
export class ListVisaComponent implements OnInit {

  form: any = FormGroup;
  datarr: Masters[] = [];
  submitted = false;
  dtmodal!: string;
  hasAcces!: any;
  constructor(private service: MastersService, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.hasAcces = localStorage.getItem('role');
    this.getall();
  }

  getall() {
    return this.service.getAllvisa().subscribe(
      ((response: any) => {
        this.datarr = response.data;
      })
    );
  }
  delete(id: number) {
    alertify.confirm("Remove Record", "Are you sure you want to remove the Visa ? ", () => {
      this.service.deletevisa(id).subscribe
        (
          (resp: any) => {
            if (resp.status == 'success') {
              alertify.success("Visa Deleted successfully");
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
