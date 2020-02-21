import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@feat/config/config.service';
import { Config } from '@feat/config/config.class';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  author: string;
  copyright: string;
  status: string;
  version: string;
  
  constructor(
    private cfg: ConfigService
  ) { }

  ngOnInit() {
    this.cfg.getKeys("author,copyright,status,version").subscribe(
      res => {
        for(let config of res) {
          switch(config.keyValue) {
            case "author": this.author = config.dataValue; break;
            case "copyright": this.copyright = config.dataValue; break;
            case "status": this.status = config.dataValue; break;
            case "version": this.version = config.dataValue; break;

          }
        }
      }
    );
  }

}
