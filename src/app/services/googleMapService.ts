import { Injectable } from '@angular/core';

declare let google: any;

@Injectable()
export class GoogleMapService {
  private map: any;
  private initialCoords: [number, number] = [51.508742, -0.120850];

  constructor() {}

  public drawMap(htmlElement: HTMLElement, latitude?: number, longitude?: number) {
    let location: any;

    if (latitude === undefined  || longitude === undefined) {
      location = new google.maps.LatLng(this.initialCoords[0], this.initialCoords[1]);
    } else {
      location = new google.maps.LatLng(latitude, longitude);
    }

    let mapProp = {
      center: location,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(htmlElement, mapProp);
  }

  public pinCurrentPosition(htmlElement: HTMLElement) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let coords = position.coords;
        this.pinPosition(htmlElement, coords.latitude, coords.longitude);

        console.log(`Current position[lat, lng]: [${coords.latitude}, ${coords.longitude}`);
      },
      (error) => {
        console.log(`Error: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0
      });
  }

  public pinPosition(htmlElement: HTMLElement, latitude: number, longitude: number) {
    if (this.map === undefined) {
      this.drawMap(htmlElement, latitude, longitude);
    }

    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      animation: google.maps.Animation.BOUNCE,
      map: this.map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });

    this.map.panTo(marker.position);
  }

}
