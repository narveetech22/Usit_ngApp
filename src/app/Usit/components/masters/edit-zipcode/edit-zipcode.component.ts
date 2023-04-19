import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { MastersService } from 'src/app/Usit/services/masters.service';
import { Masters } from 'src/app/Usit/modal/masters';

@Component({
  selector: 'app-edit-zipcode',
  templateUrl: './edit-zipcode.component.html',
})
export class EditZipcodeComponent implements OnInit {

  submitted = false;
  form: any = FormGroup;
  id!: number;
  tech = new Masters();
  message!: string;
  constructor(private service: MastersService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.service.getpinbyid(this.id).subscribe(
      (response: any) => {
        this.tech = response.data
      }
    )
    this.form = this.formBuilder.group(
      {
        pincode: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(12)]],
      }
    );
  }

  public onSubmit() {
    this.message = '';
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.service.addpin(this.tech)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          alertify.success("ZipCode Updated successfully");
          this.form.reset();
          this.router.navigate(['list-zipcode']);
        }
        else {
          this.message = data.message;
          alertify.error("Record updation failed");
        }
      });
  }
}
