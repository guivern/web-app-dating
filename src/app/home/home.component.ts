import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values: any;

  constructor(private authService: AuthService, private router: Router,
      private alertify: AlertifyService) {
    if (authService.loggedIn()) {
      router.navigate(['members'])
    }
  }

  ngOnInit() {
  }

  loginInvitado() {
    this.authService.login({ username: "invitado", "password": "password" })
      .subscribe(resp => {
        this.router.navigate(['/members']);
        this.alertify.success('Login exitoso');
      }, err => {
        this.alertify.error(err);
      });
  }

}
