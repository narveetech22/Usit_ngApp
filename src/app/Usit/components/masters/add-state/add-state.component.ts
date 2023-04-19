import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MastersService } from 'src/app/Usit/services/masters.service';
import * as alertify from 'alertifyjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.css']
})
export class AddStateComponent implements OnInit {
  form: any = FormGroup;
 
  // options: any = {
  //   componentRestrictions: { country: 'IN' }
  // }  
  statename!:any;
  myControl: FormControl = new FormControl();
  options: any = {
    // types: ['country','postalCode'],
   // componentRestrictions: { country: ['IN','US'] }
  //  types: ['postalcode', 'country'],
  types: ["address"],
  //  componentRestrictions: { country: 'IN' }
   componentRestrictions: { country: ['IN','US'] }

   
  }
  //Hyderabad Deccan Railway Station | Nampally, Red Hills, Nampally, Hyderabad, Telangana, India
  // options: any  = {
  //   bounds: undefined,
  //   fields: ['address_component'],
  //   strictBounds: false,
  //   types: ['address'],
  //   origin: undefined,
  //   componentRestrictions: undefined

  // };Ring Rd, Bhikaji Cama Place, Rama Krishna Puram, New Delhi, Delhi 110066, India
  //Ring Rd, Bhikaji Cama Place, Rama Krishna Puram, New Delhi, Delhi 110066, India

handleAddressChange(address: Address) {
  // alert(address.formatted_address+address.name)
  console.log(address.formatted_address)

 

  this.statename = address.formatted_address;
  console.log( this.statename )
  }
  // handleAddressChange(address: Address) {
  //   console.log(address.formatted_address)
  //   console.log(address.geometry.location.lat())
  //   console.log(address.geometry.location.lng())
  // }

  constructor(private service: MastersService, private formBuilder: FormBuilder, private router: Router) { }
  submitted = false;
  message!: string;
  autocom:any;
  item:any;
  listItems: any;

  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        statename: ['', [Validators.required]],
      }
    );

    // this.service.autocomplete().subscribe((response:any)=>{

    //   console.log(response.data)

    //   this.autocom=response.data
    
    // })
    

 
  }
  onSubmit() {
    console.log(this.statename)
    console.log("hello")
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.statename)
  //   alert(JSON.stringify(this.statename.address_components));
  // alert(JSON.stringify(this.form.value))
    
      
  }
// vaules(){
//   let country = 1;

//   const auto2 = this.autocom.filter((item:any)=>{
//     if(item.id == country)
//       return item;
//     else 
//       return null;
// })

// console.log(this.autocom);
// console.log()

// }
  


}
