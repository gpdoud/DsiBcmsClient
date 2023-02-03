import { Pipe, PipeTransform } from '@angular/core';
import { Cohort } from './cohort.class';

@Pipe({
  name: 'cohortSrch'
})
export class CohortSearchPipe implements PipeTransform {

  transform(cohorts: Cohort[], criteria: string = ''): Cohort[] {
    if(criteria == '') { return cohorts; }
    let selCohorts: Cohort[] = [];
    cohorts.forEach(cohort => {
      if(
        cohort.id.toString().toLowerCase().includes(criteria.toLowerCase()) ||
        cohort.name.toLowerCase().includes(criteria.toLowerCase()) ||
        (cohort.beginDate != null && cohort.beginDate.toString().toLowerCase().includes(criteria.toLowerCase())) ||
        (cohort.endDate != null && cohort.endDate.toLowerCase().includes(criteria.toLowerCase())) ||
        (cohort.demoDay != null && cohort.demoDay.toLowerCase().includes(criteria.toLowerCase())) ||
        (cohort.capacity.toString().toLowerCase().includes(criteria.toLowerCase())) ||
        (cohort.active.toString().toLowerCase().includes(criteria.toLowerCase()))
      ) { selCohorts.push(cohort); }
    });
    return selCohorts;
  }

}
