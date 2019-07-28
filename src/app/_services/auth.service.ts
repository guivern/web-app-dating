import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(`${environment.baseUrl}auth/login`, model)
      .pipe(
        map((resp: any) => {
          const user = resp;
          if (user) {
            localStorage.setItem('datingToken', user.token);
          }
        })
      );
  }

  register(model: any) {
    return this.http.post(`${environment.baseUrl}auth/register`, model);
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

  getDecodedToken() {
    const token = this.getToken();
    return this.jwtHelper.decodeToken(token);
  }

}
