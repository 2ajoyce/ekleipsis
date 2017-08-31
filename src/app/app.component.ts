import {Component} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { User } from './models/user';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {DataRepoService} from './providers/data-repo.service';
import {TeamFeedbackNote} from './models/TeamFeedbackNoteModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  promise: any;
  user: Observable<firebase.User>;
  db: FirebaseObjectObservable<any[]>;
  teamMembersFromFB: FirebaseListObservable<any[]>;
  isAdding: boolean = false;
  addData: '';
  editData: '';
  users: User[];
  editingKey: string = '';
  teamFeedback: boolean = true;
  teamFeedbackNotesFromFB: FirebaseListObservable<any[]>;
  teamMembers: string[] = [];
  activePosition: string = '';
  activeTab: string = 'teamFeedback';
  repoService: DataRepoService;

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.db = af.object('/');

    this.teamMembersFromFB = af.list('/teams/ekleipsis/members');
    this.teamFeedbackNotesFromFB = af.list('/teamFeedbackNotes/0');
    this.activePosition = 'Associate Software Engineer, AD';
    this.repoService = new DataRepoService(afAuth, af);
    this.users = this.repoService.getUsers();
    // console.log(this.repoService.getFeedbackNotes(this.repoService, true));
  }

  // Runs on init of the page
  ngOnInit() {
  }
}
