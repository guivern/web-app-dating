import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

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

  getUsers(pageNumber?, pageSize?, userParams?): Observable<PaginatedResult<User[]>> {
    // return this.http.get<User[]>(`${this.baseUrl}users`, httpOptions);
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();

    if (userParams) {
      params = params.append('genero', userParams.genero);
      params = params.append('edadMin', userParams.edadMin);
      params = params.append('edadMax', userParams.edadMax);
      params = params.append('orderBy', userParams.orderBy);
    }

    if (pageNumber && pageSize) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    return this.http.get<User[]>(`${this.baseUrl}/users`, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));

          return paginatedResult;
        })
      );
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
