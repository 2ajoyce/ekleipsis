import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {TeamFeedbackNote} from '../models/TeamFeedbackNoteModel';
import {User} from '../models/user';
import {OneOnOneNote} from '../models/OneOnOneNoteModel';

@Injectable()
export class DataRepoService {
  user:Observable<firebase.User>;
  db:FirebaseObjectObservable<any[]>;
  users:FirebaseListObservable<any[]>;
  teamMembersFromFB:FirebaseListObservable<any[]>;
  teamFeedback:boolean = true;
  teamFeedbackNotesFromFB:FirebaseListObservable<any[]>;


  constructor(afAuth:AngularFireAuth, public af:AngularFireDatabase) {
    this.user = afAuth.authState;
    this.db = af.object('/');
    this.users = af.list('/users');
    this.teamMembersFromFB = af.list('/teams/ekleipsis/members');
    this.teamFeedbackNotesFromFB = af.list('/teamFeedbackNotes/0');
  }

  public async getUsers():Promise<User[]> {
    let result = new Array<User>();
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
    return await result;
  }

  public async getUser(dataRepo:DataRepoService, email:string):Promise<User> {
    let result:User = null;
    let users = await dataRepo.getUsers();
    // console.log('Users', users, users.length);
    users.forEach((user:User) => {
      console.log(user.email, email, user.email === email);
      if (user.email === email) {
        result = user;
      }
      return result != null;
    });
    return result;
  }

  public async getFeedbackNotes(dataRepo:DataRepoService, withSenders:boolean) {
    let result = [];
    let finalResult:TeamFeedbackNote[] = new Array<TeamFeedbackNote>();
    this.af.list('/teamFeedbackNotes').$ref.once('value', function (snap) {
      snap.forEach(value => {
        let sender = value.child('sender').val();
        if (withSenders === false && value.child('isAnonymous').val() === true) {
          sender = null;
        }
        result.push([
          value.child('employee').val(),
          value.child('category').val(),
          value.child('message').val(),
          value.child('isAnonymous').val(),
          sender
        ]);
        return result.length === snap.numChildren();
      });
      result.forEach(async (item) => {
        finalResult.push(
          new TeamFeedbackNote(
            await dataRepo.getUser(dataRepo, item[0]),
            item[1],
            item[2],
            item[3],
            await dataRepo.getUser(dataRepo, item[4])
          ));
      });
    });
    return await result;
  }

  public async getOneOnOneNotes(dataRepo: DataRepoService, withSenders:boolean) {
    let result = [];
    let finalResult: OneOnOneNote[] = new Array<OneOnOneNote>();
    this.af.list('/teamFeedbackNotes').$ref.once('value', function (snap) {
      snap.forEach(value => {
        result.push([
          value.child('employee').val(),
          value.child('category').val(),
          value.child('message').val(),
          value.child('sender').val()
        ]);
        return result.length === snap.numChildren();
      });
      result.forEach(async (item) => {
        finalResult.push(
          new OneOnOneNote(
            await dataRepo.getUser(dataRepo, item[0]),
            item[1],
            item[2],
            await dataRepo.getUser(dataRepo, item[3])
          ));
      });
    });
    return await result;
  }

  public getTeamMembers():FirebaseListObservable<any[]> {
    return null;
  }

  public getSubordinates():FirebaseListObservable<any[]> {
    return null;
  }

  public async setTeamFeedbackNotes(tfn: TeamFeedbackNote) {
    await this.af.list('/teamFeedbackNotes').push({
      'category': tfn.category,
      'employee': tfn.employee.email,
      'isAnonymous': tfn.isAnonymous,
      'message': tfn.message,
      'sender': tfn.sender.email
    });
  }

  public setOneOnOneNotes():FirebaseListObservable<any[]> {
    return null;
  }

  public setSubordinates():FirebaseListObservable<any[]> {
    return null;
  }


}
