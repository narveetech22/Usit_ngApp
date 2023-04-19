import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as alertify from 'alertifyjs';
import { HttpClient } from '@angular/common/http';
import { ConsultantService } from '../../services/consultant.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
// import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-addconsultant',
  templateUrl: './addconsultant.component.html',
  styleUrls: ['./addconsultant.component.css']
})
export class AddconsultantComponent implements OnInit {
  @Input() value: any;
  flag!: any;
  //private baseUrl = "http://69.216.19.140:8080/usit/"; 
  //private baseUrl = "http://localhost:8090/usit/";
  private baseUrl: string = environment.API_BASE_URL;
  showSearches: boolean = false;
  myControl: FormControl = new FormControl();
  uploadedfiles: string[] = [];
  message: any;
  form: any = FormGroup;
  visadata: any = [];
  techdata: any = [];
  requirementdata: any = [];
  submitted = false;
  flg = true;
  arraydt: any = [];
  consultdata: any = [];
  QualArr: any = [];
  other = false;
  autoskills!: string;
  latestrequirement!: any;
  userForm:any= FormGroup;
  role!: any;
  records:any = [];
  selectedName : any = '';
  nameDisplayModel = '';
 public id:any
  toggleBool =false;
  users:any;
  statearr:any;
  constructor(private _service: ConsultantService, private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,private fb: FormBuilder) {
  }
  public numberdisply:any;
  get frm() { return this.form.controls; }
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.getvisa();
    this.gettech();
    this. hideList();
    this.  getstate()
    this.getQualification();
    this.flag = this.activatedRoute.snapshot.params['flg'];
    this.validations(1, this.flag);
    if (this.flag == 'sales') {
      this.flag = "sales";
    }
    else if (this.flag == 'presales') {
      this.flag = "presales";
      //this.flag = "Recruiting";
      /*this._service.getrequirements().subscribe(
        (response: any) => {
          this.requirementdata = response.data;
          this.latestrequirement = this.requirementdata[0][0];
          console.log(this.latestrequirement + " == " + JSON.stringify(this.requirementdata))
          this.validations(this.latestrequirement, this.flag);
        }
      );
      */
    }
    else {
      this.flag = "Recruiting";
      /*this._service.getrequirements().subscribe(
        (response: any) => {
          this.requirementdata = response.data;
          this.latestrequirement = this.requirementdata[0][0];
          console.log(this.latestrequirement + " == " + JSON.stringify(this.requirementdata))
          this.validations(this.latestrequirement, this.flag);
        }
      );
      */
    }

