import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Techsupport } from 'src/app/Usit/modal/techsupport';
import * as alertify from 'alertifyjs';
import { MastersService } from 'src/app/Usit/services/masters.service';
@Component({
  selector: 'app-addtechsupport',
  templateUrl: './addtechsupport.component.html',
})
export class AddtechsupportComponent implements OnInit {
  autoskills!: string;
  message = "";
  registerForm: any = FormGroup;
  entity = new Techsupport();
  showAlert = false;
  submitted = false;
  techdata: any = [];
  constructor(private service: MastersService, private formBuilder: FormBuilder, private router: Router) { }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  ngOnInit(): void {

    this.service.gettechnicalskills().subscribe(
      (response: any) => {
        this.techdata = response.data;
        // console.log(response.data);
      }
    )

    // this.gettech();
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      pseudoname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      location: [this.registerForm.location],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobile: ['', Validators.required],// ['', [Validators.required, Validators.pattern("^[0-9]*$")]],//['', Validators.required],
      secmobile: ['', Validators.required],// ['', [Validators.required, Validators.pattern("^[0-9]*$")]],//['', Validators.required],
      experience: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],//['', Validators.required],

      technology: this.formBuilder.group({
        id: new FormControl('', [
          Validators.required
        ]),
      }),

      skills: ['', Validators.required],
    });
  }

  techskills(event: any) {
    const newVal = event.target.value;
    this.service.getSkilldata(newVal).subscribe(
      (response: any) => {
        this.autoskills = response.data;
      }
    )
  }

  saveVendor() {
    this.message = "";
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.service.registerTechSupport(this.registerForm.value).subscribe
      (
        (response: any) => {
          if (response.status == "success") {
            alertify.success(response.message);
            this.router.navigate(['list-techsupport']);
          }
          else {
            this.message = "Record already available with the given Email";
            alertify.error(response.message);
          }
        }
      )
  }
  //gettech

  // technical skills supporting document
  gettech() {
    this.service.gettechnicalskills().subscribe(
      (response: any) => {
        this.techdata = response.data;
        //console.log(response.data);
      }
    )
  }
}
