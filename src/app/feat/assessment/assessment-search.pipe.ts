import { Pipe, PipeTransform } from '@angular/core';
import { Assessment } from './assessment.class';
import { AssessmentService } from './assessment.service';

@Pipe({
  name: 'assessmentSrch'
})
export class AssessmentSearchPipe implements PipeTransform {

  transform(assessments: Assessment[], criteria: string = ''): Assessment[] {
    if (criteria == '') { return assessments; }
    let selAsmts: Assessment[] = [];
    assessments.forEach(asmt => {
      if (
        asmt.id.toString().toLowerCase().includes(criteria.toLowerCase()) ||
        asmt.date.toLowerCase().includes(criteria.toLowerCase()) ||
        asmt.subject.toLowerCase().includes(criteria.toLowerCase()) ||
        asmt.description.toLowerCase().includes(criteria.toLowerCase()) ||
        asmt.pointsScore.toString().toLowerCase().includes(criteria.toLowerCase()) ||
        asmt.pointsMax.toString().toLowerCase().includes(criteria.toLowerCase()) ||
        asmt.userName.toLowerCase().includes(criteria.toLowerCase()) 
      ) {
        selAsmts.push(asmt);
      }
    });
    return selAsmts;
  }
}
