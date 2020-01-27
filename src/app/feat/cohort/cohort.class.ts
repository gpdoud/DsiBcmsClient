import { Enrollment } from '@feat/enrollment/enrollment.class';
import { User } from '@feat/user/user.class';

export class Cohort {
    id: number = 0;
    name: string;
    instructorId?: number;
    beginDate: string;
    endDate: string;
    capacity: number;
    active: boolean;
    created: string;
    updated: string;
    enrollments: Enrollment[];
    instructor: User;
    instructorName: string;

    constructor() {}
}