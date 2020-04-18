export class KbCategory {

    id: number = 0;
    code: string = '';
    description: string = '';
    active: boolean = true;
    created: string = (new Date()).toISOString();
    updated: string = null;

    constructor() {}
}
