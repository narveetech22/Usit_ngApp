import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-h1bemployeeinfo',
  templateUrl: './h1bemployeeinfo.component.html',
  styleUrls: ['./h1bemployeeinfo.component.css']
})
export class H1bemployeeinfoComponent implements OnInit {
  submitted = false;
  registerForm: any = FormGroup;
  constructor(private formBuilder: FormBuilder,) { }
  get f() { return this.registerForm.controls; }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      contactnumber: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]],
      currentworkauthor: ['', [Validators.required]],
      location: [''],
     
      validfromdate: ['', Validators.required],
      validtodate: ['', Validators.required],
      receiptnumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],

      everifydate: ['', Validators.required],
      lasti9date: ['', Validators.required],
      consulatepoe: ['', Validators.required],
      noticetype: ['', Validators.required],
      lcanumber: ['', Validators.required],
      servicecenter: ['', Validators.required],
      petitione: ['', Validators.required],
      beneficiaryname: ['', Validators.required],

    
    

    });
  
  
      }
      H1Binfo(){
        this.submitted = true;
        console.log("working"  , this.registerForm.value)
      }
    }
