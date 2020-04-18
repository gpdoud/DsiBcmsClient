import { Pipe, PipeTransform } from '@angular/core';
import { Kb } from './kb.class';

@Pipe({
  name: 'kbSrch'
})
export class KbSearchPipe implements PipeTransform {

  transform(kbs: Kb[], criteria: string = ''): Kb[] {
    if(criteria === '') return kbs;
    criteria = criteria.toLowerCase();
    let selKbs: Kb[] = [];
    for(let kb of kbs) {
      if(
        kb.id.toString().includes(criteria)
          || kb.title.toLowerCase().includes(criteria)
          || kb.response.toLowerCase().includes(criteria)
          || kb.sticky.toString().includes(criteria)
          || kb.locked.toString().includes(criteria)
          || kb.username.toString().includes(criteria)
      ) {
        selKbs.push(kb);
      }
    }
    return selKbs;
  }

}
