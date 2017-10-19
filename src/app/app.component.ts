import { Component, OnInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(51.508742, -0.120850),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(document.getElementById('map'), mapProp);
  }
}
