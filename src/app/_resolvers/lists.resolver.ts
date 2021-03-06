import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ListsResolver implements Resolve<User[]> {
  pageNumber = 1;
  pageSize = 5;
  likesParam = 'likers';

  constructor(private userService: UserService, private alertify: AlertifyService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam)
      .pipe(
        // Si no se pudo obtener los datos, no carga el componente
        catchError(error => {
          this.alertify.error('Ocurrió un error al intentar obtener los datos');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
