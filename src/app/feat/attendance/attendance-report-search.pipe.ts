import { Pipe, PipeTransform } from '@angular/core';
import { AttendanceReport } from './attendance-report.class';

@Pipe({
  name: 'rptSrch'
})
export class AttendanceReportSearchPipe implements PipeTransform {

  transform(ars: any, searchCriteria: string = ''): AttendanceReport[] {
    // console.log("ARs", ars, "Search", searchCriteria);
    if(searchCriteria == '') return ars;
    let filteredArs: AttendanceReport[] = [];
    ars.forEach(ar => {
      if(
        ar.student.firstname.toLowerCase().includes(searchCriteria)
        || ar.student.lastname.toLowerCase().includes(searchCriteria)
      ) 
      { 
        filteredArs.push(ar); 
      }
    });
    return filteredArs;
  }

}
