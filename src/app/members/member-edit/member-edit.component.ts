import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm') editForm: NgForm;
  // si el usuario tiene cambios sin guardar
  // e intenta cerrar la pestaña, lanza un
  // popup de advertencia
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  // esto ya no es necesario si vinculamos el usuario del localstorage
  // en el template, debido que al actualizar la foto, tambien
  // actualizamos el usuario en el localstorage.
  updateUser() {
    const userId = this.authService.getDecodedToken().nameid;

    this.userService.updateUser(userId, this.user).subscribe(() => {
      this.alertify.success('Perfil actualizado con éxito');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }

  updateFoto(fotoUrl) {
    this.user.fotoUrl = fotoUrl;
  }

  getFotoUrl() {
    const { fotoUrl } = this.authService.getCurrentUser();
    const defaultFotoUrl = '../../../assets/user.png';
    return fotoUrl || defaultFotoUrl;
  }
}
