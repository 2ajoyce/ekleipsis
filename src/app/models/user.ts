export class User {
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;

  constructor(email: string, firstName: string, lastName: string, jobTitle: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.jobTitle = jobTitle;
  }
}
