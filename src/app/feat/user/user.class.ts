import { Role } from "../role/role.class";

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
    pinCode: string;
    active: boolean = true;
    created: string;
    updated: string;
    role: Role;
    roleName: string;

    constructor() {}
}