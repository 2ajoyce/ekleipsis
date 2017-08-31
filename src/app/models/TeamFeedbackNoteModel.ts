import {FeedbackCategory} from './feedback-category.enum';
import {User} from './user';

export class TeamFeedbackNote {
    public noteId: number;
    public employee: User;
    public category: FeedbackCategory;
    public message: string;
    public isAnonymous: boolean;
    public sender?: User;

  constructor(
      noteId: number,
      employee: User,
      category: FeedbackCategory,
      message: string,
      isAnonymous: boolean,
      sender?: User
  ){
      this.noteId = noteId;
      this.employee = employee;
      this.category = category;
      this.message = message;
      this.isAnonymous = isAnonymous;
      this.sender = sender;
  }
}
