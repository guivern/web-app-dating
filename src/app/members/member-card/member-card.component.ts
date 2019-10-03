import { User } from './../../_models/User';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(private auth: AuthService, private userService: UserService,
    private alertify: AlertifyService) { }

  ngOnInit() {
  }

  getFotoUrl() {
    const defaultFotoUrl = '../../../assets/user.png';
    const { fotoUrl } = this.user;
    return fotoUrl || defaultFotoUrl;
  }

  sendLike() {
    const { id: likerId } = this.auth.getCurrentUser();
    const { id: likedId } = this.user;

    this.userService.sendLike(likerId, likedId).subscribe(resp => {
      this.alertify.success(`Te gusta ${this.user.nombre}`);
    }, error => {
      this.alertify.error(error);
    });
  }

}
