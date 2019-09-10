import { User } from './../../_models/User';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  getFotoUrl() {
    const defaultFotoUrl = '../../../assets/user.png';
    const { fotoUrl } = this.user;
    return fotoUrl || defaultFotoUrl;
  }

}
