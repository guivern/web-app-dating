import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private alertify: AlertifyService) { }

  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      return true;
    }
    this.alertify.error('Debes iniciar sesión');
    this.router.navigate(['/home']);
    return false;

  }
}
