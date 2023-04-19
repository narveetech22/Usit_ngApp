import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/Usit/services/email.service';
import * as alertify from 'alertifyjs';
import { read, utils, writeFile } from 'xlsx';
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-emailextraction',
  templateUrl: './emailextraction.component.html',
  styleUrls: ['./emailextraction.component.css']
})
export class EmailextractionComponent implements OnInit {
  form: any = FormGroup;
  submitted = false;
  hideSavebtn = false;
  excel: any[] = [];
  message!: string;
  errromsg!: string;
  constructor(private formBuilder: FormBuilder, private service: EmailService,
    private ngxService: NgxUiLoaderService) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        userName: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        userPwd: ['', Validators.required],
        fromdate: ['', Validators.required],
        todate: ['', Validators.required],
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.hideSavebtn = false;
      return;
    }
    //console.log(this.form.value)
    this.ngxService.start();
    this.service.extractmail(this.form.value)
      .subscribe((data: any) => {
        console.log(data.status);
       // this.hideSavebtn = true;
        if (data.status == 'success') {
          this.errromsg = "";
          this.ngxService.stop();
          this.hideSavebtn = false;
          alertify.success("Record Inserted successfully");
          //this.form.reset();
          this.message = "Mails Imported to DB";
          // this.router.navigate(['list-employees']);
        }
        else if (data.status == 'AuthError') {
          this.ngxService.stop();
          this.message = "";
          this.hideSavebtn = false;
          alertify.error("Invalid Credentials or mail not Exists");
          this.errromsg = "Invalid Credentials or mail not Exists";
        }
        else if (data.status == 'domain_not_matched') {
          this.ngxService.stop(); this.message = "";
          this.hideSavebtn = false;
          alertify.error("Allowed Only Narvee Domains");
          this.errromsg = "Allowed Only Narvee Domains";
        }
        else {
          this.ngxService.stop(); 
          this.message = "";
          this.hideSavebtn = false;
          this.errromsg = "Internal Server Error";
          alertify.error("Record Insertion failed");
        }
      });
    //console.log(JSON.stringify(this.form.value, null, 2));
  }
  downloadExcel() {
    this.ngxService.start();
    this.service.downloadExcel().subscribe(
      ((response: any) => {
        this.excel = response.data;
        const headings = [[
          'Company Name',
          'Subject',
          'CC Mail',
          'Recruiter Email',
        ]];
        const wb = utils.book_new();
        const ws: any = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, this.excel, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'data');
        writeFile(wb, 'MailExtraction.xlsx');
        this.ngxService.stop();
      })
    );
  }
}
