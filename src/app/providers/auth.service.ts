import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  private _afAuth: AngularFireAuth;
  constructor(afAuth: AngularFireAuth) {
    this._afAuth = afAuth;
  }

  register(email: string, password: string) {
    this._afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    this._afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    this._afAuth.auth.signOut();
  }
}
