import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { SalesInterview } from 'src/app/Usit/modal/sales-interview';
import { SalesInterviewService } from 'src/app/Usit/services/sales-interview.service';
@Component({
  selector: 'app-edit-interview',
  templateUrl: './edit-interview.component.html',
})
export class EditInterviewComponent implements OnInit {
  hideSavebtn = false;
  entity = new SalesInterview();
  submitted = false;
  form: any = FormGroup;
  showAlert = false;
  message!: string;
  id!: number;
  submissiondata: any = [];
  flag!:string;
  constructor(private formBuilder: FormBuilder, private service: SalesInterviewService, private router: Router, private activatedRoute: ActivatedRoute) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    //this.getsubdetails();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.flag = this.activatedRoute.snapshot.params['flg'];
    this.getsubdetails(this.flag);
    this.service.getEntity(this.id).subscribe(
      (response: any) => {
         // console.log(JSON.stringify(response.data)+" entity"); 
        this.entity = response.data
      }
    );

    this.form = this.formBuilder.group({
      submission: this.formBuilder.group({
        submissionid: new FormControl('', [
          Validators.required
        ]),
      }),
      intrid : this.form.intrid,
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
      this.hideSavebtn = false;
      return;
    }
    else {
      this.hideSavebtn = true;
    }
    this.entity.updatedby = localStorage.getItem('userid');
    // console.log(JSON.stringify(this.form.value, null, 2)+" =============== ");
    this.service.registerEntity(this.entity).subscribe((data: any) => {
      //this.hideSavebtn = true;
      // if (data.status == 'Success') {
      //   alertify.success("Record Updated successfully");
      //   this.form.reset();
      //   this.router.navigate(['list-interview']);
      // }
      // else {
      //   this.hideSavebtn = false;
      //   alertify.error("Record Updation failed");
      // }

      if (data.status == 'Success') {
        this.hideSavebtn = true;
        alertify.success("Record Updated successfully");
        this.form.reset();
       // console.log(" kiran kk " + this.flag)
        if (this.flag == 'sales') {
          this.router.navigate(['sales-interview/sales']);
        }
        else {
          this.router.navigate(['recruiting-interview/recruiting']);
        }
      }
      else {
        this.hideSavebtn = true;
        this.message = data.message;
        alertify.error("Record Updation failed");
      }
    });
  }
  // getsubdetails() {
  //   let flg = 'sales';
  //   this.service.getsubmissions(flg).subscribe(
  //     (response: any) => {
  //       this.submissiondata = response.data;
  //       console.log(response.data)
  //     });
  // }
  userid!:any;
  role!:any;
  getsubdetails(flg:string) {
    this.userid = localStorage.getItem('userid');
    this.role = localStorage.getItem('role');
    this.service.getsubmissions(flg,this.userid,this.role).subscribe(
      (response: any) => {
        this.submissiondata = response.data;
        // console.log(response.data)
      });
  }
}
