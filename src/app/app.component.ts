import { Component, OnChanges, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { TeamMember } from './models/TeamMember';
import { TeamFeedbackNote } from './models/TeamFeedbackNoteModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  db: FirebaseObjectObservable<any[]>;
  items: FirebaseListObservable<any[]>;
  teamMembersFromFB: FirebaseListObservable<any[]>;
  isAdding: boolean = false;
  addData: '';
  editData: '';
  editingKey: string = '';
  teamMembers: Array<TeamMember> = [];

  constructor(public af: AngularFireDatabase) {
    this.db = af.object('/');
    this.items = af.list('/items');
    this.teamMembersFromFB = af.list('/teams/ekleipsis/members');
  }

  // Runs on init of the page
  ngOnInit() {
  }
}
