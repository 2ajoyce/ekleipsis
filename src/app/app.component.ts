import {Component} from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {DataRepoService} from './providers/data-repo.service';
import {OneOnOneNote} from './models/OneOnOneNoteModel';
import {TeamFeedbackNote} from './models/TeamFeedbackNoteModel';
import {User as fbUser} from 'firebase/app';
import {User} from './models/user';
import {AuthService} from './providers/auth.service';
import {TeamMember} from './models/TeamMember';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  afUser: Observable<fbUser>;
  user: User;
  db: FirebaseObjectObservable<any[]>;
  // teamMembersFromFB: FirebaseListObservable<any[]>;
  users: User[];
  teamFeedback: Array<TeamFeedbackNote>;
  oneOnOneNotes: Array<OneOnOneNote>;
  // teamFeedbackNotesFromFB: FirebaseListObservable<any[]>;
  activeTab: string = 'teamFeedback';
  repoService: DataRepoService;
  teamMembers: Array<User>;
  columnsData: any[];
  columnsTFData: Array<TeamFeedbackNote> = [];
  columnsOOOData: Array<OneOnOneNote> = [];
  addTeamFeedbackBuffer: TeamFeedbackNote;
  oneOnOneBuffer: OneOnOneNote;
  afAuth: AngularFireAuth;
  teamMembersStuff: Array<TeamMember>;
  oneOnOneFeedback: Array<OneOnOneNote>;
  teamFeedbackBuffer: TeamFeedbackNote;
  authService: AuthService;
  dataRepo: DataRepoService;

  switchTab(tab: string) {
    this.activeTab = tab;
    this.setColumnData();
  }

  constructor(afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.afAuth = afAuth;
    this.db = af.object('/');
    this.repoService = new DataRepoService(afAuth, af);
    }

  setColumnData() {
    if (this.activeTab === 'teamFeedback') {
      this.columnsTFData = this.teamFeedback;
    } else if (this.activeTab === '1on1') {
      this.columnsOOOData = this.oneOnOneFeedback;
    }
  }

  toggleOneOnOneBufferCategory(data: string) {
    this.oneOnOneBuffer.category = data;
  }

  ngOnChanges() {
  }

  onModelChange() {
    console.log(this.oneOnOneBuffer.category);
    console.log(this.oneOnOneBuffer.message);
    console.log(this.oneOnOneBuffer.employee);
  }

  cancel() {
    this.oneOnOneBuffer = new OneOnOneNote(
      new User('select', 'select', 'select', 'select'),
      'notes',
      '',
      new User('select', 'select', 'select', 'select'));
    this.teamFeedbackBuffer = new TeamFeedbackNote(
      new User('select', 'select', 'select', 'select'),
      'notes',
      '',
      false,
      new User('sender', 'sender', 'sender', 'sender'));
  }

  setTeamFeedback() {
    this.teamFeedback = Array<TeamFeedbackNote>();
    var note = new TeamFeedbackNote(new User('brandon.rachelski@gmail.com', 'Brandon', 'Rachelski', 'Associate Software Engineer, AD'), 'notes', 'Firebase is a mess', true, new User('anonymous', 'anonymous', 'anonymous', 'anonymous'));
    var note1 = new TeamFeedbackNote(new User('brandon.rachelski@gmail.com', 'Brandon', 'Rachelski', 'Associate Software Engineer, AD'), 'positives', 'Great job staying up all night to get this somewhat finished!', false, new User('aaron.joyce@vizientinc.com', 'anonymous', 'anonymous', 'anonymous'));
    var note2 = new TeamFeedbackNote(new User('brandon.rachelski@gmail.com', 'Brandon', 'Rachelski', 'Associate Software Engineer, AD'), 'improvements', 'Better communication', true, new User('anonymous', 'anonymous', 'anonymous', 'anonymous'));
    this.teamFeedback.push(note);
    this.teamFeedback.push(note1);
    this.teamFeedback.push(note2);
  }

  setOneOnOne() {
    this.oneOnOneFeedback = Array<OneOnOneNote>();
    var note = new OneOnOneNote(new User('brandon.rachelski@gmail.com', 'Brandon', 'Rachelski', 'Associate Software Engineer, AD'), 'goals', 'Get better at stuff', new User('joseph.bartley@vizientinc.com', 'Joseph', 'Bartley', 'Associate Software Engineer, AD'));
    var note1 = new OneOnOneNote(new User('brandon.rachelski@gmail.com', 'Brandon', 'Rachelski', 'Associate Software Engineer, AD'), 'notes', 'Firebase is literally the worst thing ever', new User('joseph.bartley@vizientinc.com', 'Joseph', 'Bartley', 'Associate Software Engineer, AD'));
    var note2 = new OneOnOneNote(new User('brandon.rachelski@gmail.com', 'Brandon', 'Rachelski', 'Associate Software Engineer, AD'), 'improvements', 'Hackathons are stressful but fun', new User('joseph.bartley@vizientinc.com', 'Joseph', 'Bartley', 'Associate Software Engineer, AD'));
    this.oneOnOneFeedback.push(note);
    this.oneOnOneFeedback.push(note1);
    this.oneOnOneFeedback.push(note2);
  }

  // Runs on init of the page
  async ngOnInit() {
    this.authService = new AuthService(this.afAuth);
    this.afUser = this.authService.getUser();
    this.afUser.subscribe(async user => {
      if (user) {
        // user logged in
        this.user = await this.repoService.getUser(this.repoService, user.email);
        // this.teamMembers = await this.repoService.getTeamMembers(this.repoService, user.email);
        this.oneOnOneNotes = await this.repoService.getOneOnOneNotes(this.repoService, user.email, false);
      } else {
        // user not logged in
        this.user = null;
      }
    });
    this.teamMembers = [
      new User("joseph.bartley@vizientinc.com", 'Joseph', 'Bartley', "Associate Software Engineer"),
      new User("brandon.rachelski@gmail.com", 'Brandon', 'Rachelski', "Associate Software Developer"),
      new User("brian.giunta@vizientinc.com", 'Brian', 'Giunta', "Associate Software Developer"),
    ];
    this.oneOnOneBuffer = new OneOnOneNote(
      new User('select', 'select', 'select', 'select'),
      'notes',
      '',
      new User('select', 'select', 'select', 'select'));
      this.addTeamFeedbackBuffer = new TeamFeedbackNote(
        new User('select', 'select', 'select', 'select'),
        'notes',
        '',
        false,
        new User('sender', 'sender', 'sender', 'sender'));
      this.setTeamFeedback();
      this.setOneOnOne();
      this.setColumnData();
      this.users = await this.repoService.getUsers();
  }
}
