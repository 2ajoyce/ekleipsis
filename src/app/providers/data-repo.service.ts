import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {TeamMember} from '../models/TeamMember';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {TeamFeedbackNote} from '../models/TeamFeedbackNoteModel';
import {User} from '../models/user';

@Injectable()
export class DataRepoService {
  user:Observable<firebase.User>;
  db:FirebaseObjectObservable<any[]>;
  users:FirebaseListObservable<any[]>;
  teamMembersFromFB:FirebaseListObservable<any[]>;
  isAdding:boolean = false;
  addData:'';
  editData:'';
  editingKey:string = '';
  teamMembers:Array<TeamMember> = [];
  teamFeedback:boolean = true;
  teamFeedbackNotesFromFB:FirebaseListObservable<any[]>;


  constructor(afAuth:AngularFireAuth, public af:AngularFireDatabase) {
    this.user = afAuth.authState;
    this.db = af.object('/');
    this.users = af.list('/users');
    this.teamMembersFromFB = af.list('/teams/ekleipsis/members');
    this.teamFeedbackNotesFromFB = af.list('/teamFeedbackNotes/0');
  }

  public getUsers():Array<User> {
    let result: User[] = new Array<User>();
    this.af.list('/users').$ref.once('value', function (snap) {
      snap.forEach(function (value) {
        result.push(new User(
          value.child('email').val(),
          value.child('firstName').val(),
          value.child('lastName').val()
        ));
        return true;
      });
    });
    return result;
  }

  public getUser(email: string): User {
    let result: User = null;
    this.af.list('/users').$ref.once('value', function (snap) {
      snap.forEach(function (value) {
        if (value.child('email').val() === email) {
          result = new User(
            value.child('email').val(),
            value.child('firstName').val(),
            value.child('lastName').val()
          );
        };
        return true;
      });
    });
    return result;
  }

  public getFeedbackNotes(withSenders: boolean): Array<TeamFeedbackNote> {
    let result: Array<TeamFeedbackNote> = null;
    this.af.list('/teamFeedbackNotes').$ref.once('value', function (snap) {
      snap.forEach(function (value) {
        let sender = this.getUser(value.child('sender').val());
        if (withSenders === false && value.child('isAnonymous').val() === true) {
          sender = null;
        }
        result.push(new TeamFeedbackNote(
          value.child('noteId').val(),
          this.getUser(value.child('employee').val()),
          value.child('category').val(),
          value.child('message').val(),
          value.child('isAnonymous').val(),
          sender
        ));
        return true;
      });
    });
    return result;
  }

  public getOneOnOneNotes():FirebaseListObservable<any[]> {
    return null;
  }

  public getTeamMembers():FirebaseListObservable<any[]> {
    return null;
  }

  public getSubordinates():FirebaseListObservable<any[]> {
    return null;
  }

  public setFeedbackNotes():FirebaseListObservable<any[]> {
    return null;
  }

  public setOneOnOneNotes():FirebaseListObservable<any[]> {
    return null;
  }

  public setSubordinates():FirebaseListObservable<any[]> {
    return null;
  }


}
