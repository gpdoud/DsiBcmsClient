export class Menu {
    display: string;
    route: string;
    tip: string;
    reqsAdm: boolean;
    reqsInstructor: boolean;

    constructor(display: string, route: string, tip: string, reqsAdm: boolean = false, reqsInstructor: boolean = false) {
        this.display = display;
        this.route = route;
        this.tip = tip;
        this.reqsAdm = reqsAdm;
        this.reqsInstructor = reqsInstructor;
    }
}