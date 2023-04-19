import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { City } from 'src/app/Usit/modal/city';
import { MastersService } from 'src/app/Usit/services/masters.service';
@Component({
  selector: 'app-list-city',
  templateUrl: './list-city.component.html',
  styleUrls: ['./list-city.component.css']
})
export class ListCityComponent implements OnInit {

  form: any = FormGroup;
  datarr: City[] = [];
  tech = new City();
  submitted = false;
  dtmodal!: string;
  hasAcces!: any;
  constructor(private service: MastersService, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.hasAcces = localStorage.getItem('role');
    this.getall();
  }
  
  getall() {
    return this.service.getAllcities().subscribe(
      ((response: any) => {
        this.datarr = response.data;
        console.log(this.datarr)
      })
    );
  }
  delete(id: number) {
    alertify.confirm("Remove City", "Are you sure you want to remove the City ? ", () => {
      this.service.deletecity(id).subscribe
        (
          (resp: any) => {
            if (resp.status == 'success') {
              alertify.success("City Deleted successfully");
            }
            else if (resp.status == 'fail') {
              alertify.error(resp.message);
            }
            else {
              alertify.error("Record Deletion failed");
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
