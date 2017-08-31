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
  @Input() color: string = '';
  @Input() column: number = 0;

  constructor() { }

  ngOnInit() {
  }
}
