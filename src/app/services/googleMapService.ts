import { Injectable } from '@angular/core';

declare let google: any;

@Injectable()
export class GoogleMapService {

  constructor() {}

  static pinCurrentPosition(htmlElement: HTMLElement) {
    const initialCoords: [number, number] = [51.508742, -0.120850];

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

  static pinPosition(htmlElement: HTMLElement, latitude: number, longitude: number) {
    let location = new google.maps.LatLng(latitude, longitude);

    let mapProp = {
      center: location,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    let map = new google.maps.Map(htmlElement, mapProp);

    let marker = new google.maps.Marker({
      position: location,
      animation: google.maps.Animation.BOUNCE,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });

    map.panTo(marker.position);
  }

}
