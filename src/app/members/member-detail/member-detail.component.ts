import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery';
import * as moment from 'moment';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.route.queryParams.subscribe(params => {
      let selectedTab = params['tab']
      selectedTab = selectedTab > 0 ? selectedTab : 0;
      this.selectTab(selectedTab);
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (let i = 0; i < this.user.fotos.length; i++) {
      imageUrls.push({
        small: this.user.fotos[i].url,
        medium: this.user.fotos[i].url,
        big: this.user.fotos[i].url,
        description: this.user.fotos[i].descripcion
      });
    }
    return imageUrls;
  }

  getFotoUrl() {
    const { fotoUrl } = this.user;
    const defaultFotoUrl = '../../../assets/user.png';
    return fotoUrl || defaultFotoUrl;
  }
  // retorna la ultima conexion con el sgte. formato:
  // hace "x" [minutos, horas, dias]
  formatearUltimaConexion() {
    if (this.user.ultimaConexion) {
      moment.locale('es-Es');
      return moment(this.user.ultimaConexion).fromNow();
    }

    return 'Sin datos';
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  //  loadUser() {
  //    const id = +this.route.snapshot.params['id'];
  //    this.userService.getUser(id).subscribe((user: User) => {
  //      this.user = user;
  //    }, error => {
  //      this.alertify.error(error);
  //    });
  //  }

}
