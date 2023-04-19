import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Consultantinfo } from '../../modal/consultantinfo';
import { ConsultantService } from '../../services/consultant.service';

@Component({
  selector: 'app-consultantreport',
  templateUrl: './consultantreport.component.html',
  styleUrls: ['./consultantreport.component.css']
})
export class ConsultantreportComponent implements OnInit {
  form: any = FormGroup;
  submitted = false;
  showReport = false;
  c_data: any = [];
  Activecnt = 0;
  groupby!:any;
  constructor(private formBuilder: FormBuilder,
    private service: ConsultantService) { }
  get f() { return this.form.controls; }
  ngOnInit() {
    this.form = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      groupby: ['', Validators.required]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.showReport = false;
      return;
    }
    else {
      this.showReport = true;
    }//consultant_report
    const lenkedIn = this.form.get('groupby')?.value;
    this.groupby = lenkedIn;
    console.log(JSON.stringify(this.form.value, null, 2) + " =============== ");
    this.service.consultant_report(this.form.value)
      .subscribe((data: any) => {
        console.log(data.data);
        this.c_data = data.data;
      });
  }
  reset() {
    this.form.reset();
  }
//consult_data:any = [];
consultant: Consultantinfo[] = [];
  drilldown(date: any, status: any) {
    alert(date + ", " + status)
    return this.service.consultant_DrillDown_report(date, status).subscribe(
      ((response: any) => {
        this.consultant = response.data;
       alert(this.consultant)
      })
    );

  }
  // pagination code
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  onTableDataChange(event: any) {
    this.page = event;
    //this.getAll(this.flag);
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    //this.getAll(this.flag);
  }
}
