import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(private userService: UserService, private alertify: AlertifyService,
    private authService: AuthService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = this.authService.getDecodedToken().nameid;
    return this.userService.getUser(id).pipe(
      // Si no se pudo obtener los datos, no carga el componente
      catchError(error => {
        this.alertify.error('Ocurrió un error al intentar obtener los datos');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
