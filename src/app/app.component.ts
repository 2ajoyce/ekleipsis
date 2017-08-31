import {Component} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {TeamMember} from './models/TeamMember';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {DataRepoService} from './providers/data-repo.service';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  promise:any;
  user: Observable<firebase.User>;
  db: FirebaseObjectObservable<any[]>;
  users: User[];
  teamMembersFromFB: FirebaseListObservable<any[]>;
  isAdding: boolean = false;
  addData: '';
  editData: '';
  editingKey: string = '';
  teamFeedback: boolean = true;
  teamFeedbackNotesFromFB: FirebaseListObservable<any[]>;
  teamMembers: string[] = [];
  activePosition: string = '';
  activeTab: string = 'teamFeedback';
  // repoService: DataRepoService;

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.db = af.object('/');
    // this.promise = af.list('/users').$ref.once('value', function (snap) {
    //   snap.forEach(function (value) {
    //     console.log('user', value.val());
    //     return true;
    //   });
    // });

    this.teamMembersFromFB = af.list('/teams/ekleipsis/members');
    this.teamFeedbackNotesFromFB = af.list('/teamFeedbackNotes/0');
    // this.teamMembers.push('Joseph Bartley');
    // this.teamMembers.push('Aaron Joyce');
    // this.teamMembers.push('Brandon Rachelski');
    // this.teamMembers.push('Brian Giunta');
    // this.teamMembers.push('Kyle Shaffar');
    this.activePosition = 'Associate Software Engineer, AD';
    // this.repoService = new DataRepoService(afAuth, af);
    // this.users = this.repoService.getUsers();
  }

  // Runs on init of the page
  ngOnInit() {
  }
}
