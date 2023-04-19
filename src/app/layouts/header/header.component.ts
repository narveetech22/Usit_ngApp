import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
// import { AuthService } from 'src/app/auth.service';
import { Employee } from 'src/app/Usit/modal/employee';
import { ActivatedRoute, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { timer } from 'rxjs/internal/observable/timer';
// import { timer } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usarName!: any;
  userId!: any;
  roleId!: any;
  currentUser: any = new Employee();
  designation!: any;
  currentUser2!: any;

  constructor(private activatedRoute: ActivatedRoute, @Inject(DOCUMENT) private document: Document, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {
      localStorage.removeItem('userName');
      localStorage.removeItem('token');
      localStorage.removeItem('roles');
      localStorage.removeItem('userid');
      this.router.navigate(['/']);
    }
    this.usarName = localStorage.getItem('userName');
    this.usarName = this.usarName.replace(/['\"]+/g, '');
  }
  sidebarToggle() {
    //toggle sidebar function toggle-sidebar 
    //bi bi-list toggle-sidebar-btn
    this.document.body.classList.toggle('toggle-sidebar');
  }
}
