import { Component, OnInit } from '@angular/core';
import { RecruiterService } from 'src/app/Usit/services/recruiter.service';
import { VendorService } from 'src/app/Usit/services/vendor.service';
import { read, utils, writeFile } from 'xlsx';
@Component({
  selector: 'app-recruiterexcelupl',
  templateUrl: './recruiterexcelupl.component.html',
  styleUrls: ['./recruiterexcelupl.component.css']
})
export class RecruiterexceluplComponent implements OnInit {
  ROLEID!: number;
  file!: any;
  excel: any[] = [];
  constructor(private service: RecruiterService) { }

  ngOnInit(): void {
    // this.excel = 
    // [{ Id: '1001', name: 'Anil SIngh', site: 'http://www.code-sample.com' },
    // { Id: '1002', name: 'Alok', site: 'http://www.code-view.com' },
    // { Id: '1003', name: 'Reena', site: 'http://www.code-sample.xyz' },
    // { Id: '1004', name: 'Dilip', site: 'http://www.codefari.com' },
    // ];
  }

  handleImport(event: any) {
    this.file = event.target.files[0];
    const files = event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          this.excel = rows;
          //console.log(rows)
        }
      }
      reader.readAsArrayBuffer(file);
    }
  }

  handleExport() {
    const headings = [[
      'CompanyName',
      'RecruiterName',
      'Email',
      'ContactNumber',
      'PersonalNumber',
      'Country',
      'State',
      'IP_Address',
      'Fed_Id',
      'Designation',
      'LinkedIn',
    ]];
    //console.log(this.excel+" kiran ");
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, this.excel, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'data');
    writeFile(wb, 'Recruiter Sample.xlsx');
  }



  uploadfile() {
    let formData = new FormData();
    formData.append("file", this.file);
    this.service.uploadexcel(formData).subscribe(
      (data) => {
        //console.log(data)
      },
      (error) => {
        //console.log(error)
      }
    );
    // console.log("hhhh "+this.file)
    // console.log(this.file )
  }

}
