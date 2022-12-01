import { Question } from '@feat/quest/question.class';
import { Enrollment } from '@feat/enrollment/enrollment.class';
import { User } from '@feat/user/user.class';

export class Evaluation {
    id: number = 0;
    description: string = '';
    isTemplate: boolean = true;
    enrollmentId?: number = null;
    questions: Question[] = [];
    isDone: boolean = false;
    pointsAvailable: number = 0;
    pointsScored: number = 0;
    timeLimitMinutes: number = 0;
    timeLimitSeconds: number = 0;
    userId: number = null;
    active: boolean = true;
    created: string;
    updated: string;

    enrollment?: Enrollment;
    user?: User;
    studentName: string;
    owner: string;
    canMaint: boolean = false;

    constructor() {
        
    }
}