import { User } from '@feat/user/user.class';
import { Cohort } from '@feat/cohort/cohort.class';

export class Enrollment {
    userId: number = 0;
    cohortId: number = 0;
    user: User;
    cohort: Cohort;

    constructor() {}
}