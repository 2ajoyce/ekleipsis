import { Component, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  db: FirebaseObjectObservable<any[]>;
  items: FirebaseListObservable<any[]>;
  isAdding: boolean = false;
  addData: '';
  editData: '';
  editingKey: string = '';

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

  constructor(public af: AngularFireDatabase) {
    this.db = af.object('/');
    this.items = af.list('/items');
  }
}
