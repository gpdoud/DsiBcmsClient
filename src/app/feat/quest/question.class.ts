import { Evaluation } from '@feat/eval/evaluation.class';

export class Question {
    id: number = 0;
    category: string = '';
    questionText: string = '';
    answerTextA: string = '';
    answerTextB: string = '';
    answerTextC: string = '';
    answerTextD: string = '';
    answerTextE: string = '';
    correctAnswerNbr: number = -1;
    userAnswerNbr: number = -1;
    pointValue: number = 10;
    isBonus: boolean = false;
    evaluationId: number = 0;
    evaluation: Evaluation = null;

    constructor() {}
}