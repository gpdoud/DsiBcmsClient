import { CalendarDay } from "@feat/calendarDay/calendar-day.class";

export class Calendar {
    id: number = 0;
    cohortName: string = '';
    description: string = '';
    startDate = '';
    endDate = '';
    graduationDate = '';
    type: string = "FT";
    template = false;
    active = true;
    created = null;
    updated = null;
    
    calendarDays: CalendarDay[];
}