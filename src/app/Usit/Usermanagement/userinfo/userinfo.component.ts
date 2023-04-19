import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsermanagementService } from '../../services/usermanagement.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  form: any = FormGroup;
  flag!:any;
  entity:any=[];
  id!:any;
  constructor(private _service:UsermanagementService,private activatedRoute:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.flag = this.activatedRoute.snapshot.params['flg'];
    //alert(this.flag)
    this._service.getEmployeeInfoById(this.id).subscribe(
      (response :any)=>{ 
        this.entity = response.data;
       // alert(JSON.stringify(this.entity))
      });
  }
  saveEntity(){

  }


  

}
