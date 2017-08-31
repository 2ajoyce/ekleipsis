import {FeedbackCategory} from './feedback-category.enum';
import {User} from './user';

export class OneOnOneNote {
  public noteId:number;
  public employee:User;
  public category:FeedbackCategory;
  public message:string;
  public sender?:User;

  constructor(noteId:number,
              employee:User,
              category:FeedbackCategory,
              message:string,
              sender?:User) {
    this.noteId = noteId;
    this.employee = employee;
    this.category = category;
    this.message = message;
    this.sender = sender;
  }
}
