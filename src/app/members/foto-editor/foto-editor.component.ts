import { Component, OnInit, Input } from '@angular/core';
import { Foto } from 'src/app/_models/Foto';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-foto-editor',
  templateUrl: './foto-editor.component.html',
  styleUrls: ['./foto-editor.component.css']
})
export class FotoEditorComponent implements OnInit {
  @Input() fotos: Foto[];
  uploader: FileUploader;
  hasBaseDropZoneOver: false;
  baseUrl = environment.apiBaseUrl;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    const { nameid: userId } = this.authService.getDecodedToken();
    const fotosEndpoint = `${this.baseUrl}/users/${userId}/fotos`
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
    }
  }
}
