import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.model)
    .subscribe( resp => {
      console.log('Login exitoso!');
    }, err => {
      console.log('Login fallido.');
    });
  }

  loggedIn() {
    const token = localStorage.getItem('datingToken');
    return !!token;
  }

  logout() {
    localStorage.removeItem('datingToken');
    console.log('logged out');
  }

}
