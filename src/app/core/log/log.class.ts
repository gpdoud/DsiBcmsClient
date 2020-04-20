export class Log {

    id: number = 0;
    timestamp: string = (new Date()).toISOString();
    message: string = '';
    serverity: LogSererity = LogSererity.Info;

    constructor() {}
}
export enum LogSererity { Info, Warn, Error, Fatal }