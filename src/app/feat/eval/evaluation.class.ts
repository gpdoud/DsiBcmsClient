import { Question } from '@feat/quest/question.class';
import { Enrollment } from '@feat/enrollment/enrollment.class';

export class Evaluation {
    id: number = 0;
    description: string = '';
    isTemplate: boolean = false;
    enrollmentId?: number = null;
    questions: Question[] = [];
    isDone: boolean = false;
    pointsAvailable: number = 0;
    pointsScored: number = 0;
    active: boolean = true;
    created: string;
    updated: string;

    enrollment?: Enrollment;
    studentName: string;

    constructor() {
        
    }
}