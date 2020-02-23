import { User } from '@feat/user/user.class';

export class Feedback {

    id: number;
    category: string;
    title: string;
    text: string;
    response: string;
    locked: boolean = false;
    active: boolean = true;
    created: string;
    updated: string;
    
    userId: number = 0;
    user: User;
    nextId: number;
    nextFeedback: Feedback;
    userName: string;
    isOwner: boolean;

    constructor() {}
}
