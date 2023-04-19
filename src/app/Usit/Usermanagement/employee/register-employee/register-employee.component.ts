import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { UsermanagementService } from 'src/app/Usit/services/usermanagement.service';
@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent implements OnInit {

  form: any = FormGroup;
  submitted = false;
  rolearr: any = [];
  message!: string;
  blur!: string;
  managerflg = false;
  teamleadflg = false;
  managerarr: any = [];
  tlarr: any = [];
  constructor(private service: UsermanagementService, private router: Router, private formBuilder: FormBuilder) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.getRoles();
    this.getManager();
    this.form = this.formBuilder.group(
      {
        fullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],//['', Validators.required, Validators.minLength(6)],
        pseudoname: [''],
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        personalcontactnumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{3}[0-9]{9}$|[0]{1}[0-9]{10}$|[1]{1}[0-9]{10}$')]],
        //['', [Validators.required]],
        companycontactnumber: [this.form.companycontactnumber],
        designation: [this.form.designation],
        department: ['', Validators.required],
        manager: [''],
        teamlead: [''],
        role: this.formBuilder.group({
          roleid: new FormControl('', [
            Validators.required
          ]),
        })
      });
    // for psuedo name validation
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
      console.log()
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


    // for team lead validation 

    // this.form.get('role.roleid').valueChanges.subscribe((res: any) => {
    //   const manager = this.form.get('manager');
    //   if (res == 4) {
    //     this.teamleadflg = false;
    //     this.managerflg = true;
    //     manager.setValidators(Validators.required);
    //   }
    //   else {
    //     this.teamleadflg = false;
    //     this.managerflg = false;
    //     manager.clearValidators();
    //   }
    //   manager.updateValueAndValidity();
    // });
  }

  getRoles() {
    this.service.getRolesdropdown().subscribe(
      (response: any) => {
        this.rolearr = response.data;
      })
  }

  getManager() {
    this.service.getManagerdropdown().subscribe(
      (response: any) => {
        this.managerarr = response.data;
      })
  }

  managerid(event: any) {
    const id = event.target.value;
    this.getTeamLead(id);
  }
  getTeamLead(id: number) {
    this.service.getTLdropdown(id).subscribe(
      (response: any) => {
        this.tlarr = response.data;
      })
  }

  public onSubmit() {
    this.message = '';
    this.submitted = true;
    if (this.form.invalid) {
      this.blur = "enable"
      return;
    }
    else {
      this.blur = "Active"
    }
    console.log(this.form.value)
    /*
    this.service.registerEMployee(this.form.value)
      .subscribe((data: any) => {
        this.blur = "Active"
        if (data.status == 'Success') {
          alertify.success("Employee Added successfully");
          this.form.reset();
          this.router.navigate(['list-employees']);
        }
        else {
          this.blur = "enable"
          this.message = data.message;
          alertify.error("Record Insertion failed");
        }
      },
        error => {  // error response
          this.blur = "enable"
          this.message = "Record Insertion failed";
          alertify.error("Record Insertion failed");
        }
      );
      */
  }
}