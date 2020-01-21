import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  major: number = 0;
  minor: number = 0;
  revision: number = 0;
  status: string = "ALPHA";

  constructor() { }

  ngOnInit() {
  }

}
