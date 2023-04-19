import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { SalesInterview } from 'src/app/Usit/modal/sales-interview';
import { RecruitinginterviewService } from 'src/app/Usit/services/recruitinginterview.service';

@Component({
  selector: 'app-edit-recinterview',
  templateUrl: './edit-recinterview.component.html',
})
export class EditRecinterviewComponent implements OnInit {
  hidesavebtn = false;
  entity = new SalesInterview();
  submitted = false;
  form: any = FormGroup;
  showAlert = false;
  message!: string;
  id!: number;
  submissiondata: any = [];
  constructor(private formBuilder: FormBuilder, private service: RecruitinginterviewService, private router: Router, private activatedRoute: ActivatedRoute) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.getsubdetails();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.service.getEntity(this.id).subscribe(
      (response: any) => {
        // console.log(JSON.stringify(response.data) + " entity");
        this.entity = response.data
      }
    );

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

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.hidesavebtn = false;
      return;
    }
    else {
      this.hidesavebtn = true;
    }
    this.entity.updatedby = localStorage.getItem("userid");
    // console.log(JSON.stringify(this.form.value, null, 2)+" =============== ");
    this.service.registerEntity(this.entity).subscribe((data: any) => {
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
