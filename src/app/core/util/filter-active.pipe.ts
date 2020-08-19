import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterActive'
})
export class FilterActivePipe implements PipeTransform {

  transform(arr: any[], showInactive: boolean = false): any[] {
    if(arr == null) return arr;
    if(showInactive) return arr;
    let selArr: any[] = [];
    for(let a of arr) {
      if(a.active) selArr.push(a);
    }
    return selArr;
  }

}
