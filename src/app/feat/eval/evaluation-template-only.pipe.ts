import { Pipe, PipeTransform } from '@angular/core';
import { Evaluation } from './evaluation.class';

@Pipe({
  name: 'templates'
})
export class EvaluationTemplateOnlyPipe implements PipeTransform {

  transform(evals: Evaluation[], templatesOnly: boolean = false): Evaluation[] {
    if(!templatesOnly) return evals;
    let selEvals: Evaluation[] = [];
    evals.forEach(e => {
      if(e.isTemplate) selEvals.push(e);
    });
    return selEvals;
  }

}