    // this.filteredOptions = this.myControl.valueChanges
    // .pipe(
    //   startWith(''),
    //   map(val => this.filter(val))
    // );
  }
  validations(id: any, flg: string) {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],//['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z]*$")]],
      lastname: ['', Validators.required],///^[+]\d{12}$   /^[+]\d{12}$   ^[0-9]*$
      consultantemail: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]],
      //consultantemail: ['', [Validators.required, Validators.email]],//, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      //contactnumber: ['', [Validators.required, Validators.pattern('^[+]{1}[1]{1}[0-9]{10}$|[+]{1}[0-9]{2}[0-9]{10}$')]],
      contactnumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{3}[0-9]{9}$|[0]{1}[0-9]{10}$|[1]{1}[0-9]{10}$')]],
      // contactnumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{3}[0-9]{9}$|[0]{1}[0-9]{10}$|[1]{1}[0-9]{9}$')]],
      visa: this.formBuilder.group({
        vid: new FormControl('', [
          Validators.required
        ]),
      }),
      position: ['', Validators.required],
      priority: [''],
      linkedin: [''],
      // status:[this.form.status],
      status: ['Initiated', Validators.required],
      // passportnumber: ['', Validators.required],
      projectavailabity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      availabilityforinterviews: ['', Validators.required],
      experience: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      ratetype: ['', Validators.required],
      hourlyrate: [this.form.hourlyrate],
      currentlocation: ['', Validators.required],
      relocation: this.formBuilder.group({
        id: new FormControl('', [
          Validators.required
        ]),
      }),
      state: this.formBuilder.group({
        id: [''],
      }),
      id: [''],
      relocatOther: [''],
      technology: this.formBuilder.group({
        id: new FormControl('', [
          Validators.required
        ]),
      }),

      otherfile:this.fb.group({
        username: [''],
        attachment: [''],
      
        }),
  
        otherDocuments : this.fb.array([
         
        ]),
      skills: [this.form.skills],
      summary: [this.form.summary],
      consultantflg: flg,
      /* requirements: this.formBuilder.group({
         requirementid: id
       }),
       */
      qualification: this.formBuilder.group({
        id: new FormControl('', [
          Validators.required
        ]),
      }),
      // qualification: ['', Validators.required],
      //specialization: ['', Validators.required],
      university: ['', Validators.required],
      yop: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      companyname: [this.form.companyname],
      refname: [this.form.refname],
      refname1: [this.form.refname1],
      refcont: new FormControl(this.form.refcont, [
        Validators.minLength(10),
        Validators.pattern("^[0-9]*$")
      ]),
      refcont1: new FormControl(this.form.refcont1, [
        Validators.minLength(10),
        Validators.pattern("^[0-9]*$")
      ]),
      refemail: new FormControl(this.form.refemail, [
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      refemail1: new FormControl(this.form.refemail1, [
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      addedby: this.formBuilder.group({
        userid: localStorage.getItem('userid'),
      })
    });
    this.form.get('status').valueChanges.subscribe((res: any) => {
      const consultantemail = this.form.get('consultantemail');
      const contactnumber = this.form.get('contactnumber');
      const projectavailabity = this.form.get('projectavailabity');
      const availabilityforinterviews = this.form.get('availabilityforinterviews');
      const qualification = this.form.get('qualification');
      const university = this.form.get('university');
      const yop = this.form.get('yop');
      const position = this.form.get('position');
      if (res == "Tagged") {
        consultantemail.clearValidators();
        contactnumber.clearValidators();
        projectavailabity.clearValidators();
        availabilityforinterviews.clearValidators();
        position.clearValidators();
        university.clearValidators();
        qualification.clearValidators();
        yop.clearValidators();
      }
      else {
        consultantemail.setValidators([Validators.required, Validators.email, Validators.pattern('[a-zA-Z]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]);
        contactnumber.setValidators([Validators.required, Validators.pattern('^\\+?[0-9]{3}[0-9]{9}$|[0]{1}[0-9]{10}$|[1]{1}[0-9]{10}$')]);
        projectavailabity.setValidators([Validators.required, Validators.pattern("^[0-9]*$")]);
        availabilityforinterviews.setValidators(Validators.required);
        position.setValidators(Validators.required);
        qualification.setValidators(Validators.required);
        university.setValidators(Validators.required);
        yop.setValidators([Validators.required, Validators.pattern("^[0-9]*$")]);
      }
      consultantemail.updateValueAndValidity();
      contactnumber.updateValueAndValidity();
      projectavailabity.updateValueAndValidity();
      availabilityforinterviews.updateValueAndValidity();
      position.updateValueAndValidity();
      qualification.updateValueAndValidity();
      university.updateValueAndValidity();
      yop.updateValueAndValidity();
    });
    this.form.get('relocation').valueChanges.subscribe((res: any) => {
      const relocatOther = this.form.get('relocatOther');
      if (res == "Other") {
        this.other = true;
        relocatOther.setValidators(Validators.required);
      }
      else {
        this.other = false;
        relocatOther.clearValidators();
      }
      relocatOther.updateValueAndValidity();
    });

   
    

    const priority = this.form.get('priority');

    //const requirements = this.form.get('requirements');
    if (this.flag == 'sales') {
      priority.setValidators(Validators.required);
      //requirements.clearValidators();
      this.form.get("requirements").patchValue(null);
    }
    else {
      priority.clearValidators();
      // requirements.setValidators(Validators.required);
    }
    priority.updateValueAndValidity();
    // requirements.updateValueAndValidity();
  }

  techskills(event: any) {
    const newVal = event.target.value;
    alert(newVal)
    this._service.getSkilldata(newVal).subscribe(
      (response: any) => {
        this.autoskills = response.data;
        console.log( this.autoskills )
      }
    );
  }
  options: any = {
    componentRestrictions: { country: ['IN', 'US'] }
  }

  address = '';
  handleAddressChange(address: Address) {
    this.address = address.formatted_address;
  }

  backTo(){
    if (this.flag == 'sales') {
      this.router.navigate(['sales-consultants/sales']);
    }
    else if (this.flag == 'presales') {
      this.router.navigate(['pre-sales/presales']);
    }
    else {
      this.router.navigate(['recruiting-consultants/recruiting']);
    }
  }
  addDocuments(): void {
  


   
    let otherDocuments = this.form.get('otherDocuments') as FormArray;
    otherDocuments.push(this.fb.group({
      username : [],
      attachment : [],
   
    
    }))
  }
  removeDocuments(index:any) {
    (this.form.get('otherDocuments') as FormArray).removeAt(index);
    let otherDocuments = this.form.get('otherDocuments') as FormArray;
    otherDocuments.removeAt(index)
  }
  saveEntity() {
    this.submitted = true;
    //this.flg = false;
    // stop here if form is invalid
    console.log(this.form.value)
    // if (this.form.invalid) {
    //   return;
    // }
    console.log(this.form.value)
    // if (this.flag == 'sales') {
    //   this.form.get("requirements").patchValue(null);
    // }
    const lenkedIn = this.form.get('linkedin')?.value;
    if (lenkedIn != '' || lenkedIn != null) {
      var items = lenkedIn.split("in/");
      this.form.get('linkedin').setValue(items[1]);
      // this.form.controls['linkedin'].value = items[1];
      //console.log(this.form.get('linkedin')?.value);
    }
    // console.log(JSON.stringify(this.form.value, null, 2) + " =============== ");
    // console.log(JSON.stringify(this.form.value, null, 2) + " =============== ");
    if (this.flg == true) {
      this._service.registerconsultant(this.form.value)
        .subscribe((data: any) => {
          if (data.status == 'success') {
            alertify.success("Consultant added successfully");
            this.submit(data.data.consultantid);
            // this.router.navigate(['recruiting-consultant']);
            if (this.flag == 'sales') {
              this.router.navigate(['sales-consultants/sales']);
            }
            else if (this.flag == 'presales') {
              this.router.navigate(['pre-sales/presales']);
            }
            else {
              this.router.navigate(['recruiting-consultants/recruiting']);
            }
          }
          else {
            this.message = data.message;
            alertify.error("Record Insertion failed");
          }
        });
    }

  }
  // supporting drop downs
  getrequirements() {
    this._service.getrequirements().subscribe(
      (response: any) => {
        this.requirementdata = response.data;
      }
    )
  }
  getvisa() {
    this._service.getvisa().subscribe(
      (response: any) => {
        this.visadata = response.data;
      }
    )
  }
  gettech() {
    this._service.gettech().subscribe(
      (response: any) => {
        this.techdata = response.data;
      }
    )
  }
  getQualification() {
    this._service.getQualification().subscribe(
      (response: any) => {
        this.QualArr = response.data;
        //alert(JSON.stringify(this.QualArr));
      }
    )
  }

  emailDuplicate(event: any) {
    const email = event.target.value;
    this._service.duplicatecheckEmail(email).subscribe(
      (response: any) => {
        if (response.status == 'success') {
          this.message = '';
        }
        else if (response.status == 'fail') {
          const cn = this.form.get('consultantemail');
          cn.setValue('');
          this.message = 'Record already available with given Mail address';
          alertify.error("Record already available with given Mail address");
        }
        else {
          alertify.error("Internal Server Error");
        }
      }
    )
  }
  changeFn(event: any) {
    const number = event.target.value;
    this._service.duplicatecheck(number).subscribe(
      (response: any) => {
        if (response.status == 'success') {
          this.message = '';
        }
        else if (response.status == 'fail') {
          const cn = this.form.get('contactnumber');
          cn.setValue('');
          this.message = 'Record already available with given Contact Number';
          alertify.error("Record already available with given Contact Number");
        }
        else {
          alertify.error("Internal Server Error");
        }
      }
    )
  }
  @ViewChild('multifiles')
  multifiles: any = ElementRef;
  sum = 0;
  onFileChange(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      var items = file.name.split(".");
      const str = items[0];
      if (str.length > 16) {
        alertify.error("File name is toot large, please rename the file before upload, it should be 10 to 15 characters")
        this.multifiles.nativeElement.value = "";
      }
      const fileSizeInKB = Math.round(file.size / 1024);
      this.sum = this.sum + fileSizeInKB;
      if (fileSizeInKB < 4300) {
        this.uploadedfiles.push(event.target.files[i]);
      }
      else {
        this.multifiles.nativeElement.value = "";
        this.uploadedfiles = [];
        alertify.error("Files size should not exceed 4 mb")
      }
      //this.uploadedfiles.push(event.target.files[i]);
    }
    // console.log(JSON.stringify(this.uploadedfiles) + "files")
  }

  @ViewChild('resume')
  resume: any = ElementRef;
  resumeupload!: any;
  uploaddoc(event: any) {
    this.resumeupload = event.target.files[0];
    const file = event.target.files[0];
    // var items = file.name.split(".");
    // const str = items[0];
    // if (str.length > 16) {
    //   alertify.error("File name is toot large, please rename the file before upload, it should be 10 to 15 characters")
    //   this.resume.nativeElement.value = "";
    // }
    const fileSizeInKB = Math.round(file.size / 1024);
    // console.log(file + " " + JSON.stringify(this.resumeupload))
    if (fileSizeInKB > 2200) {
      this.flg = false;
      this.resume.nativeElement.value = "";
      this.message = "Resume size should be less than 2 mb";
      alertify.error("Resume size should be less than 2 mb");
      return;
    }
    else {
      this.message = "";
      this.flg = true;
    }
  }
  @ViewChild('h1b')
  h1b: any = ElementRef;
  h1bupload!: any;
  uploadH1B(event: any) {
    this.h1bupload = event.target.files[0];
    const file = event.target.files[0];
    // var items = file.name.split(".");
    // const str = items[0];
    // if (str.length > 16) {
    //   alertify.error("File name is toot large, please rename the file before upload, it should be 10 to 15 characters")
    //   this.h1b.nativeElement.value = "";
    // }
    const fileSizeInKB = Math.round(file.size / 1024);
    // console.log(file + " " + JSON.stringify(this.h1bupload))
    if (fileSizeInKB > 2200) {
      this.flg = false;
      this.h1b.nativeElement.value = "";
      this.message = "H1B size should be less than 2 mb";
      alertify.error("H1B size should be less than 2 mb");
      return;
    }
    else {
      this.message = "";
      this.flg = true;
    }
  }
  @ViewChild('dl')
  dl: any = ElementRef;
  dlupload!: any;
  uploadDL(event: any) {
    this.dlupload = event.target.files[0];
    const file = event.target.files[0];
    const fileSizeInKB = Math.round(file.size / 1024);
    // var items = file.name.split(".");
    // const str = items[0];
    // if (str.length > 16) {
    //   alertify.error("File name is toot large, please rename the file before upload, it should be 10 to 15 characters")
    //   this.dl.nativeElement.value = "";
    // }

    ///console.log(file + " " + JSON.stringify(this.dlupload))
    if (fileSizeInKB > 2200) {
      this.flg = false;
      this.dl.nativeElement.value = "";
      this.message = "DL size should be less than 2 mb";
      alertify.error("DL size should be less than 2 mb");
      return;
    }
    else {
      this.message = "";
      this.flg = true;
    }
  }
  submit(id: number) {
    const formData = new FormData();
    for (var i = 0; i < this.uploadedfiles.length; i++) {
      formData.append("files", this.uploadedfiles[i]);
    }

    if (this.resumeupload != null) {
      formData.append('resume', this.resumeupload, this.resumeupload.name);
      // formData.append("files",this.resumeupload,this.resumeupload.name);
    }

    if (this.h1bupload != null) {
      formData.append('h1b', this.h1bupload, this.h1bupload.name);
      // formData.append("files",this.resumeupload,this.resumeupload.name);
    }

    if (this.dlupload != null) {
      formData.append('dl', this.dlupload, this.dlupload.name);
      // formData.append("files",this.resumeupload,this.resumeupload.name);
    }

    //upload
    let url = this.baseUrl + 'consultant/uploadMultiple/' + id;
    this.http.post(url, formData, { observe: 'response' })
      .subscribe((response: any) => {
        if (response.status === 200) {
        } else {
        }
      }
      );
  }

        // searching dropdown....................................
        getstate() {
          // console.log(event.target.value)
          this._service.getstatedetails().subscribe(
            (response: any) => {
              this.statearr = response.data;
              // alert(response.data)
              console.log(this.statearr )
            }
          )
        }
        credentialsSearchFilter(event: any) {
          console.log(event.target.value)
          // alert(event.target.value)
          const val = event.target.value.toLowerCase();
          this.records = this.statearr.filter(function(d:any) {
            return d[1].toLowerCase().indexOf(val) !== -1 || !val;
          });
          console.log(this.records)
          // alert(this.records)
        }
        hideList(){
          this.records = [];
          this.toggleBool = false;   
        }
        getNameValue(row:any){
            console.log('hello' ,row[0],row)
            this.nameDisplayModel = row
          console.log( this.nameDisplayModel)
            this.statearr.forEach((item:any)=>{
              if(item[1] === row[1]){
                this.selectedName = item[0];
              }
            })
            this.records = [];
            console.log(this.selectedName)
                // this.form.get('id').setValue(  this.selectedName);
            // console.log(this.records )
      }
      


}