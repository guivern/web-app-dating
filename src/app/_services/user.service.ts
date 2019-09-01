import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { environment } from 'src/environments/environment';

// const httpOptions = {
//  headers: new HttpHeaders({
//    'Authorization': `Bearer ${localStorage.getItem('datingToken')}`
//  })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    // return this.http.get<User[]>(`${this.baseUrl}users`, httpOptions);
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  updateUser(id: number, user: User) {
    return this.http.put(`${this.baseUrl}/users/${id}`, user);
  }

  setFotoPrincipal(userId: number, fotoId: number) {
    return this.http.post(`${this.baseUrl}/users/${userId}/fotos/${fotoId}/principal`, {});
  }

  deleteFoto(userId: number, fotoId: number) {
    return this.http.delete(`${this.baseUrl}/users/${userId}/fotos/${fotoId}`);
  }

}
