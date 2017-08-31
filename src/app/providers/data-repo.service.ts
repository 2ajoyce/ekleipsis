import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {TeamMember} from '../models/TeamMember';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {TeamFeedbackNote} from '../models/TeamFeedbackNoteModel';
import {User} from '../models/user';
import {OneOnOneNote} from '../models/one-on-one-note';

@Injectable()
export class DataRepoService {
  user: Observable<firebase.User>;
  db: FirebaseObjectObservable<any[]>;
  users: FirebaseListObservable<any[]>;
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
    this.users = af.list('/users');
    this.teamMembersFromFB = af.list('/teams/ekleipsis/members');
    this.teamFeedbackNotesFromFB = af.list('/teamFeedbackNotes/0');
  }

  public getUsers(): Array<User> {
    let result: User[] = new Array<User>();
    this.af.list('/users').$ref.once('value', function (snap) {
      snap.forEach(value => {
        result.push(new User(
          value.child('email').val(),
          value.child('firstName').val(),
          value.child('lastName').val()
        ));
        return result.length === snap.numChildren();
      });
    });
    return result;
  }

  public getUser(email: string): firebase.Promise<any> {
    let result: User = null;
    let promise = this.af.list('/users').$ref.once('value', function (snap) {
      snap.forEach(value => {
        console.log(value.child('email').val(), email, value.child('email').val() === email)
        if (value.child('email').val() === email) {
          result = new User(
            value.child('email').val(),
            value.child('firstName').val(),
            value.child('lastName').val()
          );
        }
        return result != null;
      });
    });
    return promise;
  }

  public getFeedbackNotes(dataRepo: DataRepoService, withSenders: boolean): Array<TeamFeedbackNote> {
    let result: TeamFeedbackNote[] = new Array<TeamFeedbackNote>();
    this.af.list('/teamFeedbackNotes').$ref.once('value', function (snap) {
      snap.forEach(value => {
        let employee = dataRepo.getUser(value.child('employee').val());
        let sender = dataRepo.getUser(value.child('sender').val());
        if (withSenders === false && value.child('isAnonymous').val() === true) {
          sender = null;
        }
        employee.then((a) => {
          sender.then((b) => {
            result.push(new TeamFeedbackNote(
              a,
              value.child('category').val(),
              value.child('message').val(),
              value.child('isAnonymous').val(),
              b
            ));
          });
        });
        return result.length === snap.numChildren();
      });
    });
    return result;
  }

  public getOneOnOneNotes(dataRepo: DataRepoService): Array<OneOnOneNote> {
    let result: OneOnOneNote[] = new Array<OneOnOneNote>();
    this.af.list('/oneOnOneNotes').$ref.once('value', function (snap) {
      snap.forEach(value => {
        let employee = dataRepo.getUser(value.child('employee').val());
        let sender = dataRepo.getUser(value.child('sender').val());
        employee.then((a) => {
          sender.then((b) => {
            result.push(new TeamFeedbackNote(
              a,
              value.child('category').val(),
              value.child('message').val(),
              b
            ));
          });
        });
        return result.length === snap.numChildren();
      });
    });
    return result;
  }

  public getTeamMembers(): FirebaseListObservable<any[]> {
    return null;
  }

  public getSubordinates(): FirebaseListObservable<any[]> {
    return null;
  }

  public setFeedbackNotes(): FirebaseListObservable<any[]> {
    return null;
  }

  public setOneOnOneNotes(): FirebaseListObservable<any[]> {
    return null;
  }

  public setSubordinates(): FirebaseListObservable<any[]> {
    return null;
  }


}
