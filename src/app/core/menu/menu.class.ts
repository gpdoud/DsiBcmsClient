export class Menu {
    display: string;
    route: string;
    tip: string;
    reqsAdm: boolean;

    constructor(display: string, route: string, tip: string, reqsAdm = false) {
        this.display = display;
        this.route = route;
        this.tip = tip;
        this.reqsAdm = reqsAdm;
    }
}