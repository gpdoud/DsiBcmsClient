export class Menu {
    display: string;
    route: string;
    tip: string;

    constructor(display: string, route: string, tip: string) {
        this.display = display;
        this.route = route;
        this.tip = tip;
    }
}