import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/Usit/modal/vendor';
import { VendorService } from 'src/app/Usit/services/vendor.service';
import * as alertify from 'alertifyjs';
import { MastersService } from 'src/app/Usit/services/masters.service';
@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
})
export class AddVendorComponent implements OnInit {
  form: any = FormGroup;
  submitted = false;
  rolearr: any = [];
  cityarr: any = [];
  pinarr: any = [];
  statearr: any = [];
  message!: string;
  //ROLEID = localStorage.getItem('roleno');
  entity = new Vendor();
  constructor(private service: VendorService, private router: Router, private formBuilder: FormBuilder, private cityservice: MastersService) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.getcity();
    this.getpin();
    this.getstatedetails();
    this.form = this.formBuilder.group(
      {
        company: ['', [Validators.required]], //, Validators.pattern('^[a-zA-Z ]*$')['', Validators.required],
        location1: [this.form.location1],
        location2: [this.form.location2],
        fedid: [this.form.fedid],
        vendortype: ['', Validators.required],
        companytype: ['', Validators.required],
        tyretype: [''],
        client: ['', Validators.required],
        addedby: [this.entity.addedby],
        updatedby: [this.entity.updatedby],
        role: [this.entity.role],
        details: [this.form.details],
        staff: [this.entity.staff],
        revenue: [this.entity.revenue],
        website: [this.entity.website],
        facebook: [this.entity.facebook],
        industrytype: [this.entity.industrytype],
        linkedinid: [this.entity.linkedinid],
        twitterid: [this.entity.twitterid],
        user: this.formBuilder.group({
          userid: localStorage.getItem('userid'),
        }),

        city: this.formBuilder.group({
          id: new FormControl('', [
            Validators.required
          ]),
        }),

        pincode: this.formBuilder.group({
          id: new FormControl('', [
            Validators.required
          ]),
        }),

        states: this.formBuilder.group({
          id: new FormControl('', [
            Validators.required
          ]),
        }),

      }
    );

    this.form.get('vendortype').valueChanges.subscribe((res: any) => {
      const trtype = this.form.get('tyretype');
      if (res == "Third Layer") {
        trtype.setValidators(Validators.required);
      }
      else {
        trtype.clearValidators();
      }
      trtype.updateValueAndValidity();
    });
  }
  //getpindetails

  getcity() {
    this.cityservice.getcitydetails().subscribe(
      (response: any) => {
        this.cityarr = response.data;
      }
    )
  }

  getpin() {
    this.cityservice.getpindetails().subscribe(
      (response: any) => {
        // console.log(JSON.stringify(response.data))
        this.pinarr = response.data;
      }
    )
  }

  getstatedetails() {
    this.cityservice.getstatedetails().subscribe(
      (response: any) => {
        this.statearr = response.data;
      }
    )
  }

  Redirect() {
    this.router.navigate(['list-vms']);
  }
  public onSubmit() {
    this.message = '';
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    //console.log(JSON.stringify(this.form.value, null, 2));
    //console.log(JSON.stringify(this.entity)+" ppppppppppppppppp");
    this.service.registerEntity(this.form.value)
      .subscribe(
        (data: any) => {
          if (data.status == 'success') {
            alertify.success("Vendor Added successfully");
            // this.form.reset();
            this.router.navigate(['list-vendor']);
          }
          else {
            this.message = data.message;
            alertify.error("Vendor Already Exists");
          }
        }
      );
  }
}
