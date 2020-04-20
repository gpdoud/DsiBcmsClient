import { Pipe, PipeTransform } from '@angular/core';
import { Log } from '@log/log.class';

@Pipe({
  name: 'logSrch'
})
export class LogSearchPipe implements PipeTransform {

  transform(logs: Log[], criteria: string = ''): Log[] {
    if(criteria === '') return logs;
    criteria = criteria.toLowerCase();
    let selLogs: Log[] = [];
    for(let log of logs) {
      if(
        log.id.toString().includes(criteria)
          || log.timestamp.toString().toLowerCase().includes(criteria)
          || log.message.toLowerCase().includes(criteria)
          || log.severity.toString().toLowerCase().includes(criteria)
      ) { 
        selLogs.push(log);
      }
    }
  }

}
