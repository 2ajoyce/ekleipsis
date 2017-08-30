import {Component, OnInit} from '@angular/core';
import {AuthService} from '../providers/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  authService: AuthService;
  private _afAuth: AngularFireAuth;

  constructor(afAuth: AngularFireAuth) {
    this._afAuth = afAuth;
    this.authService = new AuthService(this._afAuth);
  }

  ngOnInit() {
  }

  onSubmit(registrationForm: any) {
    this.authService.register(registrationForm.email, registrationForm.password);
  }
}
