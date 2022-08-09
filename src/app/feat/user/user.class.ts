import { Role } from "../role/role.class";
import { Commentary } from '@feat/commentary/commentary.class';

export class User {
    id: number = 0;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    cellPhone: string;
    workPhone: string;
    roleCode: string;
    securityKey: string;
    // deprecated as of v1.6
    pinCode: string = "0000";
    active: boolean = true;
    created: string;
    updated: string;
    role: Role;
    roleName: string;
    studentCommentaries: Commentary[] = [];

    constructor() {}
}