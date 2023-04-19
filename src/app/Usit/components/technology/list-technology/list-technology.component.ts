import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Technology } from 'src/app/Usit/modal/technology';
import * as alertify from 'alertifyjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MastersService } from 'src/app/Usit/services/masters.service';

@Component({
  selector: 'app-list-technology',
  templateUrl: './list-technology.component.html',
  styleUrls: ['./list-technology.component.css']
})
export class ListTechnologyComponent implements OnInit {
  hasAcces!: any;
  form: any = FormGroup;
  datarr: Technology[] = [];
  tech = new Technology();
  submitted = false;
  searchstring!:any;
  numbers = [1, 40, -25, 0, 5, -10]
  arrayfind:any
  


  constructor(private service: MastersService, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.hasAcces = localStorage.getItem('role');
    this.getall();
    this.form = this.formBuilder.group(
      {
        remarks: ['', Validators.required],
      }
    );

    let arr = [1, 2, 3, 4, 1, 2, 3, 5];

    const findDuplicateVal = (arr:any) => arr.filter((item:any, index:any) => arr.indexOf(item) != index);

         console.log(findDuplicateVal(arr));
  }
  // duplicateColorIndex=0
  getall() {
    return this.service.getAllTechnology().subscribe(
      ((response: any) => {
        this.datarr = response.data;
        let newarr= this.datarr
        console.log(newarr)

        newarr.forEach(function (value){
          // console.log(value.technologyarea)

      let arrayfind=value.technologyarea
        console.log(arrayfind)
        return arrayfind
       
      
        })
        
        const findDuplicateVal = (array:any) => array.filter((item:any, index:any) => array.indexOf(item) != index);

        console.log(findDuplicateVal(newarr));
        
      })
      
     
    );

    

    // const findDuplicateVal = (newempty:any) => newempty.filter((item:any, index:any) => newempty.indexOf(item) != index);
    //      console.log(findDuplicateVal(newempty));
    // newarr[i].listofkeyword==newarr[i].listofkeyword
    // if(newarr[i].listofkeyword===newarr[i].listofkeyword){
    // }
    // else{
    //   console.log("elseeeee")
    // }
  }
  
 
  get f() { return this.form.controls; }
  edit(editform: any) {
    this.tech = editform;
  }
  delete(id: number) {
    alertify.confirm("Remove Technology", "Are you sure you want to remove the Technology ? ", () => {
      this.service.deleteTechnology(id).subscribe
        (
          (resp: any) => {
            if (resp.status == 'success') {
              alertify.success("Technology Deleted successfully");
            }
            else {
              alertify.error("Record Deletion failed");
            }
            this.getall();
          }
        );
    }, function () { })
  }

  public updatestatus() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    //console.log(JSON.stringify(this.form.value));
    this.service.changeTechnologyStatus(this.tech).subscribe(
      (response: any) => {
        alertify.success("Status Updated successfully");
        this.getall();
      })
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

  callmail(){
    return this.service.calingemail().subscribe(
      ((response: any) => {
        //this.datarr = response.data;
      })
    );
  }
}
