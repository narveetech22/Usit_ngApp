import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { MastersService } from 'src/app/Usit/services/masters.service';
import { Masters } from 'src/app/Usit/modal/masters';

@Component({
  selector: 'app-edit-states',
  templateUrl: './edit-states.component.html',
  styleUrls: ['./edit-states.component.css']
})
export class EditStatesComponent implements OnInit {

  submitted = false;
  form: any = FormGroup;
  id!: number;
  tech = new Masters();
  message!: string;
  constructor(private service: MastersService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.service.getstatebyid(this.id).subscribe(
      (response: any) => {
        this.tech = response.data
      }
    )
    this.form = this.formBuilder.group(
      {
        statename: ['', Validators.required],
      }
    );
  }

  public onSubmit() {
    this.message = '';
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.service.addstates(this.tech)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          alertify.success("State Updated successfully");
          this.form.reset();
          this.router.navigate(['list-state']);
        }
        else if (data.status == 'duplicate') {
          this.message = data.message;
          alertify.error("State Already Exist");
        }
        else {
          this.message = data.message;
          alertify.error("Record updation failed");
        }
      });
  }
}
