import {Component, Input, OnInit} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "../models/user";
import {AuthService} from "../providers/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() fbAuth: AngularFireAuth;
  @Input() user: User;
  @Input() authService: AuthService;

  constructor() {}

  ngOnInit() {
  }

}
