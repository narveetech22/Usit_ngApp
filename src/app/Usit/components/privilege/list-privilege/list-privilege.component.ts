import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'src/app/Usit/services/role.service';
import { Request } from 'src/app/Usit/modal/prevelies.module';
import * as alertify from 'alertifyjs';
import { UsermanagementService } from 'src/app/Usit/services/usermanagement.service';
@Component({
  selector: 'app-list-privilege',
  templateUrl: './list-privilege.component.html',
  styleUrls: ['./list-privilege.component.css']
})
export class ListPrivilegeComponent implements OnInit {
  form: any = FormGroup;
  message!: string;
  id!: number;
  RoleName!: string;
  entity: PrivilageEntity[] = [];
  selectedRoles: string[] = [];
  user = new PrivilageEntity();
  type: string[] = [];
  name!: string;
  constructor(private _service: UsermanagementService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private service: RoleService, private router: Router) { }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this._service.getrolebyid(this.id).subscribe(
      (response: any) => {
        this.RoleName = response.data.rolename;
      }
    );
    this.service.getallprivilages(this.id).subscribe(
      (response: any) => {
        this.entity = response.data;
        this.entity.forEach(client => {
          if (client.privid != null) {
            this.selectedRoles.push(client.privid);
          }
        });
      }
    );
  }
  onChangeCategory(event: any, role: any) {
    if (event.target.checked) {
      this.addUser(role)
    }
    else {
      this.removeUser(role)
    }
  }

  addUser(user: any) {
    this.selectedRoles.push(user.previd);
    this.type.push(user.type + '-' + user.previd);
  }

  removeUser(user: any) {
    const index: number = this.selectedRoles.indexOf(user.previd);
    if (index !== -1) {
      this.selectedRoles.splice(index, 1);
    }

    const index2: number = this.type.indexOf(user.type + '-' + user.previd);
    if (index2 !== -1) {
      this.type.splice(index, 1);
    }
  }

  addprevilages() {
    const request: Request = { roleid: this.id, RoleName: this.RoleName, type: this.type, name: this.name, prev: this.selectedRoles };
    //console.log(JSON.stringify(request) + " ------");
    /////
    this.service.restapi(request).subscribe(
      (result) => {
        this.router.navigate(['/list-roles']);
        alertify.success("privilege's added Successfully ");

      }, (error: any) => {
        if (error.status == 401) {
          this.message = "privilege's not added Successfully";
          alertify.error("invalid credentials");
        }
        else {
          this.message = "privilege's not added Successfully";
          alertify.error("privilege's added Successfully");
        }
      });
    //
  }
}

class UsersToRemove {
  Users: any[];
  constructor() { this.Users = []; }
  InAction: boolean = false;
  AddUser(user: any): void {
    if (!this.UserExists(user)) {
      this.Users.push(user);
    }
  }
  RemoveUser(user: any): void {
    for (var _i = 0; _i < this.Users.length; _i++) {
      if (this.Users[_i].id == user.id) {
        this.Users.splice(_i, 1)
      }
    }
  }
  UserExists(user: any): boolean {
    let exists = false;
    for (var _i = 0; _i < this.Users.length; _i++) {
      if (this.Users[_i].id == user.id) {
        exists = true;
      }
    }
    return exists;
  }
}


class PrivilageEntity {
  previd!: number;
  type!: string;
  name!: string;
  selected = false;
  roles?: string[];
  privid!: string;
}

/*
 this.priarr.forEach(client => {
          if (this.typearr.indexOf(client.type) === -1) {
            this.typearr.push(client.type);
          }
        });

*/