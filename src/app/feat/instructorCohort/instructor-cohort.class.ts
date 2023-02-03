import { Cohort } from "@feat/cohort/cohort.class";
import { User } from "@feat/user/user.class";

export class InstructorCohort {

    id: number = 0;
    instructorId: number = 0;
    instructor?: User;
    cohortId: number = 0;
    cohort?: Cohort;
    
}