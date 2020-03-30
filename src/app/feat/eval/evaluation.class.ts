export class Evaluation {
    id: number = 0;
    description: string = '';
    isTemplate: boolean = false;
    enrollmentId?: number = null;
    active: boolean = true;
    created: string = Date();

    constructor() {
        
    }
}