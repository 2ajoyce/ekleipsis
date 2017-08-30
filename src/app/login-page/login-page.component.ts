import {Component, OnInit} from '@angular/core';
import {AuthService} from '../providers/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  authService: AuthService;
  private _afAuth: AngularFireAuth;

  constructor(afAuth: AngularFireAuth) {
    this._afAuth = afAuth;
    this.authService = new AuthService(this._afAuth);
  }

  ngOnInit() {
  }

  onSubmit(loginForm: any) {
    this.authService.login(loginForm.email, loginForm.password);
  }

}
