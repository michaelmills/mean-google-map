import { Component, OnInit } from '@angular/core';
import { GoogleMapService } from './services/googleMapService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    GoogleMapService.pinCurrentPosition(document.getElementById('map'));
  }
}
