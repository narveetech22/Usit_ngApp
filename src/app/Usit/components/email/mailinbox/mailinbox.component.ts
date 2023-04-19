import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Email } from 'src/app/Usit/modal/email';
import { EmailService } from 'src/app/Usit/services/email.service';
import { DOCUMENT } from '@angular/common';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-mailinbox',
  templateUrl: './mailinbox.component.html',
  styleUrls: ['./mailinbox.component.css']
})
export class MailinboxComponent implements OnInit {
  form: any = FormGroup;
  datarr: Email[] = [];
  tech = new Email();
  submitted = false;
  dtmodal!: string;
  isMasterSel!: boolean;
  checkedCategoryList: any = [];
  idss!: any
  constructor(@Inject(DOCUMENT) private document: Document, private service: EmailService, private router: Router, private formBuilder: FormBuilder) { }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        ids: [this.form.ids],
      }
    );
    this.document.body.classList.toggle('toggle-sidebar');
    this.allmailsList();
  }
  allmailsList() {
    this.service.getallmail().subscribe(
      ((response: any) => {
        this.datarr = response.data;
      })
    );
  }
  checkUncheckAll() {
    for (var i = 0; i < this.datarr.length; i++) {
      this.datarr[i].isSelected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedCategoryList = [];
    for (var i = 0; i < this.datarr.length; i++) {
      if (this.datarr[i].isSelected)
        this.checkedCategoryList.push(this.datarr[i]['id']);
      ///  console.log(this.datarr[i].isSelected)
    }
    //this.checkedCategoryList = JSON.stringify(this.checkedCategoryList);
  }
  isAllSelected() {
    this.isMasterSel = this.datarr.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }
  
  // movemail() {
  //   return this.service.movemail().subscribe(
  //     ((response: any) => {
  //       this.datarr = response.data;
  //     })
  //   );
  // }
  deletemailsbyids() {
    if(this.checkedCategoryList.length==0){
      alertify.error("Please select At least one record to delete ");
      return;
    }

    for (var i = 0; i < this.checkedCategoryList.length; i++) {
      this.form.get('ids').setValue(this.checkedCategoryList);
      this.tech.isSelected == true;
    }
   // console.log(this.checkedCategoryList)
    alertify.confirm("Remove Record", "Are you sure you want to remove the record ? ", () => {
      this.service.deleteEmailByIds(this.form.value).subscribe(
        ((response: any) => {
          this.form.reset();
          this.allmailsList();
        })
      )
    }, function () { })

  }

  loadanddelete() {
    return this.service.deleteAndMove().subscribe(
      ((response: any) => {
        this.datarr = response.data;
      })
    );
  }
  loadmails(){
    return this.service.movemail().subscribe(
      ((response: any) => {
        this.datarr = response.data;
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
       this.allmailsList();
     }
     onTableSizeChange(event: any): void {
       this.tableSize = event.target.value;
       this.page = 1;
       this.allmailsList();
     }
}

 //console.log(this.form.value + " ========")
    //console.log(JSON.stringify(this.form.value, null, 2) + " =============== ");
    // const request: Exp = { roles: this.checkedCategoryList, userName: 'kiran', userPwd: 'pp' };
    //const request2: Request = { roleid: this.id, RoleName: this.RoleName, type: this.type, name: this.name, prev: this.selectedRoles };
    // const request: Exp = { id2: this.checkedCategoryList };
    ///console.log(JSON.stringify(request) + " ------");
    //console.log(request)
