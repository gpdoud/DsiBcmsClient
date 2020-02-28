import { Enrollment } from '@feat/enrollment/enrollment.class';

export class Attendance {

    id: number = 0;
    in: string;
    out: string;
    excused?: boolean;
    absent?: boolean;
    note: string;
    secureNote: string;
    enrollmentId: number;
    enrollment: Enrollment;

    constructor() {}
}
