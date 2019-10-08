import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../_models/mensaje';
import { Pagination } from '../_models/Pagination';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  mensajes: Mensaje[];
  pagination: Pagination;
  buzon: String = 'noLeidos';

  constructor(private userService: UserService, private authService: AuthService,
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.mensajes = data['mensajes'].result;
      this.pagination = data['mensajes'].pagination;
    });
  }

  getMensajes() {
    const { id: userId } = this.authService.getCurrentUser();
    this.userService
      .getMensajes(userId, this.pagination.currentPage, this.pagination.pageSize, this.buzon)
      .subscribe(resp => {
        this.mensajes = resp.result;
        this.pagination = resp.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getMensajes();
  }

}
