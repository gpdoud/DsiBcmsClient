import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '../../core/system/system.service';

@Component({
    template: ''
})
export class BcmsComponent implements OnInit {

    pageTitle: string = "No Page Title";

    constructor(
        protected sys: SystemService
    ) { }

    ngOnInit() {
        if(this.sys.config.checkLogin) {
            this.sys.checkLogin();
        } else {
            this.sys.log.warn("Check for login is disabled.");
        }
    }
}