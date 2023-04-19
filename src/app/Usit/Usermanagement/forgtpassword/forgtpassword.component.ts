import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsermanagementService } from '../../services/usermanagement.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-forgtpassword',
  templateUrl: './forgtpassword.component.html',
  styleUrls: ['./forgtpassword.component.css']
})
export class ForgtpasswordComponent implements OnInit {

  form: any = FormGroup;
  email!: string;
  message = "";
  error = '';
  submitted = false;

  constructor(private formBuilder: FormBuilder, private service: UsermanagementService) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      }
    );
  }

  registernow() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.service.sendresetlink(this.form.value)
      .subscribe((data: any) => {
        if (data.status == "success") {
          alertify.success("reset password link sent to registered mail");
          this.message = data.message;
          this.error = "";
        }
        else {
          alertify.error("Email not registered with aplication");
          this.error = data.message;
          this.message = "";
        }
      });
  }

}
