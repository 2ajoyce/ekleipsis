import {FeedbackCategory} from './feedback-category.enum';
import {User} from './user';

export class TeamFeedbackNote {
    public TeamFeedbackNoteId: number;
    public Employee: User;
    public Category: FeedbackCategory;
    public Text: string;
    public Sender?: User;
    public IsAnonymous: boolean;
}
