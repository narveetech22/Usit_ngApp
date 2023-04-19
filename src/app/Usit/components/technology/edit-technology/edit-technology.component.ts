import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Technology } from 'src/app/Usit/modal/technology';
import * as alertify from 'alertifyjs';
import { MastersService } from 'src/app/Usit/services/masters.service';
@Component({
  selector: 'app-edit-technology',
  templateUrl: './edit-technology.component.html',
})
export class EditTechnologyComponent implements OnInit {
  submitted = false;
  form: any = FormGroup;
  id!: number;
  tech = new Technology();
  message!: string;
  constructor(private service: MastersService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.service.getTechnology(this.id).subscribe(
      (response: any) => { //console.log(response.data); 
        this.tech = response.data
      }
    )

    this.form = this.formBuilder.group(
      {
        technologyarea: ['', Validators.required],
        listofkeyword: ['', Validators.required],
        comments: [this.form.comments],
        id: [this.form.id],
        status: [this.form.status],
        remarks: [this.form.remarks],
        addedby: [this.form.addedby],
      }
    );
  }

  public onSubmit() {
    this.message = '';
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    // console.log(JSON.stringify(this.form.value, null, 2));
    this.service.updateTechnology(this.form.value)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          alertify.success("Technology Updated successfully");
          this.router.navigate(['list-technology']);
        }
        else {
          this.message = data.message;
          alertify.error("Record Updation failed");
        }
      });
  }

}
