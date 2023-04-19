import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleService } from 'src/app/Usit/services/role.service';
import * as alertify from 'alertifyjs';
import { MastersService } from 'src/app/Usit/services/masters.service';
import { Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  form: any = FormGroup;
  constructor(private service: MastersService, private formBuilder: FormBuilder, private router: Router) { }
  submitted = false;
  message!: string;
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        cityname: ['', Validators.required],
      //  mobile: ['', Validators.required],
      }
    );
  }
  number:any
  onSubmit() {
    this.submitted = true;
    console.log(this.form.value)
    if (this.form.invalid) {
      return;
    }
    this.form.get("cityname").setValue(this.number.e164Number);
   console.log(JSON.stringify(this.number.e164Number)+"===")
    console.log(this.form.value)
    this.service.addcity(this.form.value)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          alertify.success("City Added successfully");
          this.form.reset();
          this.router.navigate(['list-city']);
        }
        else {
          this.message = data.message;
          alertify.error("City Already Exists");
        }
      });
  }
}
