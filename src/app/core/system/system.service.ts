import { Injectable } from '@angular/core';
import { AppInitService } from '../../app-init.service';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  config: any = null;
  get url(): string {
    return this.config.baseurl;
  }

  get log(): LoggerService {
    return this.logger;
  }

  constructor(
    private init: AppInitService,
    private logger: LoggerService
  ) { 
    this.config = init.config;
    this.log.debug("System config:", this.config);
  }
}
