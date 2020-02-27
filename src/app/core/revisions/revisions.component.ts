import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-revisions',
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.css']
})
export class RevisionsComponent implements OnInit {

  pageTitle: string = "Revision History";
  
  constructor() { 
  }

  ngOnInit() {
  }

}
