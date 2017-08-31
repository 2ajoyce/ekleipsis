import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {TeamMember} from '../models/TeamMember';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class DataRepoService {
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

 public getFeedbackNotes(): FirebaseListObservable<any[]> {
   return null;
 }

 public getOneOnOneNotes(): FirebaseListObservable<any[]> {
   return null;
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
