import { Calendar } from '@feat/calendar/calendar.class';
import { Enrollment } from '@feat/enrollment/enrollment.class';
import { InstructorCohort } from '@feat/instructorCohort/instructor-cohort.class';

export class Cohort {
    id: number = 0;
    name: string;
    beginDate: string;
    endDate: string;
    demoDay: string;
    calendarId: number = 0;
    calendar: Calendar;
    capacity: number = 12;
    active: boolean = true;
    created: string;
    updated: string;
    enrollments: Enrollment[];
    instructorCohorts: InstructorCohort[];

    constructor() {}
}