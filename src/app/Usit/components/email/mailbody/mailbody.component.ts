import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from 'src/app/Usit/modal/email';
import { EmailService } from 'src/app/Usit/services/email.service';

@Component({
  selector: 'app-mailbody',
  templateUrl: './mailbody.component.html',
  styleUrls: ['./mailbody.component.css']
})
export class MailbodyComponent implements OnInit {
  id!: number;
  entity = new Email();
  constructor(private service: EmailService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.service.getbyid(this.id).subscribe(
      (response: any) => {
        //console.log(JSON.stringify(response.data));
        this.entity = response.data
      }
    );
  }
}
