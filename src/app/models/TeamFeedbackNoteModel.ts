import {FeedbackCategory} from './feedback-category.enum';
import {User} from './user';

export class TeamFeedbackNote {
    public employee: User;
    public category: string;
    public message: string;
    public isAnonymous: boolean;
    public sender?: User;

  constructor(
      employee: User,
      category: string,
      message: string,
      isAnonymous: boolean,
      sender?: User
  ){
      this.employee = employee;
      this.category = category;
      this.message = message;
      this.isAnonymous = isAnonymous;
      this.sender = sender;
  }
}
