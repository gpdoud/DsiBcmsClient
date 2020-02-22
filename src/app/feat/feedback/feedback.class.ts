import { User } from '@feat/user/user.class';

export class Feedback {

    id: number;
    category: string;
    title: string;
    text: string;
    locked: boolean;
    active: boolean;
    created: string;
    updated: string;
    
    userId: number;
    user: User;
    nextId: number;
    nextFeedback: Feedback;
    userName: string;

    constructor() {}
}
