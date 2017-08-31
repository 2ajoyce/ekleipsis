import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../providers/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {logger} from "codelyzer/util/logger";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @Input() fbAuth: AngularFireAuth;
  authService: AuthService;

  constructor() {
    this.authService = new AuthService(this.fbAuth);
  }

  ngOnInit() {
  }

  onSubmit(loginForm: any) {
    this.authService.login(loginForm.email, loginForm.password);
  }

}
