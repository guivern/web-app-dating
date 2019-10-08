import { Component, OnInit, Input } from '@angular/core';
import { Mensaje } from 'src/app/_models/mensaje';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() receptorId: number;
  mensajes: Mensaje[];

  constructor(private userService: UserService, private authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.getMensajes();
  }

  getMensajes() {
    const { id: userId } = this.authService.getCurrentUser();
    this.userService.getConversacion(userId, this.receptorId)
      .subscribe(resp => {
        this.mensajes = resp;
      }, error => {
        this.alertify.error(error);
      });
  }

}
