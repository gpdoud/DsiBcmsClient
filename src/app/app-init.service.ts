import { Injectable } from '@angular/core';

// const baseUrl = "https://localhost:5001/dsi";
const baseUrl = "https://localhost:44379/dsi";

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  get Url(): string { return baseUrl; }

  constructor() { }
}
