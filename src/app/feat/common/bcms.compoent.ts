import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../core/system/system.service';

@Component({
    template: ''
})
export class BcmsComponent implements OnInit {

    constructor(
        protected sys: SystemService
    ) {}

    ngOnInit() {

    }
}