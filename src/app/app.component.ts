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
  user: Observable<firebase.User>;
  db: FirebaseObjectObservable<any[]>;
  teamMembersFromFB: FirebaseListObservable<any[]>;
  users: User[];
  teamFeedback: boolean = true;
  teamFeedbackNotesFromFB: FirebaseListObservable<any[]>;
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
  }

  // Runs on init of the page
  async ngOnInit() {
    this.users = await this.repoService.getUsers();
    // let temp = await this.repoService.getOneOnOneNotes(this.repoService, true);
    // this.repoService.setTeamFeedbackNotes(
    //   new TeamFeedbackNote(
    //       new User('ajoyce@gmail.com', 'Aaron', 'Joyce'),
    //       'Notes',
    //       'Was staying up all night for the hackathon really a good idea?',
    //       false,
    //       new User('brandon.rachelski@gmail.com', 'Brandon', 'Rachelski')
    //   )
    // );
  }
}
