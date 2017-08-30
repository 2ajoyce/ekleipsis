import { Component, OnChanges, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { TeamMember } from './models/TeamMember';
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
  isAdding: boolean = false;
  addData: '';
  editData: '';
  editingKey: string = '';
  teamMembers: Array<TeamMember> = [] ;

  ngOnInit() {
    var testMember = new TeamMember();
    testMember.Id = '0';
    testMember.Name = 'Bob Ross';
    this.teamMembers.push(testMember);
  }

  deleteItem(key: string) {
    this.items.remove(key).then(_ => console.log('item deleted!'));
  }

  addItem() {
    if (this.isAdding) {
      this.items.push(this.addData);
    }
    this.isAdding = !this.isAdding;
  }

  editItem(data: any) {
    if (this.editingKey === data.$key) {
      this.items.remove(data.$key);
      this.items.push(data.$value);
    } else {
      this.editingKey = data.$key;
    }
    console.log(data);
  }

  constructor(afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.db = af.object('/');
    this.items = af.list('/items');
  }
}
