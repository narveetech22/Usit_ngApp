import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SalesInterviewService } from 'src/app/Usit/services/sales-interview.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
})
export class AddInterviewComponent implements OnInit {
  hideSavebtn = false;
  form: any = FormGroup;
  loading = false;
  submitted = false;
  id!: any;
  isAddMode!: boolean;
  submissiondata: any = [];
  flag!: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: SalesInterviewService,
  ) { }

  ngOnInit() {
    this.flag = this.activatedRoute.snapshot.params['flg'];
    if (this.flag == 'sales') {
      this.flag = "sales";
    }
    else {
      this.flag = "Recruiting";
    }
    this.getsubdetails(this.flag);
    this.form = this.formBuilder.group({
      submission: this.formBuilder.group({
        submissionid: new FormControl('', [
          Validators.required
        ]),
      }),
      flg :this.flag,
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
      this.hideSavebtn = false;
      return;
    }
    else {
      this.hideSavebtn = true;
    }
   // console.log(JSON.stringify(this.form.value, null, 2)+" =============== ");
    this.service.registerEntity(this.form.value).subscribe((data: any) => {
      this.hideSavebtn = true;
      if (data.status == 'Success') {
        alertify.success("Record Inserted successfully");
        this.form.reset();
       // this.router.navigate(['list-interview']);
      }
      else {
        this.hideSavebtn = false;
        alertify.error("Record Insertion failed");
      }

      if(this.flag=='sales'){
        this.router.navigate(['sales-interview/sales']);
      }
      else{
        this.router.navigate(['recruiting-interview/recruiting']);
      }
    });
  }
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
