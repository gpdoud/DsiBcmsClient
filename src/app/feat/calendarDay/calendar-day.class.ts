import { Calendar } from "@feat/calendar/calendar.class";

export class CalendarDay {
    
    id: number = 0;
    date: string = '';
    notes: string = '';
    topic: string = '';
    subtopic: string = '';
    weekNbr: number = 0;
    dayNbr: number = 0;
    assessmentToday: string = null;
    graduationToday: boolean = false;
    noClassToday: boolean = false;
    calendarId: number = 0;
    active: boolean = true;
    created: string = null;
    updated: string = null;
    calendar: Calendar;
}