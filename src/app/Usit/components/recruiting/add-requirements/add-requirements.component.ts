import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { RecruitingRequirementsService } from 'src/app/Usit/services/recruiting-requirements.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { formatDate } from '@angular/common';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
@Component({
  selector: 'app-add-requirements',
  templateUrl: './add-requirements.component.html',
})
export class AddRequirementsComponent implements OnInit {
  message: any;
  form: any = FormGroup;
  hidesavebtn = false;
  showAlert = false;
  submitted = false;
  arraydt: any = [];
  techdata: any = [];
  consultdata: any = [];
  reqnumber!: any;
  maxnumber!: number;
  statearr: any = [];
  cityarr: any = [];
  employeedata: any = [];
  dropdownList: any = [];
  skills: Sk[] = [];
  dropdownSettings: IDropdownSettings = {};
  currentDate = new Date();
  autoskills!: string;
  // autoskills="kirann";
  curDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
  constructor(private service: RecruitingRequirementsService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  get frm() { return this.form.controls; }
  ngOnInit(): void {
    this.service.getcitydetails().subscribe(
      (response: any) => {
        this.cityarr = response.data;
      }
    )
    this.service.getstatedetails().subscribe(
      (response: any) => {
        this.statearr = response.data;
      }
    )
    this.gettech();
    this.getemployee();
    this.service.getreqnumber().subscribe(
      (response: any) => {
        if (response.data == null) {
          this.reqnumber = 1;
          this.maxnumber = 1;
        }
        else {
          this.maxnumber = parseInt(response.data) + 1;
          this.reqnumber = parseInt(response.data) + 1;
        }
        this.reqnumber = "NarReq - " + ("00000" + this.reqnumber).slice(-5);
      })
    this.form = this.formBuilder.group({
      postedon: ['', Validators.required],
      vendor: ['', Validators.required],
      jobtitle: ['', Validators.required],
      //category: ['', Validators.required],
      email: [this.form.email],
      mobile: [this.form.mobile],
      reqnumber: [this.form.reqnumber],
      maxnumber: [this.form.maxnumber],
      location: ['', Validators.required],
      jobexperience: [this.form.jobexperience],
      jobskills: [this.form.jobskills],
      employmenttype: ['', Validators.required],
      duration: ['', Validators.required],
      salary: [this.form.salary],
      jobdescription: ['', Validators.required],//[this.form.jobdescription],
      /*city: this.formBuilder.group({
        id: new FormControl('', [
          Validators.required
        ]),
       }),
       states: this.formBuilder.group({
        id: new FormControl('', [
          Validators.required
        ]),
       }),

       */
      technology: this.formBuilder.group({
        id: new FormControl('', [
          Validators.required
        ]),
      }),
      users: this.formBuilder.group({
        userid: localStorage.getItem('userid'),
      }),
      empid: ['', Validators.required],// this.form.employee,
    });
  }
  //sk!:string;
  techskills(event: any) {
    const newVal = event.target.value;
    this.service.getSkilldata(newVal).subscribe(
      (response: any) => {
        this.autoskills = response.data;
      }
    )
  }

  //getemployee
  gettech() {
    this.service.gettech().subscribe(
      (response: any) => {
        this.techdata = response.data;
      }
    )
  }

  check(arr: any) {
  }
  getemployee() {
    this.service.getemployee().subscribe(
      (response: any) => {
        this.employeedata = response.data;
        console.log( this.employeedata )
        this.check(this.employeedata);
        this.dropdownSettings = {
          idField: 'userid',
          textField: 'fullname',
          allowSearchFilter: true
        };
      }
    )
  }

  saveEntity() {
    this.submitted = true;
    console.log(this.form.value)
    // stop here if form is invalid
    if (this.form.invalid) {
      this.hidesavebtn = false;
      return;
    }

    else {
      this.hidesavebtn = true;
    }
    console.log(this.form.value)
    //console.log(JSON.stringify(this.rr.empid["userid"]))
    //console.log(JSON.stringify(this.form.value, null, 2) + " =============== ");
    this.service.registerRequirement(this.form.value).subscribe((data: any) => {
      this.hidesavebtn = true;
      if (data.status == 'success') {
        alertify.success("Record Inserted successfully");
        //  console.log(data)
        this.form.reset();
        this.router.navigate(['recruiting-requirements']);
      }
      else {
        this.hidesavebtn = false;
        this.message = data.message;
        alertify.error("Record Insertion failed");
      }
    });
  }
}

class Sk {
  id!: number;
  tech!: string;
  list!: string;
}
