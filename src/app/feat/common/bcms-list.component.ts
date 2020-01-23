import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../core/system/system.service';
import { BcmsComponent } from './bcms.component';

@Component({
    template: ''
})
export class BcmsListComponent extends BcmsComponent implements OnInit {

    searchCriteria: string = '';
    sortCriteria: string = 'id';
    ascOrder: boolean = true;

    constructor(
        protected sys: SystemService
    ) {
        super(sys)
    }

    sort(column: string): void {
        this.ascOrder = (column == this.sortCriteria) ? !this.ascOrder : true;
        this.sortCriteria = column;
    }

    ngOnInit() {
        super.ngOnInit();
    }
}