import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '../../core/system/system.service';
import { User } from '@feat/user/user.class';

@Component({
    template: ''
})
export class BcmsComponent implements OnInit {

    pageTitle: string = "No Page Title";
    readonly: boolean = false;
    _loggedInUser: User;

    constructor(
        protected sys: SystemService
    ) { }

    verified: boolean;
    delete(): void {}
    edit(): void {}
    save(): void {}
    verify(): void {}
    verifyDelete(): void {};

    ngOnInit() {
        if(this.sys.config.checkLogin) {
            this.sys.checkLogin();
            this._loggedInUser = this.sys.loggedInUser;
        } else {
            this.sys.log.warn("Check for login is disabled.");
        }
    }
}