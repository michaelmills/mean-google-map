import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

declare let google: any;

@Injectable()
export class GoogleMapService {
  initialCoords: [number, number] = [51.508, -0.120];

  private map: any;
  private lastMarker: any;
  private clickedCoords: any;
  private autoCoords: any;

  constructor() {
    this.clickedCoords = new Subject<any>();
    this.autoCoords = new Subject<any>();
  }

  /**
   * Draws the google map on the provided html element
   * @param {HTMLElement} htmlElement
   * @param {number} latitude
   * @param {number} longitude
   */
  drawMap(htmlElement: HTMLElement, latitude?: number, longitude?: number) {
    let location: any;

    if (latitude === undefined  || longitude === undefined) {
      location = new google.maps.LatLng(this.initialCoords[0], this.initialCoords[1]);
    } else {
      location = new google.maps.LatLng(latitude, longitude);
    }

    const mapProp = {
      center: location,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(htmlElement, mapProp);
    this.addListener();
  }

  /**
   * Places a google map pin on user's current position
   * @param {HTMLElement} htmlElement
   */
  pinCurrentPosition(htmlElement: HTMLElement) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords;
        this.pinPosition(coords.latitude, coords.longitude, htmlElement);

        this.autoCoords.next([coords.latitude, coords.longitude]);
      },
      (error) => {
        console.log(`Error: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0
      });
  }

  /**
   * Places a google map pin based on coordinates
   * @param {HTMLElement} htmlElement
   * @param {number} latitude
   * @param {number} longitude
   */
  pinPosition(latitude: number, longitude: number, htmlElement?: HTMLElement) {
    if (this.map === undefined) {
      this.drawMap(htmlElement, latitude, longitude);
    }

    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      animation: google.maps.Animation.BOUNCE,
      map: this.map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });

    if (this.lastMarker !== undefined) {
      this.lastMarker.setMap(null);
    }

    this.lastMarker = marker;
    this.map.panTo(marker.position);

    console.log(`Pinned position[lat, lng]: [${latitude}, ${longitude}]`);
  }

  /**
   * Click listener that places a google map pin at the click location
   */
  private addListener() {
    google.maps.event.addListener(this.map, 'click', (e) => {
      this.pinPosition(e.latLng.lat(), e.latLng.lng());

      this.clickedCoords.next([e.latLng.lat(), e.latLng.lng()]);
    });
  }

  getClickedCoords(): Observable<any> {
    return this.clickedCoords.asObservable();
  }

  getAutoCoords(): Observable<any> {
    return this.autoCoords.asObservable();
  }

}
