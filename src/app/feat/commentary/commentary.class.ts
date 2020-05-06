import { User } from '@feat/user/user.class';

export class Commentary {
    id: number = 0;
    text: string = "Comment";
    sensitive: boolean = false;
    lastAccessUserId?: number;
    created: string;
    updated: string;
    studentId?: number;
    student: User;
    studentName: string;
    user: User;
    lastAccessUser: User;

    constructor () {}
}