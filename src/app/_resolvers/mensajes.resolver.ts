import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Mensaje } from '../_models/mensaje';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MensajesResolver implements Resolve<Mensaje[]> {
  pageNumber = 1;
  pageSize = 5;
  buzon: string = 'noLeidos';

  constructor(private userService: UserService, private alertify: AlertifyService,
    private router: Router, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Mensaje[]> {
    return this.userService.getMensajes(this.authService.getCurrentUser().id, this.pageNumber, this.pageSize, this.buzon)
      .pipe(
        // Si no se pudo obtener los datos, no carga el componente
        catchError(error => {
          this.alertify.error('Ocurrió un error al intentar obtener los mensajes');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
