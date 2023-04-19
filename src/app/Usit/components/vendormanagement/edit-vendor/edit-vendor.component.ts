import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/Usit/modal/vendor';
import { VendorService } from 'src/app/Usit/services/vendor.service';
import * as alertify from 'alertifyjs';
import { MastersService } from 'src/app/Usit/services/masters.service';
@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
})
export class EditVendorComponent implements OnInit {

  submitted = false;
  form: any = FormGroup;
  id!: number;
  entity = new Vendor();
  message!: string;
  cityarr: any = [];
  pinarr: any = [];
  statearr: any = [];
  // ROLEID!:any;
  constructor(private service: VendorService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private masterservice: MastersService) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.getcity();
    this.getpin();
    this.getstatedetails();

    this.id = this.activatedRoute.snapshot.params['id'];
    this.service.getEntity(this.id).subscribe(
      (response: any) => {
       // console.log(response.data); 
        this.entity = response.data
      }
    );
    this.form = this.formBuilder.group(
      {
        company: ['', [Validators.required]],//, Validators.pattern('^[a-zA-Z ]*$')
        location1: [this.form.location1],
        location2: [this.form.location2],
        fedid: [this.form.fedid],
        vendortype: ['', Validators.required],
        companytype: [this.form.companytype],//['', Validators.required],
        tyretype: [''],
        client: ['', Validators.required],
        addedby: [this.entity.addedby],
        updatedby: [this.entity.updatedby],
         role: [this.entity.role ],
        details :[this.form.details],
        status: [this.entity.status],
        remarks: [this.entity.remarks],
        staff: [this.entity.staff],
        revenue: [this.entity.revenue],
        website: [this.entity.website],
        facebook: [this.entity.facebook],
        industrytype: [this.entity.industrytype],
        linkedinid: [this.entity.linkedinid],
        twitterid: [this.entity.twitterid],
        vmsid: [this.entity.vmsid],

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

        city: this.formBuilder.group({
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

  public onSubmit() {
    this.message = '';
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.entity.updatedby = localStorage.getItem('userid');
    // this.entity.role = localStorage.getItem('roleId');
    // console.log(JSON.stringify(this.entity))
    this.service.updateEntity(this.entity)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          alertify.success("Record Updated successfully");
          this.router.navigate(['list-vendor']);
        }
        else {
          this.message = data.message;
          alertify.error("Record Updatiopn failed");
        }
      });
  }

  getcity() {
    this.masterservice.getcitydetails().subscribe(
      (response: any) => {
        this.cityarr = response.data;
        // console.log(response.data);
      }
    )
  }

  getpin() {
    this.masterservice.getpindetails().subscribe(
      (response: any) => {
        this.pinarr = response.data;
        //console.log(response.data);
      }
    )
  }

  getstatedetails() {
    this.masterservice.getstatedetails().subscribe(
      (response: any) => {
        this.statearr = response.data;
        //console.log(response.data);
      }
    )
  }
}
