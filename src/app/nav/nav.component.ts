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
  fotoUrl: string;

  constructor(public auth: AuthService, private alertify: AlertifyService, private router: Router) { }
  isShown:boolean = false;
  
  ngOnInit() {
    // this.auth.fotoUrlActual.subscribe(fotoUrl => this.fotoUrl = fotoUrl);
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
    localStorage.removeItem('datingUser');
    this.router.navigate(['/home']);
    this.alertify.message('Deslogeado');
  }

  getFotoUrl() {
    const {fotoUrl} = this.auth.getCurrentUser();
    const defaultFotoUrl = '../../assets/user.png';

    return fotoUrl || defaultFotoUrl;
  }

}
