import { Enrollment } from '@feat/enrollment/enrollment.class';

export class Assessment {
    id: number;
    date: string;
    subject: string;
    description: string;
    pointsScore: number;
    pointsMax: number;
    enrollmentId: number;
    active: boolean;
    created: string;
    updated: string;
    
    enrollment: Enrollment;
    grade: number; // virtual
    userName: string; // virtual

    constructor() {}
}
