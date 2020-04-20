export class Log {

    id: number = 0;
    timestamp: Date = new Date();
    message: string = '';
    severity: LogSeverity = LogSeverity.Info;

    constructor() {}
}
export enum LogSeverity { Info, Warn, Error, Fatal }