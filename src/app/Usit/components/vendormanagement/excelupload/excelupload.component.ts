import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/Usit/services/vendor.service';
import { read, utils, writeFile } from 'xlsx';
@Component({
  selector: 'app-excelupload',
  templateUrl: './excelupload.component.html',
  styleUrls: ['./excelupload.component.css']
})
export class ExceluploadComponent implements OnInit {
  ROLEID!: number;
  file!: any;
  excel: any[] = [];
  constructor(private service: VendorService) { }

  ngOnInit(): void {
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
      'Location1',
      'Location2',
      'City',
      'State',
      'Country',
      'ZipCode',
      'TyreType',
      'VendorType',
      'Fed_Id',
      'EmployeeCount',
      'Revenue',
      'PhoneNumber',
      'Website',
      'Industry',
      'LinkedIn',
      'Twitter',
      'Facebook'
    ]];
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, this.excel, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'data');
    writeFile(wb, 'Vendor Sample.xlsx');
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
