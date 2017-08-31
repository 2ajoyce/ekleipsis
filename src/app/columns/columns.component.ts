import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent implements OnInit {
  @Input() columnsData: FirebaseListObservable<any[]>;
  column1Title: string = 'Positives';
  column1Data: any[] = [];
  column2Title: string = 'Notes';
  column2Data: any[] = [];
  column3Title: string = 'Improvements';
  column3Data: any[] = [];

  constructor() { }

  ngOnInit() {
    this.getColumnData(this.columnsData);
  }

  // Filters the teamFeedbackNotes into the three columns
  getColumnData(data: FirebaseListObservable<any[]>) {
    data.forEach(note => {
      if (note[0][0].$key === 'category') {
        if (note[0][0].$value === 'positive') {
          this.column1Data.push(note);
        } else if (note[0][0].$value === 'note') {
          this.column2Data.push(note);
        } else if (note[0][0].$value === 'improvement') {
          this.column3Data.push(note);
        }
      }
    });
  }
}
