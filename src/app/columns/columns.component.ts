import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent implements OnInit {
  @Input() columnsData: any[];
  @Input() mode: string = 'teamFeedback';
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

  ngOnChanges() {
    if (this.mode === 'teamFeedback') {
      this.column1Title = 'Positives';
      this.column3Title = 'Improvements';
    } else if (this.mode === '1on1') {
      this.column1Title = 'Goals';
      this.column3Title = 'Takeaways';
    }
  }

  // Filters the teamFeedbackNotes into the three columns
  getColumnData(data: any[]) {
    console.log(data);
    data.forEach(note => {
      if (note.category === 'positives' || note.category === 'goals') {
        this.column1Data.push(note);
      } else if (note.category === 'notes') {
        this.column2Data.push(note);
      } else if (note.category === 'improvements' || note.category === 'takeaways') {
        this.column3Data.push(note);
      }
    });
  }
}
