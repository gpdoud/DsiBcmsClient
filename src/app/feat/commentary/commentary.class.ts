import { User } from '@feat/user/user.class';

export class Commentary {
    id: number = 0;
    text: string = "Comment"; //5000
    lastAccessUserId?: number;
    created: string;
    updated: string;
    userId: number = 0;
    user: User;

    constructor () {}
}