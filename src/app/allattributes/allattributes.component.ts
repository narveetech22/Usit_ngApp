import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-allattributes',
  templateUrl: './allattributes.component.html',
  styleUrls: ['./allattributes.component.css']
})
export class AllattributesComponent implements OnInit {
  submitted = false;
  allfileds: any = FormGroup;
  constructor(private fb: FormBuilder) { }
  get f() { return this.allfileds.controls; }
  ngOnInit(): void {

    this.allfileds = this.fb.group({
      fristname: ['', [Validators.required,Validators.pattern('^[_a-zA-Z-]*$')]],
      lastname: ['', [Validators.required,Validators.pattern('^[_a-zA-Z-]*$')]],
      fullname: ['', [Validators.required,Validators.pattern('^[a-zA-Z]*$')]],
      contactnumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{3}[0-9]{9}$|[0]{1}[0-9]{10}$|[1]{1}[0-9]{10}$'), Validators.minLength(10)]],
      selectnumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[_A-Za-z0-9-\+]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]],
      prvcompany: ['', Validators.required],
      Address: ['', Validators.required],
      aadhar: ['', Validators.required],
      // docupload: ['', Validators.required],
      grdcollege: ['', Validators.required],
      intermediate: ['', Validators.required],
      // numberonly: ['', Validators.required],
      radiotype: ['', Validators.required],
      checkbox: ['', Validators.required],
      date: ['', Validators.required],
      GrPercentage: ['', Validators.required ],
      InPercentage:['', Validators.required],
      sscPercentage:['', Validators.required,Validators.pattern('^\\+?[0-9]{3}[0-9]{9}$|[0]{1}[0-9]{10}$|[1]{1}[0-9]{10}$')],
      
    });
  }

  allfiled(){
    this.submitted = true;
    if (this.allfileds.invalid) {
      return;
    }
    console.log(" working==========>"  , this.allfileds.value)
  }
}
