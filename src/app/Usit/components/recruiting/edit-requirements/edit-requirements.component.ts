import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Requirements } from 'src/app/Usit/modal/requirements';
import { RecruitingRequirementsService } from 'src/app/Usit/services/recruiting-requirements.service';
import * as alertify from 'alertifyjs';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-edit-requirements',
  templateUrl: './edit-requirements.component.html',
})
export class EditRequirementsComponent implements OnInit {
  message: any;
  techdata: any = [];
  form: any = FormGroup;
  entity = new Requirements();
  showAlert = false;
  hidesavebtn = false;
  submitted = false;
  id!: number;
  upd!: any;
  currentDate = new Date();
  employeedata: any = [];
  dropdownList: any = [];
  selectedItems: any = [];
  autoskills!: string;
  dropdownSettings: IDropdownSettings = {};
  constructor(private service: RecruitingRequirementsService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.service.getAssigneRecruiter(this.id).subscribe(
      (response: any) => {
        this.employeedata = response.data;
        this.test2(this.employeedata);
        this.forms();
      }
    );
  }
  get frm() { return this.form.controls; }
  ngOnInit(): void {
    this.upd = localStorage.getItem('userid');
    this.gettech();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.service.getEntity(this.id).subscribe(
      (response: any) => {
        this.entity = response.data;
      }
    );
  }
  forms() {
    this.form = this.formBuilder.group({
      postedon:[this.form.postedon],// ['', Validators.required],
      vendor: ['', Validators.required],
      jobtitle: ['', Validators.required],
      //category: ['', Validators.required],
      email: [this.form.email],
      mobile: [this.form.mobile],
      location: ['', Validators.required],
      jobexperience: [this.form.jobexperience],
      jobskills: [this.form.jobskills],
      employmenttype: ['', Validators.required],
      salary: [this.form.salary],
      status: [this.form.status],
      reqnumber: this.form.reqnumber,
      duration: ['', Validators.required],
      jobdescription: [this.form.jobdescription],
      requirementid : [this.form.requirementid],
      technology: this.formBuilder.group({
        id: new FormControl('', [
          Validators.required
        ]),
      }),
      // updatedby2 : this.upd,
      updatedby: localStorage.getItem('userid'),
      users: this.formBuilder.group({
        userid: localStorage.getItem('userid'),
      }),
      empid: [this.selectedItems]
      // empid : [this.selectedItems] //['', Validators.required],
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

  test2(dropdownList: any) {
    this.service.getemployee().subscribe(
      (response: any) => {
        this.dropdownList = response.data;
       // console.log("kkkkkkkk "+JSON.stringify(this.dropdownList));
      }
    )
    this.dropdownList = dropdownList;
    this.dropdownSettings = {
      idField: 'userid',
      textField: 'fullname',
      allowSearchFilter: true
    };
    this.selectedItems = dropdownList;
  }

  gettech() {
    this.service.gettech().subscribe(
      (response: any) => {
        this.techdata = response.data;
      }
    )
  }
  saveEntity() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      this.hidesavebtn = false;
      return;
    }
    else {
      this.hidesavebtn = true;
    }
    this.entity.updatedby = localStorage.getItem('userid');//this.form.value.updatedby;
    //console.log(JSON.stringify(this.entity) + " kkkk " + JSON.stringify(this.form.value, null, 2) + " =============== >>");
     // console.log(JSON.stringify(this.entity)+" =============== ");
     //console.log(JSON.stringify(this.entity));
     //console.log(JSON.stringify(this.entity));
    this.service.updateRequirement(this.form.value).subscribe((data: any) => {
      this.hidesavebtn = true;
      if (data.status == 'success') {
        alertify.success("Record Updated successfully");
        this.form.reset();
        this.router.navigate(['recruiting-requirements']);
      }
      else {
        this.hidesavebtn = false;
        this.message = data.message;
        alertify.error("Record updation failed");
      }
    });
  }
}
