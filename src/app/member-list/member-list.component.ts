import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, err => {
      this.alertify.error(err);
    });
  }
}
