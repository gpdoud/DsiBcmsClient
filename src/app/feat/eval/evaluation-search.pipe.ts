import { Pipe, PipeTransform } from '@angular/core';
import { Evaluation } from './evaluation.class';

@Pipe({
  name: 'evalSrch'
})
export class EvaluationSearchPipe implements PipeTransform {

  transform(evals: Evaluation[], search: string = ""): Evaluation[] {
    if(search === "") return evals;
    search = search.toLowerCase();
    let selEvals: Evaluation[] = [];
    for(let e of evals) {
      if(
        e.id.toString().includes(search)
        || e.description.toLowerCase().includes(search)
        || e.isTemplate.toString().toLowerCase().includes(search)
        || e.isDone.toString().toLowerCase().includes(search)
        || e.pointsAvailable.toString().includes(search)
        || e.pointsScored.toString().includes(search)
        || e.active.toString().includes(search)
      ) { selEvals.push(e); }
    }
    return selEvals;
  }

}
