import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(window.localStorage.getItem('datingUser'));
  userParams: any = {};
  generos = [{ value: 'hombre', display: 'Hombres' }, { value: 'mujer', display: 'Mujeres' }];
  pagination: Pagination;

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userParams.genero = this.user.genero.toLowerCase() === 'hombre' ? 'mujer' : 'hombre';
    this.userParams.edadMin = 18;
    this.userParams.edadMax = 99;
    this.userParams.orderBy = 'ultimaConexion';
  }

  limpiarFiltros() {
    this.userParams.genero = this.user.genero.toLowerCase() === 'hombre' ? 'mujer' : 'hombre';
    this.userParams.edadMin = 18;
    this.userParams.edadMax = 99;
    this.userParams.orderBy = 'ultimaConexion';
    this.getUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.pageSize, this.userParams)
      .subscribe((resp: PaginatedResult<User[]>) => {
        this.users = resp.result;
        this.pagination = resp.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }
}
