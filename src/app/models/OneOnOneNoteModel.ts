import {User} from './user';

export class OneOnOneNote {
  public employee: User;
  public category: string;
  public message: string;
  public sender?: User;

  constructor(
    employee: User,
    category: string,
    message: string,
    sender?: User
  ) {
    this.employee = employee;
    this.category = category;
    this.message = message;
    this.sender = sender;
  }
}
