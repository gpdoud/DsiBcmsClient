import { LogService } from './log.service';

export class Log {

    id: number = 0;
    timestamp: Date = new Date();
    message: string = '';
    severity: LogSeverity = LogSeverity.Info;

    lineColor: string = '';

    constructor(msg: string = '', sev: LogSeverity = LogSeverity.Info) {
        this.id = 0;
        this.timestamp = new Date();
        this.message = msg;
        this.severity = sev;
    }
}
export enum LogSeverity { Info, Warn, Error, Fatal }