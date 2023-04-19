import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MastersService } from 'src/app/Usit/services/masters.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.css']
})
export class PincodeComponent implements OnInit {

  form: any = FormGroup;
  constructor(private service: MastersService, private formBuilder: FormBuilder, private router: Router) { }
  submitted = false;
  message!: string;
  // code = new PinCode();
  get f() { return this.form.controls; }

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        pincode: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(12)]],//['', Validators.required],
      }
    );

  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.service.addpin(this.form.value)//this.form.value
      .subscribe((data: any) => {
        // console.log(data.status)
        if (data.status == 'success') {
          alertify.success("ZipCode Added successfully");
          this.form.reset();
          this.router.navigate(['list-zipcode']);
        }
        else if (data.status == 'duplicate') {
          this.message = data.message;
          alertify.error("ZipCode Already Exist");
        }
        else {
          this.message = data.message;
          alertify.error("Record Insertion failed");
        }
      });
  }

}
