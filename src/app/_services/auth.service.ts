import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  // fotoUrl = new BehaviorSubject<string>('../../assets/user.png');
  // fotoUrlActual = this.fotoUrl.asObservable();

  constructor(private http: HttpClient) { }

  // updateFotoUrl(fotoUrl: string) {
  //   this.fotoUrl.next(fotoUrl);
  // }

  updateFotoUrl(fotoUrl: string) {
    const user = this.getCurrentUser();
    user.fotoUrl = fotoUrl;
    localStorage.setItem('datingUser', JSON.stringify(user));
  }

  login(model: any) {
    return this.http.post(`${environment.apiBaseUrl}/auth/login`, model)
      .pipe(
        map((resp: any) => {
          const { token, userDto } = resp;
          if (token) {
            localStorage.setItem('datingToken', token);
            localStorage.setItem('datingUser', JSON.stringify(userDto));
          }
        })
      );
  }

  register(model: any) {
    return this.http.post(`${environment.apiBaseUrl}/auth/register`, model);
  }

  loggedIn() {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUsername() {
    const decodedToken = this.getDecodedToken();
    return decodedToken.unique_name;
  }

  getToken() {
    return localStorage.getItem('datingToken');
  }

  // retorna el token decodificado como un objeto
  // esto permite acceder a los claims del token
  // ej: token.nameid para obtener el id
  getDecodedToken() {
    const token = this.getToken();
    return this.jwtHelper.decodeToken(token);
  }

  getCurrentUser() {
    const userString = localStorage.getItem('datingUser');
    const user: User = JSON.parse(userString);
    return user;
  }

}
