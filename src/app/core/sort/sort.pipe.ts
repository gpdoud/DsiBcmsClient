import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(arr: any[], column: string, asc: boolean = true): any[] {
    if(arr == null || arr.length == 0) return arr;

    let sortFn = (a: any, b: any): number => {
      let x = this.setValue(a[column]);
      let y = this.setValue(b[column]);
      if (x === y) return 0;
      let mult = asc ? 1 : -1;
      return mult * (x < y ? -1 : 1);
    }

    let sorted = arr.sort(sortFn);

    return sorted;
  }
  setValue = (colVal: any): any => {
    if (colVal == null) return '';
    if (typeof colVal == "number") return colVal;
    return colVal.toString().toLowerCase();
  }

}
