import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
}
