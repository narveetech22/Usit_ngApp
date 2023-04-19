import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { MastersService } from 'src/app/Usit/services/masters.service';
import { Masters } from 'src/app/Usit/modal/masters';

@Component({
  selector: 'app-manage-qualification',
  templateUrl: './manage-qualification.component.html',
  styleUrls: ['./manage-qualification.component.css']
})
export class ManageQualificationComponent implements OnInit {

  submitted = false;
  form: any = FormGroup;
  id!: number;
  tech = new Masters();
  message!: string;
  constructor(private service: MastersService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.service.getQualificationById(this.id).subscribe(
      (response: any) => {
        this.tech = response.data
      }
    )
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
      }
    );
  }

  public onSubmit() {
    this.message = '';
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.service.addQualification(this.tech)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          alertify.success("Qualification Updated successfully");
          this.form.reset();
          this.router.navigate(['list-qualification']);
        }
        else {
          this.message = data.message;
          alertify.error(data.message);
        }
      });
  }
}
