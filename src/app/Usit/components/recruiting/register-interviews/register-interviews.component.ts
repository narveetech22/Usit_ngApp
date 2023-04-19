import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SalesInterviewService } from 'src/app/Usit/services/sales-interview.service';
import * as alertify from 'alertifyjs';
import { RecruitinginterviewService } from 'src/app/Usit/services/recruitinginterview.service';

@Component({
  selector: 'app-register-interviews',
  templateUrl: './register-interviews.component.html',
})
export class RegisterInterviewsComponent implements OnInit {
  hidesavebtn = false;
  form: any = FormGroup;
  loading = false;
  submitted = false;
  id!: number;
  isAddMode!: boolean;
  submissiondata: any = [];
  tt!: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: RecruitinginterviewService,
  ) { }

  ngOnInit() {
    // const tt = "";
    //this.tt = localStorage.getItem("token");
    // var rr = this.tt.split(".")[2];
    //  console.log("token "+atob(rr))
    this.getsubdetails();
    this.form = this.formBuilder.group({
      submission: this.formBuilder.group({
        submissionid: new FormControl('', [
          Validators.required
        ]),
      }),
      interviewdate: ['', Validators.required],
      timezone: ['', Validators.required],
      round: ['', Validators.required],
      mode: ['', Validators.required],
      feedback: ['', Validators.required],
      interviewstatus: ['', Validators.required],
      users: this.formBuilder.group({
        userid: localStorage.getItem('userid'),
      }),
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.hidesavebtn = false;
      return;
    }
    else {
      this.hidesavebtn = true;
    }
    //console.log(JSON.stringify(this.form.value, null, 2) + " =============== ");
    this.service.registerEntity(this.form.value).subscribe((data: any) => {
      this.hidesavebtn = true;
      if (data.status == 'Success') {
        alertify.success("Record Inserted successfully");
        this.form.reset();
        this.router.navigate(['list-interviews']);
      }
      else {
        this.hidesavebtn = false;
        alertify.error("Record Insertion failed");
      }
    });


  }
  getsubdetails() {
    this.service.getsubdetails().subscribe(
      (response: any) => {
        this.submissiondata = response.data;
        //console.log(response.data)
      });
  }

}
