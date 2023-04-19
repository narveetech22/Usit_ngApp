import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Submission } from '../../modal/submission';
import * as alertify from 'alertifyjs';
import { SubmissionService } from '../../services/submission.service';
@Component({
  selector: 'app-submissionentry',
  templateUrl: './submissionentry.component.html',
  styleUrls: ['./submissionentry.component.css']
})
export class SubmissionentryComponent implements OnInit {
  message: any;
  form: any = FormGroup;
  sales = new Submission();
  entity: Submission[] = [];
  showAlert = false;
  submitted = false;
  arraydt: any = [];
  consultdata: any = [];
  vendordata: any = [];
  hideSavebtn = false;
  flag!: any;
  requirementdata: any = [];
  projecttitle!: string;
  projectlocation!: string;
  constructor(private _service: SubmissionService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }
  get frm() { return this.form.controls; }
  ngOnInit(): void {
    this.flag = this.activatedRoute.snapshot.params['flg'];
    
    if (this.flag == 'sales') {
      this.flag = "sales";
    }
    else {
      this.flag = "Recruiting";
      this.getrequirements();
    }
    this.getCompany();
    this.getConsultant(this.flag);
    this.form = this.formBuilder.group({
      consultant: this.formBuilder.group({
        consultantid: new FormControl('', [
          Validators.required
        ]),
      }),

      user: this.formBuilder.group({
        userid: localStorage.getItem('userid'),
      }), //vendorcompany
      flg: this.flag,
      requirement: this.formBuilder.group({
        requirementid: 1
        // new FormControl('', [
        //  Validators.required
        //]),
        ///requirementid:new FormControl(''),
      }),
      // [ngClass]="{ 'is-invalid': submitted && form.get('requirement.requirementid').hasError('required') }"
      relocationassistance: [this.form.relocationassistance],
      position: ['', Validators.required],
      projectlocation: ['', Validators.required],
      ratetype: ['', Validators.required],
      submissionrate: ['', [Validators.required]],
      endclient: ['', Validators.required],
      implpartner: [this.form.implpartner],
      vendor: ['', Validators.required],//[this.form.vendor],//['', [Validators.required]],
      emplname: ['', [Validators.required]],
      empcontact: [this.form.empcontact],
      empmail: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });

    const requirement = this.form.get('requirement');
    if (this.flag == 'sales') {
      requirement.setValidators(Validators.required);
    //  requirement.requirementid.setValue(1);
    }
    else {
      requirement.clearValidators();
    }
    requirement.updateValueAndValidity();
  }
  saveEntity() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      this.hideSavebtn = false;
      return;
    }
    else {
      this.hideSavebtn = true;
    }
    // console.log(this.form.value)
    this._service.registersubmission(this.form.value).subscribe((data: any) => {
      if (data.status == 'success') {
        this.hideSavebtn = true;
        alertify.success("Record Inserted successfully");
        //this.router.navigate(['list-submission']);
      }
      else if(data.status == 'fail'){
        this.hideSavebtn = false;
        this.message = "Profile Already Submitted";
        alertify.error("Profile Already Submitted");
        return;
      }
      else {
        this.hideSavebtn = false;
        this.message = data.message;
        alertify.error("Record Insertion failed");
      }
      if (this.flag == 'sales') {
        this.router.navigate(['sales-submission/sales']);
      }
      else {
        this.router.navigate(['recruiting-submission/recruiting']);
      }
    });
  }

  getConsultant(flg: string) {
    this._service.getconsultantdropdown(flg).subscribe(
      (response: any) => {
        this.consultdata = response.data;
      })
  }
  flg!:any;
  getCompany() {
    this.flg = localStorage.getItem('department');
   const role = localStorage.getItem('role');
   if(role=='Super Admin' || role=='Admin'){
    this.flg = "all";
   }
    this._service.getCompanies(this.flg).subscribe(
      (response: any) => {
        this.vendordata = response.data;
        //  console.log(response.data)
      }
    )
  }

  // supporting drop downs
  getrequirements() {
    this._service.getrequirements().subscribe(
      (response: any) => {
        this.requirementdata = response.data;
       // console.log(JSON.stringify(this.requirementdata))
      }
    )
  }
  //sk!:string;
  togglePosition(event: any) {
  }
}
