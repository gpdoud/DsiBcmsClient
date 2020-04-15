import { Pipe, PipeTransform } from '@angular/core';
import { KbCategory } from './kb-category.class';

@Pipe({
  name: 'kbCatSrch'
})
export class KbCategorySearchPipe implements PipeTransform {

  transform(kbcats: KbCategory[], criteria: string = ''): KbCategory[] {
    if(criteria === '') return kbcats;
    criteria = criteria.toLowerCase();
    let selKbcats: KbCategory[] = [];
    for(let kbcat of kbcats) {
      if(
        kbcat.id.toString().includes(criteria)
        || kbcat.code.toLowerCase().includes(criteria)
        || kbcat.description.toLowerCase().includes(criteria)
        || kbcat.active.toString().includes(criteria)
      ) {
        selKbcats.push(kbcat);
      }
    }
    return null;
  }

}
