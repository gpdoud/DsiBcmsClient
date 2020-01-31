import { User } from '@feat/user/user.class';
import { Cohort } from '@feat/cohort/cohort.class';

export class Enrollment {
    id: number = 0;
    userId: number = 0;
    cohortId: number = 0;
    user: User;
    cohort: Cohort;

    constructor() {}
}