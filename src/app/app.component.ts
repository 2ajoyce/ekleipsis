import {Component} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {User} from './models/user';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {DataRepoService} from './providers/data-repo.service';
import { OneOnOneNote } from './models/OneOnOneNoteModel';
import { TeamFeedbackNote } from './models/TeamFeedbackNoteModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Observable<firebase.User>;
  db: FirebaseObjectObservable<any[]>;
  teamMembersFromFB: FirebaseListObservable<any[]>;
  users: User[];
  teamFeedback: Array<TeamFeedbackNote>;
  oneOnOneFeedback: Array<OneOnOneNote>;
  teamFeedbackNotesFromFB: FirebaseListObservable<any[]>;
  activePosition: string = '';
  activeTab: string = 'teamFeedback';
  repoService: DataRepoService;
  columnsData: any[];
  addTeamFeedbackBuffer: TeamFeedbackNote;
  oneOnOneBuffer: OneOnOneNote;

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
  }

  setColumnData() {
    if (this.activeTab === 'teamFeedback') {
      this.columnsData = this.teamFeedback;
    } else if (this.activeTab === '1on1') {
      this.columnsData = this.oneOnOneFeedback;
    }
  }

  // Runs on init of the page
  async ngOnInit() {
    this.users = await this.repoService.getUsers();
    // let kyle = await this.repoService.getUser(this.repoService, 'kshaffer@gmail.com');
    // console.log('Kyle', kyle);
    // let temp = await this.repoService.getTeamMembers(this.repoService, 'ajoyce@gmail.com');
    // console.log(temp);
  }
}
