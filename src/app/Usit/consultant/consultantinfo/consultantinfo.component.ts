import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Consultantinfo } from '../../modal/consultantinfo';
import { ConsultantService } from '../../services/consultant.service';
import { saveAs } from 'file-saver';
import { FileData } from '../../modal/file-data';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-consultantinfo',
  templateUrl: './consultantinfo.component.html',
  styleUrls: ['./consultantinfo.component.css']
})
export class ConsultantinfoComponent implements OnInit {
  private baseUrl: string = environment.API_BASE_URL;
  uploadedfiles: string[] = [];
  message: any;
  form: any = FormGroup;
  visadata: any = [];
  techdata: any = [];
  requirementdata: any = [];
  submitted = false;
  flg = true;
  // arraydt: any = [];
  consultdata: any = [];
  statearr: any = [];
  cityarr: any = [];
  other = false;
  entity = new Consultantinfo();
  userid = localStorage.getItem('userid');
  id!: any;
  flag!: any;
  flag1!: any;
  files!: any;
  autoskills!: string;
  constructor(private _service: ConsultantService, private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {

  }
  get frm() { return this.form.controls; }
  ngOnInit(): void {
    this.flag = this.activatedRoute.snapshot.params['flg'];
    this.flag1 = this.activatedRoute.snapshot.params['flg1'];
    this.flag = this.activatedRoute.snapshot.params['flg'];

    this.id = this.activatedRoute.snapshot.params['id'];
    
    this._service.getConsultantById(this.id).subscribe(
      (response: any) => {
        this.entity = response.data;
        this.autoskills = response.data.skills;
        this.files = response.data.fileupload;
      //  alert(JSON.stringify(this.files))
      }
    );

    if (this.flag == 'sales') {
      this.flag = "sales";
    }
    else if (this.flag == 'presales') {
      this.flag = "presales";
    }
    else {
      this.flag = "Recruiting";
    }
  }

  @ViewChild('multifiles')
  multifiles: any = ElementRef;
  sum = 0;
  onFileChange(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      //this.uploadedfiles.push(event.target.files[i]);
      const file = event.target.files[i];
      var items = file.name.split(".");
      const str = items[0];
      if (str.length > 100) {
        alertify.error("File name is toot large, please rename the file before upload, it should be 10 to 15 characters")
      }
      const fileSizeInKB = Math.round(file.size / 1024);
      this.sum = this.sum + fileSizeInKB;
      if (fileSizeInKB < 4300) {
        this.uploadedfiles.push(event.target.files[i]);
      }
      else {
        this.multifiles.nativeElement.value = "";
        this.uploadedfiles=[];
        alertify.error("Files size should not exceed 4 mb")
      }
    }
  }
  saveEntity() {
    //alert(JSON.stringify(this.fieldArray)+" "+JSON.stringify(this.newAttribute))
    this.submit(this.id);
  }
  resumedownload(id: number, filename: string) {
    this._service
      .downloadresume(id, 'resume')
      .subscribe(blob => saveAs(blob, filename));
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
          a.click();
        }
        else {
          saveAs(blob, fileData.filename)
        }
      }
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
    }

    if (this.dlupload != null) {
      formData.append('dl', this.dlupload, this.dlupload.name);
    }

    let url = this.baseUrl + 'consultant/uploadMultiple/' + id;
    this.http.post(url, formData, { observe: 'response' })
      .subscribe((response: any) => {
        if (response.status === 200) {
          alertify.success("Record Update successfully");
        }
        else {
          alertify.error("Record Updation failed");
        }
        if (this.flag1 == 'list') {
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
        else if (this.flag1 == 'sub') {
          if (this.flag == 'sales') {
            this.router.navigate(['sales-submission/sales']);
          }
          else {
            this.router.navigate(['recruiting-submission/recruiting']);
          }
        }
        else {
          if (this.flag == 'sales') {
            this.router.navigate(['sales-interview/sales']);
          }
          else {
            this.router.navigate(['recruiting-interview/recruiting']);
          }
        }

      }

      );
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
  @ViewChild('resume')
  resume: any = ElementRef;
  resumeupload!: any;
  uploaddoc(event: any) {
    this.resumeupload = event.target.files[0];
    const file = event.target.files[0];
    const fileSizeInKB = Math.round(file.size / 1024);
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
    if (fileSizeInKB > 200) {
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

  fieldArray: Array<any> = [];
  newAttribute: any = {};

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index: any) {
    this.fieldArray.splice(index, 1);
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
}
