import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { MastersService } from 'src/app/Usit/services/masters.service';
import { Masters } from 'src/app/Usit/modal/masters';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {

  submitted = false;
  form: any = FormGroup;
  id!: number;
  tech = new Masters();
  message!: string;
  e164Number!:any
  phnnumber:any
  inputKeys:any
  valueMap:any
  constructor(private service: MastersService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }
 
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.service.getcitybyid(this.id).subscribe(
      (response: any) => {
        this.tech = response.data 
      }
    )

    this.form = this.formBuilder.group(
      {
        cityname: ['', Validators.required],
      }
    );
  }
  splnumber:any
  number!:any;
  convert:any;
  phonenumber:any
  public onSubmit() {
    this.message = '';
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    // this.number=this.tech.cityname
    // console.log(this.number)
    // this.convert=this.number.substring(2,13)
    //    console.log(this.convert)

//  console.log(JSON.stringify(this.tech))
    // this.form.get("cityname").setValue(this.number.e164Number);
    console.log(this.number.e164Number)
//     this.splnumber=this.number.e164Number
//     console.log( this.splnumber)
//     this.convert=this.splnumber.toString()
//     console.log(this.convert)
//     let result =this.convert.substring(2,13)
//     console.log(result)
//     this.phonenumber=result  
console.log(this.tech) 
    this.service.addcity(this.tech)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          alertify.success("City Updated successfully");
          this.form.reset();
          this.router.navigate(['list-city']);
        }
        else {
          this.message = data.message;
          alertify.error("Record updation failed");
        }
      });
  }
}
