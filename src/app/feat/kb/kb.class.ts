import { User } from '@feat/user/user.class';
import { KbCategory } from './kb-category.class';

export class Kb {

    id: number = 0;
    title: string = '';
    text: string = '';
    response: string = '';
    sticky: boolean = false;
    locked: boolean = false;
    nextId: boolean = false;
    prevId: boolean = false;

    userId: number = 0;
    user: User = null;

    kbCategoryId?: number = null;
    kbCategory: KbCategory = null;

    active: boolean = true;

    username: string = '';

    constructor() {}
}
