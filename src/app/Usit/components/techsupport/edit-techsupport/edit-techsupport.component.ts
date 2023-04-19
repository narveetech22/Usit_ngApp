import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Techsupport } from 'src/app/Usit/modal/techsupport';
import * as alertify from 'alertifyjs';
import { MastersService } from 'src/app/Usit/services/masters.service';
@Component({
  selector: 'app-edit-techsupport',
  templateUrl: './edit-techsupport.component.html',
})
export class EditTechsupportComponent implements OnInit {

  message = "";
  registerForm: any = FormGroup;
  entity = new Techsupport();
  showAlert = false;
  submitted = false;
  id: any;
  techdata: any = [];
  autoskills!: string;
  constructor(private service: MastersService, private formBuilder: FormBuilder, private route: ActivatedRoute, private rt: Router) { }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  ngOnInit(): void {
    this.gettech();
    this.id = this.route.snapshot.params['id'];
    this.service.getTechsupportById(this.id).subscribe(
      (response: any) => { //
        //console.log(response.data); 
        this.entity = response.data
      }
    )
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      pseudoname: ['', Validators.required],
      location: [this.registerForm.location],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobile: ['', Validators.required],// ['', [Validators.required, Validators.pattern("^[0-9]*$")]],//['', Validators.required],
      secmobile: ['', Validators.required],// ['', [Validators.required, Validators.pattern("^[0-9]*$")]],//['', Validators.required],
      experience: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],//['', Validators.required],
      // technology: ['', Validators.required],
      technology: this.formBuilder.group({
        id: new FormControl('', [
          Validators.required
        ]),
      }),

      skills: ['', Validators.required],
      id: [this.registerForm.id],
      status: [this.registerForm.status],
      remarks: [this.registerForm.remarks],
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
    // console.log(this.entity)
    this.service.updateTechSupport(this.registerForm.value).subscribe
      (
        (response: any) => {
          if (response.status == "success") {
            alertify.success(response.message);
            this.rt.navigate(['list-techsupport']);
          }
          else {
            this.message = response.message;
            alertify.error(response.message);
          }
        }
      )
  }
  //gettech

  gettech() {
    this.service.gettechnicalskills().subscribe(
      (response: any) => {
        this.techdata = response.data;
        //console.log(response.data);
      }
    )
  }
}
