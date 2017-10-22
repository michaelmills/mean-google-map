import { Component, OnInit } from '@angular/core';
import { GoogleMapService } from './services/googleMapService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private googleMapService: GoogleMapService) {}

  ngOnInit() {
    this.googleMapService.drawMap(document.getElementById('map'));
    // this.googleMapService.pinPosition(document.getElementById('map'), null, null);
    this.googleMapService.pinCurrentPosition(document.getElementById('map'));
    // this.googleMapService.pinCurrentPosition(document.getElementById('map')).subscribe(position => {
    //   this.googleMapService.pinPosition(document.getElementById('map'), position.coords.longitude, position.coords.latitude);
    // });
  }
}
