import {Component} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {TeamMember} from './models/TeamMember';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Observable<firebase.User>;
  db: FirebaseObjectObservable<any[]>;
  items: FirebaseListObservable<any[]>;
  teamMembersFromFB: FirebaseListObservable<any[]>;
  isAdding: boolean = false;
  addData: '';
  editData: '';
  editingKey: string = '';
  teamMembers: Array<TeamMember> = [];
  teamFeedback: boolean = true;
  teamFeedbackNotesFromFB: FirebaseListObservable<any[]>;


  constructor(afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.db = af.object('/');
    this.items = af.list('/items');
    this.teamMembersFromFB = af.list('/teams/ekleipsis/members');
    this.teamFeedbackNotesFromFB = af.list('/teamFeedbackNotes/0');
  }

  // Runs on init of the page
  ngOnInit() {
  }
}
