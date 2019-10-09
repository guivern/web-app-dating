import { Component, OnInit, Input } from '@angular/core';
import { Mensaje } from 'src/app/_models/mensaje';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import * as moment from 'moment';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() receptorId: number;
  mensajes: Mensaje[];
  mensaje: any = {};

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

  formatFecha(fechaEnvio: Date) {
    moment.locale('es-Es');
    return moment(fechaEnvio).fromNow();
  }

  enviarMensaje() {
    const { id: emisorId } = this.authService.getCurrentUser();
    this.mensaje.receptorId = this.receptorId;
    this.userService.enviarMensaje(emisorId, this.mensaje)
      .subscribe((mensaje: Mensaje) => {
        // activa debugger y agrega punto de parada
        // debugger;
        this.mensajes.unshift(mensaje);
        this.mensaje.contenido = '';
      }, error => {
        this.alertify.error(error);
      });
  }

}
