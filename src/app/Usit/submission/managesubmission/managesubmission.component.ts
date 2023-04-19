import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Submission } from '../../modal/submission';

import { SubmissionService } from '../../services/submission.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-managesubmission',
  templateUrl: './managesubmission.component.html',
  styleUrls: ['./managesubmission.component.css']
})
export class ManagesubmissionComponent implements OnInit {
  message: any;
  form: any = FormGroup;
  sales = new Submission();
  entity = new Submission();
  showAlert = false;
  submitted = false;
  arraydt: any = [];
  consultdata: any = [];
  vendordata: any = [];
  hideSavebtn = false;
  flag!: any;
  requirementdata: any = [];
  id!: number;
  constructor(private _service: SubmissionService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }
  get frm() { return this.form.controls; }
  ngOnInit(): void {
    this.flag = this.activatedRoute.snapshot.params['flg'];
    this.id = this.activatedRoute.snapshot.params['id'];
    //console.log("kkk " + this.flag)
    if (this.flag == 'sales') {
      this.flag = "sales";
    }
    else {
      this.flag = "Recruiting";
      this.getrequirements();
    }
    this.getConsultant(this.flag);
    this._service.getsubdetailsbyid(this.id).subscribe(
      (response: any) => {
        this.entity = response.data;
      //  console.log(JSON.stringify(this.entity) + "===============")
      }
    );

    //used for get one resource
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
      }),
      relocationassistance: [this.form.relocationassistance],
      position: ['', Validators.required],
      projectlocation: ['', Validators.required],
      ratetype: ['', Validators.required],
      submissionrate: ['', [Validators.required]],
      endclient: ['', Validators.required],
      implpartner: [this.form.implpartner],
      vendor: ['', Validators.required],// [this.form.cpmobile],//['', [Validators.required]],
      emplname: ['', [Validators.required]],
      empcontact: [this.form.empcontact],
      empmail: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });

    const requirement = this.form.get('requirement');
    if (this.flag == 'sales') {
      requirement.setValidators(Validators.required);
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
      //console.log("lllll")
      this.hideSavebtn = false;
      return;
    }
    else {
      this.hideSavebtn = true;
    }
    ///console.log(this.entity)
    this.entity.updatedby = localStorage.getItem('userid');
    this._service.registersubmission(this.entity).subscribe((data: any) => {
      if (data.status == 'success') {
        this.hideSavebtn = true;
        alertify.success("Record Inserted successfully");
        this.form.reset();
       // console.log(" kiran kk " + this.flag)
        if (this.entity.flg == 'sales') {
          this.router.navigate(['sales-submission/sales']);
        }
        else {
          this.router.navigate(['recruiting-submission/recruiting']);
        }
      }
      else {
        this.hideSavebtn = true;
        this.message = data.message;
        alertify.error("Record Insertion failed");
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
        //  console.log(response.data+" ==============  ")
      }
    )
  }
  // getCompany() {

  //   this._service.getCompanies().subscribe(
  //     (response: any) => {
  //       this.vendordata = response.data;
  //     }
  //   )
  // }
  // supporting drop downs
  getrequirements() {
    this._service.getrequirements().subscribe(
      (response: any) => {
        this.requirementdata = response.data;
      }
    )
  }
 
}
