import { Pipe, PipeTransform } from '@angular/core';
import { Enrollment } from './enrollment.class';

@Pipe({
  name: 'enrollmentSrch'
})
export class EnrollmentSearchPipe implements PipeTransform {

  transform(enrollments: Enrollment[], criteria: string): Enrollment[] {
    if(criteria == null || criteria == '') return enrollments;
    let result: Enrollment[] = [];
    enrollments.forEach(e => {
      if(
        e.user.firstname.toLowerCase().includes(criteria.toLowerCase()) 
        || e.user.lastname.toLowerCase().includes(criteria.toLowerCase()) 
      ){
        result.push(e);
      }
    });
    console.warn("Search results: ", result);
    return null;
  }

}
