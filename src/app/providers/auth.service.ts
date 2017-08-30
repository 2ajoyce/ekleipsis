import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';
import {CanActivate} from '@angular/router';

@Injectable()
export class AuthService {
  private _afAuth: AngularFireAuth;
  constructor(afAuth: AngularFireAuth) {
    this._afAuth = afAuth;
  }

  login() {
    this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this._afAuth.auth.signOut();
  }
}
