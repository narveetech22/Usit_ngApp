import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recruiter } from 'src/app/Usit/modal/recruiter';
import * as alertify from 'alertifyjs';
import { RecruiterService } from 'src/app/Usit/services/recruiter.service';
import { MastersService } from 'src/app/Usit/services/masters.service';
@Component({
  selector: 'app-edit-recruiter',
  templateUrl: './edit-recruiter.component.html',
})
export class EditRecruiterComponent implements OnInit {
  submitted = false;
  form: any = FormGroup;
  id!: number;
  entity = new Recruiter();
  message!: string;
  companydata: any = [];
  statedata: any = [];
  cityarr: any = [];
  constructor(private service: RecruiterService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private cityservice: MastersService) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.getCompany();
    this.getstatedetails();
    this.getcity();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.service.getEntity(this.id).subscribe(
      (response: any) => {
        //console.log(JSON.stringify(response.data)); 
        this.entity = response.data
      }
    );
    this.form = this.formBuilder.group(
      {
        // vmsid:['', Validators.required],
        recruiter: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        usnumber: ['', [Validators.required]],
        innumber: [this.form.innumber],
        country: ['', Validators.required],
        recruitertype: [this.form.recruitertype], 
        iplogin: [this.form.iplogin],
        details: [this.form.details],
        recid: [this.form.recid],
        fedid: [this.form.fedid],
        addedby: [this.entity.addedby],
        updatedby: [this.entity.updatedby],
        role: [this.entity.role],
        status: [this.entity.status],
        remarks: [this.entity.remarks],
        rec_stat: [this.entity.rec_stat],
        vendor: this.formBuilder.group({
          vmsid: new FormControl('', [
            Validators.required
          ]),
        }),

        states: this.formBuilder.group({
          id: new FormControl('', [
            Validators.required
          ]),
        }),
        city: this.formBuilder.group({
          id: new FormControl('', [
            Validators.required
          ]),
        }),

      }
    );
  }
  getcity() {
    this.cityservice.getcitydetails().subscribe(
      (response: any) => {
        this.cityarr = response.data;
      }
    )
  }
  getstatedetails() {
    this.cityservice.getstatedetails().subscribe(
      (response: any) => {
        this.statedata = response.data;
      }
    )
  }
  flg!:any;
  getCompany() {
    this.flg = localStorage.getItem('department');
    const role = localStorage.getItem('role');
    if(role=='Super Admin' || role=='Admin'){
      this.flg = "all";
     }
    this.service.getCompanies(this.flg).subscribe(
      (response: any) => {
        this.companydata = response.data;
      }
    )
  }

  public onSubmit() {
    this.message = '';
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    //   console.log(JSON.stringify(this.entity))
    this.entity.updatedby = localStorage.getItem('userid');
    this.service.updateEntity(this.entity)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          alertify.success("Record Updated successfully");
          this.router.navigate(['list-recruiter']);
        }
        else {
          this.message = data.message;
          alertify.error("Record Updatiopn failed");
        }
      });
  }
}
