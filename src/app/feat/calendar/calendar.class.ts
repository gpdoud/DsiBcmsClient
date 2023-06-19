import { CalendarDay } from "@feat/calendarDay/calendar-day.class";

export class Calendar {
    id: number = 0;
    cohortName: string = '';
    description: string = '';
    startDate: '0001-01-01'
    endDate: '0001-01-01'
    graduationDate : '0001-01-01'
    template : false
    active : true
    created : string = ''
    updated : string = ''
    
    calendarDays: CalendarDay[];
}