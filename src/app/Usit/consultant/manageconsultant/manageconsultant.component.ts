import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Consultantinfo } from '../../modal/consultantinfo';
import { ConsultantService } from '../../services/consultant.service';
import { saveAs } from 'file-saver';
import { FileData } from '../../modal/file-data';
import * as alertify from 'alertifyjs';
import { ViewChild } from '@angular/core';
import { Employee } from '../../modal/employee';
@Component({
  selector: 'app-manageconsultant',
  templateUrl: './manageconsultant.component.html',
})
export class ManageconsultantComponent implements OnInit {
  private baseUrl: string = environment.API_BASE_URL;
  uploadedfiles: string[] = [];
  message: any;
  form: any = FormGroup;
  visadata: any = [];
  techdata: any = [];
  requirementdata: any = [];
  submitted = false;
  flg = true;
  consultdata: any = [];
  statearr: any = [];
  cityarr: any = [];
  QualArr:any = [];
  other = false;
  entity = new Consultantinfo();
  employee = new Employee();
  userid = localStorage.getItem('userid');
  id!: any;
  flag!: any;
  files!: any;
  autoskills!: string;
  role!: any;
  Commentflg = false;
  constructor(private _service: ConsultantService, private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }
  get frm() { return this.form.controls; }

  ngOnInit(): void {
    this.getQualification();
    this.role = localStorage.getItem('role');
    this.id = this.activatedRoute.snapshot.params['id'];
    this.flag = this.activatedRoute.snapshot.params['flg'];
    this._service.getConsultantById(this.id).subscribe(
      (response: any) => {
        this.entity = response.data;

        console.log(this.entity)
        // alert(JSON.stringify(response.data))
        this.autoskills = response.data.skills;
        if (response.data.remarks != null || response.data.remarks != '') {
          // alert(JSON.stringify(response.data.remarks))
          this.comment();
        }
        //alert(JSON.stringify(this.Commentflg))
        this.files = response.data.fileupload;
        // console.log(response.data)
      }
    );
    this.getvisa();
    this.gettech();
    this.getcity();
    this.getstate();
    this.flag = this.activatedRoute.snapshot.params['flg'];
    if (this.flag == 'sales') {
      this.flag = "sales";
    }
    else if (this.flag == 'presales') {
      this.flag = "presales";
      //this.getrequirements();
    }
    else {
      this.flag = "Recruiting";
     // this.getrequirements();
    }
    this.form = this.formBuilder.group({
      consultantid: [this.form.consultantid],
      lastname: ['', Validators.required],
      status: ['', Validators.required],
      firstname: ['', Validators.required],//['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z]*$")]],
      consultantemail: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contactnumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{3}[0-9]{9}$|[0]{1}[0-9]{10}$|[1]{1}[0-9]{10}$')]],
      //  contactnumber: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(10), Validators.minLength(10)]],
      //contactnumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{3}[0-9]{9}$|[0]{1}[0-9]{10}$|[1]{1}[0-9]{10}$'), Validators.minLength(10)]],
      visa: this.formBuilder.group({
        vid: new FormControl('', [
          Validators.required
        ]),
      }),
      position : ['', Validators.required],
      priority: [''],
      linkedin: [this.form.linkedin],
      // passportnumber: ['', Validators.required],
      projectavailabity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      availabilityforinterviews: ['', Validators.required],
      experience: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      ratetype: ['', Validators.required],
      hourlyrate: [this.form.hourlyrate],
      city: ['', Validators.required],
      state: ['', Validators.required],
      relocation: [this.form.relocation],
      relocatOther: [''],
      remarks: [''],
      technology: this.formBuilder.group({
        id: new FormControl('', [
          Validators.required
        ]),
      }),
      skills: [this.form.skills],
      summary: [this.form.summary],
      consultantflg: [this.form.consultantflg],
      /*requirements: this.formBuilder.group({
        requirementid: 1
      }),
      */
      qualification: ['', Validators.required],
     // specialization: ['', Validators.required],
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
      }),

      updatedby: this.formBuilder.group({
        userid: localStorage.getItem('userid'),
      })
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

    this.form.get('status').valueChanges.subscribe((res: any) => {
      const remarks = this.form.get('remarks');
      if (res == "Rejected") {
        this.Commentflg = true;
        remarks.setValidators(Validators.required);
      }
      else {
        this.Commentflg = false;
        remarks.clearValidators();
      }
      remarks.updateValueAndValidity();
    });

    const priority = this.form.get('priority');
   // const requirements = this.form.get('requirements');
    if (this.flag == 'sales') {
      priority.setValidators(Validators.required);
      //requirements.setValidators(Validators.required);
    }
    else {
      priority.clearValidators();
     // requirements.clearValidators();
    }
    priority.updateValueAndValidity();
    //requirements.updateValueAndValidity();
  }
  techskills(event: any) {
    const newVal = event.target.value;
    this._service.getSkilldata(newVal).subscribe(
      (response: any) => {
        this.autoskills = response.data;
      }
    )
  }
  updatedbyid!: any;
  saveEntity() {
    this.userid = localStorage.getItem("userid");
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      //console.log("error")
      return;
    }
    const lenkedIn = this.form.get('linkedin')?.value;
    if (lenkedIn != null) {
      var items = lenkedIn.split("in/");
      this.form.get('linkedin').setValue(items[1]);
    }
    this.updatedbyid = localStorage.getItem('userid');
    this.employee.userid = this.updatedbyid;
    this.entity.updatedby = this.employee;
    //console.log(JSON.stringify(this.form.value, null, 2) + " =============== " + JSON.stringify(this.entity));
    if (this.flg == true) {
      this._service.registerconsultant(this.entity)
        .subscribe((data: any) => {
          if (data.status == 'success') {
            alertify.success("Consultant Updated successfully");
            this.submit(data.data.consultantid);
          }
          else {
            this.message = data.message;
            alertify.error("Consultant Updation failed");
          }
          if (this.entity.consultantflg == 'sales') {
            this.router.navigate(['sales-consultants/sales']);
          }
          else if (this.entity.consultantflg == 'presales') {
            this.router.navigate(['pre-sales/presales']);
          }
          else {
            this.router.navigate(['recruiting-consultants/recruiting']);
          }
        });

    }
  }
  filenamelength(file: any, element: any) {
    var items = file.name.split(".");
    const str = items[0];
    if (str.length > 30) {
      alertify.error("File name is toot large, please rename the file before upload, it should be 10 to 15 characters");
      element.nativeElement.value = "";
    }
  }
  @ViewChild('multifiles')
  multifiles: any = ElementRef;
  sum = 0;
  onFileChange(event: any) {
    //const sum = 0;
    for (var i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      this.filenamelength(file, this.multifiles);
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
    }
    //alert(this.uploadedfiles.)
  }
  @ViewChild('resume')
  resume: any = ElementRef;
  resumeupload!: any;
  uploaddoc(event: any) {
    this.resumeupload = event.target.files[0];
    const file = event.target.files[0];
    const fileSizeInKB = Math.round(file.size / 1024);
    //alert(fileSizeInKB)
    this.filenamelength(file, this.resume);
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
  h1bupload!: any;
  @ViewChild('h1b')
  h1b: any = ElementRef;
  uploadH1B(event: any) {
    this.h1bupload = event.target.files[0];
    const file = event.target.files[0];
    const fileSizeInKB = Math.round(file.size / 1024);
    this.filenamelength(file, this.h1b);
    //console.log(file + " " + JSON.stringify(this.h1bupload))
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
  dlupload!: any;
  @ViewChild('dl')
  dl: any = ElementRef;
  uploadDL(event: any) {
    this.dlupload = event.target.files[0];
    const file = event.target.files[0];
    const fileSizeInKB = Math.round(file.size / 1024);
    this.filenamelength(file, this.dl);
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

  getQualification() {
    this._service.getQualification().subscribe(
      (response: any) => {
        this.QualArr = response.data;
       // alert(JSON.stringify(this.QualArr))
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
  getcity() {
    this._service.getcitydetails().subscribe(
      (response: any) => {
        this.cityarr = response.data;
      }
    )
  }
  getstate() {
    this._service.getstatedetails().subscribe(
      (response: any) => {
        this.statearr = response.data;
      }
    )
  }
  fileList?: FileData[];
  type!: any;
  filedetails(fileData: FileData) {
    this.type = fileData.filename;
    var items = this.type.split(".");
    this._service
      .downloadfile(fileData.docid)
      .subscribe(blob => {
        if (items[1] == 'pdf' || items[1] == 'PDF') {
          var fileURL: any = URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = fileURL;
          a.target = '_blank';
          // a.download = filename;
          a.click();
        }
        else {
          saveAs(blob, fileData.filename)
        }
      }
        // saveAs(blob, fileData.filename)
      );
  }
  submit(id: number) {
    const formData = new FormData();
    for (var i = 0; i < this.uploadedfiles.length; i++) {
      formData.append("files", this.uploadedfiles[i]);
    }
    if (this.resumeupload != null) {
      formData.append('resume', this.resumeupload, this.resumeupload.name);
      formData.append("files", this.resumeupload, this.resumeupload.name);
    }

    if (this.h1bupload != null) {
      formData.append('h1b', this.h1bupload, this.h1bupload.name);
      // formData.append("files",this.resumeupload,this.resumeupload.name);
    }

    if (this.dlupload != null) {
      formData.append('dl', this.dlupload, this.dlupload.name);
    }

    let url = this.baseUrl + 'consultant/uploadMultiple/' + id;
    this.http.post(url, formData, { observe: 'response' })
      .subscribe((response: any) => {
        if (response.status === 200) {
        } else {
        }
      }
      );
  }
  emailDuplicate(event: any){
    const email = event.target.value;
    this._service.duplicatecheckEmailEdit(email, this.id).subscribe(
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
    this._service.duplicatecheckedit(number, this.id).subscribe(
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
  downloadfile(id: number, filename: string, flg: string) {
    var items = filename.split(".");
    this._service
      .downloadresume(id, flg)
      .subscribe(blob => {
        if (items[1] == 'pdf' || items[1] == 'PDF') {
          var fileURL: any = URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = fileURL;
          a.target = '_blank';
          // Don't set download attribute
          //a.download = filename;
          a.click();
        }
        else {
          saveAs(blob, filename)
        }
      }
      );
  }

  show_file(blob: any, filename: string) {
    var fileURL: any = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = fileURL;
    a.target = '_blank';
    // Don't set download attribute
    a.download = filename;
    a.click();

  }
  deletefile(id: number, doctype: string) {
    const fl = doctype.toUpperCase();
    alertify.confirm("Remove File", "Are you sure you want to remove the " + fl + " ? ", () => {
      this._service.removingfile(id, doctype).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            alertify.success(fl + " removed successfully");
            this.ngOnInit();
          }
          else {
            alertify.error("file not removed");
          }
        }
      )
    }, function () { });
  }
  deletemultiple(id: number) {
    alertify.confirm("Remove File", "Are you sure you want to remove the file ? ", () => {
      this._service.removingfiles(id).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            alertify.success("file removed successfully");
            this.ngOnInit();
          }
          else {
            alertify.error("file not removed");
          }
        }
      )
    }, function () { });
  }
  comment() {
    this.Commentflg = true;
  }
}
