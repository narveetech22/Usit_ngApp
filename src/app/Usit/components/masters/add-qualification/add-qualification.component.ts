import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MastersService } from 'src/app/Usit/services/masters.service';
import * as alertify from 'alertifyjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-qualification',
  templateUrl: './add-qualification.component.html',
  styleUrls: ['./add-qualification.component.css']
})
export class AddQualificationComponent implements OnInit {

  form: any = FormGroup;
  constructor(private service: MastersService, private formBuilder: FormBuilder, private router: Router) { }
  submitted = false;
  message!: string;

  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
      }
    );
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.service.addQualification(this.form.value)
      .subscribe((data: any) => {
        //console.log(data)
        if (data.status == 'success') {
          alertify.success("Qualification Added successfully");
          this.form.reset();
          this.router.navigate(['list-qualification']);
        }
        else if (data.status == 'duplicate') {
          this.message = data.message;
          alertify.error("Qualification Already Exist");
        }
        else {
          this.message = data.message;
          alertify.error("Record insertion failed");
        }
      });
  }

}
