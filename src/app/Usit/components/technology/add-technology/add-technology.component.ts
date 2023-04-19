import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { MastersService } from 'src/app/Usit/services/masters.service';

@Component({
  selector: 'app-add-technology',
  templateUrl: './add-technology.component.html',
})
export class AddTechnologyComponent implements OnInit {
  form: any = FormGroup;
  submitted = false;
  message!: string;
  constructor(private service: MastersService, private router: Router, private formBuilder: FormBuilder) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        technologyarea: ['', Validators.required],
        listofkeyword: ['', Validators.required],
        comments: [this.form.comments],
      }
    );
  }

  // Redirect() {
  //   this.router.navigate(['list-technology']);
  // }
  public onSubmit() {
    this.message = '';
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.service.registerTechnology(this.form.value)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          alertify.success("Technology Added successfully");
          this.form.reset();
          this.router.navigate(['list-technology']);
          //this.Redirect();
        }
        else {
          this.message = data.message;
          alertify.success("Record Insertion failed");
        }
      });
  }
}
