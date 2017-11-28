import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { UserData } from '../common/types';

declare let google: any;

@Injectable()
export class GoogleMapService {
  private initialCoords: [number, number] = [51.508, -0.120];

  private map: any;
  private infoWindow: any;
  private lastMarker: any;
  private markers: any[];

  private clickedCoords: Subject<any>;
  private autoCoords: Subject<any>;

  constructor() {
    this.clickedCoords = new Subject<any>();
    this.autoCoords = new Subject<any>();
    this.infoWindow = new google.maps.InfoWindow();
    this.markers = [];
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
    this.addMapListener();
  }

  /**
   * Clears the map of all markers
   */
  clearMap() {
    for (const marker of this.markers) {
      marker.setMap(null);
    }
  }

  /**
   * Places a google map pin on user's current position
   */
  pinCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords;
        this.pinSelectedPosition(coords.latitude, coords.longitude);

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
   * Places a google map pin on the selected coordinates
   * @param {number} latitude
   * @param {number} longitude
   */
  pinSelectedPosition(latitude: number, longitude: number) {
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      animation: google.maps.Animation.BOUNCE,
      map: this.map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });

    if (this.map) {
      this.map.panTo(marker.position);

      if (this.lastMarker) {
        this.lastMarker.setMap(null);
      }

      this.lastMarker = marker;
    }

    console.log(`Pinned selected position[lat, lng]:`, [latitude, longitude]);
  }

  /**
   * Places a google map pin on the coordinates of saved users
   * @param users
   * @param filtered
   */
  pinSavedPositions(users: Array<UserData>, filtered?: boolean) {
    const icon = filtered ?
      'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';

    for (const user of users) {
      const contentString =
        '<p><b>Username</b>: ' + user.username +
        '<br><b>Age</b>: ' + user.age +
        '<br><b>Gender</b>: ' + user.gender +
        '<br><b>Favorite Language</b>: ' + user.favlang +
        '</p>';

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(user.location[1], user.location[0]),
        title: 'Big Map',
        map: this.map,
        icon: icon
      });

      this.addPinListener(marker, contentString);
      this.markers.push(marker);
    }

    console.log(`Pinned positions[lat, lng]`,
      Array.apply(this, this.markers)
        .map((el, index) => {
          return [el.position.lat(), el.position.lng()];
        })
    );
  }

  /**
   * Click listener that places a google map pin at the click location
   */
  private addMapListener() {
    google.maps.event.addListener(this.map, 'click', (e) => {
      this.pinSelectedPosition(e.latLng.lat(), e.latLng.lng());

      this.clickedCoords.next([e.latLng.lat(), e.latLng.lng()]);
    });
  }

  /**
   * Click listener for google map pin containing pin details
   * @param marker
   * @param {string} contentString
   */
  private addPinListener(marker: any, contentString: string) {
    google.maps.event.addListener(marker, 'click', (e) => {
      this.infoWindow.close();
      this.infoWindow.setOptions({
        content: contentString,
        maxWidth: 320
      });
      this.infoWindow.open(this.map, marker);
    });
  }

  getClickedCoords(): Observable<any> {
    return this.clickedCoords.asObservable();
  }

  getAutoCoords(): Observable<any> {
    return this.autoCoords.asObservable();
  }

  get defaultLatitude(): number {
    return this.initialCoords[0];
  }

  get defaultLongitude(): number {
    return this.initialCoords[1];
  }
}
