import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public auth: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.model)
    .subscribe( resp => {
      this.router.navigate(['/members']);
      this.alertify.success('Login exitoso');
    }, err => {
      this.alertify.error(err);
    });
  }

  loggedIn() {
    return this.auth.loggedIn();
  }

  logout() {
    localStorage.removeItem('datingToken');
    this.router.navigate(['/home']);
    this.alertify.message('Deslogeado');
  }

}
