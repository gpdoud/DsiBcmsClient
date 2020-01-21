export class Role {
    code: string;
    name: string;
    isAdmin: boolean = false;
    isStaff: boolean = false;
    isInstructor: boolean = false;
    isStudent: boolean = false;
    active: boolean = true;
    created: string;
    updated: string;

    constructor() {}
}