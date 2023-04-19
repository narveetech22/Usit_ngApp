import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recruiter } from 'src/app/Usit/modal/recruiter';
import { RecruiterService } from 'src/app/Usit/services/recruiter.service';
import * as alertify from 'alertifyjs';
import { MastersService } from 'src/app/Usit/services/masters.service';
@Component({
  selector: 'app-add-recruiter',
  templateUrl: './add-recruiter.component.html',
})
export class AddRecruiterComponent implements OnInit {

  form: any = FormGroup;
  submitted = false;
  rolearr: any = [];
  message!: string;
  entity = new Recruiter();
  statearr: any = [];
  cityarr: any = [];
  constructor(private service: RecruiterService, private router: Router, private formBuilder: FormBuilder, private cityservice: MastersService) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.getvendorcompanydetails();
    this.getstatedetails();
    this.getcity();
    this.form = this.formBuilder.group(
      {
        //vmsid:['', Validators.required],
        recruiter: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
       // usnumber: ['', [Validators.required]],
        usnumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{3}[0-9]{9}$|[0]{1}[0-9]{10}$|[1]{1}[0-9]{10}$'), Validators.minLength(10)]],
        innumber: [this.form.innumber],
        country: ['', Validators.required],
        recruitertype: ['', Validators.required], 
        iplogin: [this.form.iplogin],
        details: [this.form.details],
        fedid: [this.form.fedid],
        addedby: [this.entity.addedby],
        updatedby: [this.entity.updatedby],
        // role: [this.entity.role ],
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

        user: this.formBuilder.group({
          userid: localStorage.getItem('userid'),
        })
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
flg!:any;
  getvendorcompanydetails() {
   this.flg = localStorage.getItem('department');
   const role = localStorage.getItem('role');
   if(role=='Super Admin' || role=='Admin'){
    this.flg = "all";
   }
    this.service.getCompanies(this.flg).subscribe(
      (response: any) => {
        this.rolearr = response.data;
        // console.log(response.data + " ======= ")
      }
    )
  }

  getstatedetails() {
    this.cityservice.getstatedetails().subscribe(
      (response: any) => {
        this.statearr = response.data;
        // console.log(response.data);
      }
    )
  }

  Redirect() {
    this.router.navigate(['list-vms']);
  }
  public onSubmit() {
    this.message = '';
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    //console.log(JSON.stringify(this.form.value, null, 2));
    // console.log(JSON.stringify(this.entity)+" ppppppppppppppppp");
    this.service.registerEntity(this.form.value)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          alertify.success("Recruiter Added successfully");
          this.form.reset();
          this.router.navigate(['list-recruiter']);
        }
        else {
          this.message = data.message;
          alertify.error("Record Insertion failed");
        }
      });

  }

}
