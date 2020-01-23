export class Role {
    code: string;
    name: string;
    isRoot: boolean = false;
    isAdmin: boolean = false;
    isStaff: boolean = false;
    isInstructor: boolean = false;
    isStudent: boolean = false;
    active: boolean = true;
    created: string;
    updated: string;

    constructor() {}
}