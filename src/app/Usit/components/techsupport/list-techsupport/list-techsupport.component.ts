import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Techsupport } from 'src/app/Usit/modal/techsupport';
import * as alertify from 'alertifyjs';
import { MastersService } from 'src/app/Usit/services/masters.service';
@Component({
  selector: 'app-list-techsupport',
  templateUrl: './list-techsupport.component.html',
  styleUrls: ['./list-techsupport.component.css']
})
export class ListTechsupportComponent implements OnInit {

  tech: Techsupport[] = [];
  techent = new Techsupport();
  message: any;
  showAlert = false;
  registerForm: any = FormGroup;
  submitted = false;
  query!: any;
  hasAcces!:any;
  constructor(private service: MastersService, private activatedroute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.hasAcces = localStorage.getItem('role');
    this.getlist();
  }
  getlist() {
    this.service.getTechSupportList().subscribe(
      (response: any) => {
        this.tech = response.data;
      }
    )
  }
  search() {
    this.submitted = true;
    //  alert("lll" + JSON.stringify(this.registerForm.value, null, 2));
    if (this.query == '') {
      this.getlist();
    }
    else {
      //alert(this.query)
      this.tech = this.tech.filter((res: Techsupport) => {
        return res.name.toLowerCase().match(this.query.toLowerCase()) || res.email.toLowerCase().match(this.query.toLowerCase())
          || res.technology.technologyarea.toLowerCase().match(this.query.toLowerCase())
          || res.mobile.match(this.query)
          || res.skills.toLowerCase().match(this.query.toLowerCase());
      })
    }
    // this.service.search(search).subscribe(
    //   (response: any) => {
    //     this.tech = response.data;
    //   }
    // )
    //used for get the resource
    //  getAll2(){
    //   let search = "dummysearch";
    //   // return this.http.get(this.baseUrl+"usit/techsupp/search/"+search);
    //   return this.http.get(this.baseUrl+"techsupp/techsupp/search/"+search);
    // }
    // search(search:string){
    //   return this.http.get(this.baseUrl+"techsupp/search/"+search);
    // }

  }
  edit(entity: any) {
    this.techent = entity;
  }

  deleteEntity(id: number) {
    alertify.confirm("Remove Record", "Are you sure you want to remove the record ? ", () => {
      this.service.deleteTechsupport(id).subscribe
        (
          (resp: any) => {
            if (resp.status == 'Success') {
              alertify.success("Record Deleted successfully");
            }
            else {
              alertify.error("Record Deletion failed");
            }
            this.getlist();
          }
        );
    }, function () { })
  }
  updatestatus() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    //console.log(this.tech);
    this.service.changeTechSupportStatus(this.techent).subscribe(
      (response: any) => {
        alertify.success("Status Updated successfully");
        this.getlist();
      })
  }

  // pagination code
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  onTableDataChange(event: any) {
    this.page = event;
    this.getlist();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getlist();
  }

}
