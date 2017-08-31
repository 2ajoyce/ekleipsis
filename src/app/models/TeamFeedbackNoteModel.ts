import {FeedbackCategory} from './feedback-category.enum';
import {User} from './user';

export class TeamFeedbackNote {
    public noteId: number;
    public employee: User;
    public category: FeedbackCategory;
    public message: string;
    public sender?: User;
    public isAnonymous: boolean;
}
