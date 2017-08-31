import { Component, OnInit, Input } from '@angular/core';
import { TeamFeedbackNote } from '../models/TeamFeedbackNoteModel';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {
  @Input() title: string = '';
  @Input() data: any[] = [];
  column: number = 0;

  constructor() { }

  ngOnInit() {
    if (this.data[0][0].$value === 'positive') {
      this.column = 1;
    } else if (this.data[0][0].$value === 'note') {
      this.column = 2;
    } else if (this.data[0][0].$value === 'improvement') {
      this.column = 3;
    }
    console.log(this.column);
  }
}
