import { Attendance } from './attendance.class';
import { User } from '@feat/user/user.class';

export class AttendanceReport {
    attendances: Attendance[];
    student: User;
}