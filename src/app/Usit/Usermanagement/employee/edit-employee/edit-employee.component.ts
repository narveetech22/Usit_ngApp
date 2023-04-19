import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/Usit/modal/employee';
import * as alertify from 'alertifyjs';
import { UsermanagementService } from 'src/app/Usit/services/usermanagement.service';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  submitted = false;
  form: any = FormGroup;
  id!: number;
  tech = new Employee();
  rolearr: any = [];
  message!: string;
  managerflg = false;
  teamleadflg = false;
  managerarr: any = [];
  tlarr: any = [];

  constructor(private _service: UsermanagementService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.getRoles();
    this.getManager();
    this.id = this.activatedRoute.snapshot.params['id'];
    this._service.getEmployeeById(this.id).subscribe(
      (response: any) => {
        this.tech = response.data;
        this.getTeamLead(this.tech.manager)
      })
    this.form = this.formBuilder.group(
      {
        fullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]], //['', Validators.required],
        //pseudoname: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(100)]],//['', Validators.required],
        pseudoname: [''],
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        contactnumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{3}[0-9]{9}$|[0]{1}[0-9]{10}$|[1]{1}[0-9]{10}$')]],
        companycontactnumber: [this.form.companycontactnumber],
        designation: [this.form.designation],
        userid: [this.form.userid],
        status: [this.form.status],
        remarks: [this.form.remarks],
        password: [this.form.password],
        department: ['', Validators.required],
        manager: [''],
        teamlead: [''],
        role: this.formBuilder.group({
          roleid: new FormControl('', [
            Validators.required
          ]),
        })
      }
    );

    this.form.get('department').valueChanges.subscribe((res: any) => {
      const pseudoname = this.form.get('pseudoname');
      if (res == "Bench Sales") {
        pseudoname.setValidators(Validators.required);
      }
      else {
        pseudoname.clearValidators();
      }
      pseudoname.updateValueAndValidity();
    });

    // for manager validation
    this.form.get('role.roleid').valueChanges.subscribe((res: any) => {
      const manager = this.form.get('manager');
      const tl = this.form.get('teamlead');
      if (res == 4) {
        this.managerflg = true;
        manager.setValidators(Validators.required);
      }
      else if (res == 5) {
        this.managerflg = true;
        this.teamleadflg = true;
        manager.setValidators(Validators.required);
        tl.setValidators(Validators.required);
      }
      else {
        this.managerflg = false;
        this.teamleadflg = false;
        manager.clearValidators();
        tl.clearValidators();
      }
      manager.updateValueAndValidity();
      tl.updateValueAndValidity();
    });
  }

  getManager() {
    this._service.getManagerdropdown().subscribe(
      (response: any) => {
        this.managerarr = response.data;
      })
  }

  managerid(event: any) {
    const id = event.target.value;
    this.getTeamLead(id);
  }
  getTeamLead(id:number) {
    this._service.getTLdropdown(id).subscribe(
      (response: any) => {
        this.tlarr = response.data;
      })
  }
  getRoles() {
    this._service.getRolesdropdown().subscribe(
      (response: any) => {
        this.rolearr = response.data;
      })
  }

  public onSubmit() {
    this.message = '';
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this._service.updateEmployee(this.tech)
      .subscribe((data: any) => {
        if (data.status == 'Success') {
          alertify.success("Employee  Updated successfully");
          this.router.navigate(['list-employees']);
        }
        else {
          this.message = data.message;
          alertify.error("Record Updation failed");
        }
      });
  }

}
