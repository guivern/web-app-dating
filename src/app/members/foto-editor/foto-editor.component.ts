import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Foto } from 'src/app/_models/Foto';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-foto-editor',
  templateUrl: './foto-editor.component.html',
  styleUrls: ['./foto-editor.component.css']
})
export class FotoEditorComponent implements OnInit {
  @Input() fotos: Foto[];
  @Output() fotoPerfilActualizada = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver: false;
  baseUrl = environment.apiBaseUrl;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    const { nameid: userId } = this.authService.getDecodedToken();
    const fotosEndpoint = `${this.baseUrl}/users/${userId}/fotos`;
    const token = this.authService.getToken();

    this.uploader = new FileUploader({
      url: fotosEndpoint,
      authToken: `Bearer ${token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // luego de cargar la imagen la obtenemos para mostrar en pantalla
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        // response es un string, debemos convertir a object
        const res: Foto = JSON.parse(response);
        this.fotos.push(res);
      }
    };
  }

  setFotoPrincipal(foto: Foto) {
    const { id: idFoto } = foto;
    const { nameid: userId } = this.authService.getDecodedToken();

    this.userService.setFotoPrincipal(userId, idFoto).subscribe(() => {
      const [fotoActual] = this.fotos.filter(f => f.esPrincipal);
      fotoActual.esPrincipal = false;
      foto.esPrincipal = true;
      this.fotoPerfilActualizada.emit(foto.url);
      this.authService.updateFotoUrl(foto.url);
      this.alertify.success('Foto de perfil actualizada');
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteFoto(id: number) {
    const { id: userId } = this.authService.getCurrentUser();
    
    this.alertify.confirm('Esta seguro que desea eliminar esta foto?', () => {
      this.userService.deleteFoto(userId, id).subscribe(() => {
        this.fotos = this.fotos.filter(f => f.id != id);
        this.alertify.success('La foto ha sido eliminada');
      }, error => {
        this.alertify.error(error);
      });
    });
  }
}
