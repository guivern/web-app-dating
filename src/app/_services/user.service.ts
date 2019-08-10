import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('datingToken')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}users`, httpOptions);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}users/${id}`, httpOptions);
  }

}
