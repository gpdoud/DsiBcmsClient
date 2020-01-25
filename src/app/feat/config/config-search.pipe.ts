import { Pipe, PipeTransform } from '@angular/core';
import { Config } from './config.class';

@Pipe({
  name: 'configSrch'
})
export class ConfigSearchPipe implements PipeTransform {

  transform(configs: Config[], searchCriteria: string): Config[] {
    if(searchCriteria == '') return configs;
    let selConfigs: Config[] = [];
    configs.forEach(c => {
      if(c.keyValue.toLowerCase().includes(searchCriteria.toLowerCase())
        || c.dataValue.toLowerCase().includes(searchCriteria.toLowerCase())
        || c.system.toString().toLowerCase().includes(searchCriteria.toLowerCase())
        || c.active.toString().toLowerCase().includes(searchCriteria.toLowerCase())
    ) {
      selConfigs.push(c);
    }
    });
    return selConfigs;
  }

}
