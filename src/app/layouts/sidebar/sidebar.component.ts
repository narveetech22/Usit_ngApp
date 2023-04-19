import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  hasAuth!: any;
  department!:any;
  constructor() { }

  ngOnInit(): void {
    this.hasAuth = localStorage.getItem('role');
    this.department = localStorage.getItem('department');
  }

}
