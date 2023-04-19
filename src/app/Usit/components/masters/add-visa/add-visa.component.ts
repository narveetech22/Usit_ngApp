import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MastersService } from 'src/app/Usit/services/masters.service';
import * as alertify from 'alertifyjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-visa',
  templateUrl: './add-visa.component.html',
  styleUrls: ['./add-visa.component.css']
})
export class AddVisaComponent implements OnInit {
  form: any = FormGroup;
  constructor(private service: MastersService, private formBuilder: FormBuilder, private router: Router) { }
  submitted = false;
  message!: string;
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        visastatus: ['', Validators.required],
        description: [this.form.description]
      }
    );
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.service.addvisa(this.form.value)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          alertify.success("Visa Added successfully");
          this.form.reset();
          this.router.navigate(['list-visa']);
        }
        else if (data.status == 'duplicate') {
          this.message = data.message;
          alertify.error("Visa Already Exist");
        }
        else {
          this.message = data.message;
          alertify.error("Insertion failed");
        }
      });
  }
}
