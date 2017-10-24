import { Component, OnInit } from '@angular/core';
import { GoogleMapService } from '../services/googleMapService';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-form-root',
  templateUrl: './queryForm.component.html'
})
export class QueryFormComponent implements OnInit {
  private queryUserForm: FormGroup;
  private defaultLatitude: number;
  private defaultLongitude: number;

  constructor(private http: Http, private formBuilder: FormBuilder, private googleMapService: GoogleMapService) {
    this.defaultLatitude = this.googleMapService.initialCoords[0];
    this.defaultLongitude = this.googleMapService.initialCoords[1];
  }

  ngOnInit(): void {
    this.queryUserForm = this.formBuilder.group({
      latitude: this.defaultLatitude,
      longitude: this.defaultLongitude,
      distance: '',
      male: false,
      female: false,
      other: false,
      minAge: '',
      maxAge: '',
      favlang: '',
      reqVerified: false
    });

    this.googleMapService.pinCurrentPosition();

    // subscribing to Observable for clicked coordinates
    this.googleMapService.getClickedCoords().subscribe((x) => {
      this.queryUserForm.patchValue({
        latitude: parseFloat(x[0]).toFixed(3),
        longitude: parseFloat(x[1]).toFixed(3),
        reqVerified: false
      });
    });

    // subscribing to Observable for auto coordinates
    this.googleMapService.getAutoCoords().subscribe((x) => {
      this.queryUserForm.patchValue({
        latitude: parseFloat(x[0]).toFixed(3),
        longitude: parseFloat(x[1]).toFixed(3),
        reqVerified: true
      });
    });
  }

  queryUsers() {
    const queryData = {
      longitude: parseFloat(this.queryUserForm.value.longitude),
      latitude: parseFloat(this.queryUserForm.value.latitude),
      distance: parseFloat(this.queryUserForm.value.distance),
      male: this.queryUserForm.value.male ? 'Male' : '',
      female: this.queryUserForm.value.female ? 'Female' : '',
      other: this.queryUserForm.value.other ? 'What\'s it to ya?' : '',
      minAge: this.queryUserForm.value.minAge,
      maxAge: this.queryUserForm.value.maxAge,
      favlang: this.queryUserForm.value.favlang,
      reqVerified: this.queryUserForm.value.reqVerified
    };

    console.log(`Sending POST request to '/api/query': ${JSON.stringify(queryData)}`);

    // POST request to query for users
    this.http.post('/api/query', queryData)
      .map((res: Response) => {
        console.log(`Received '/api/query' response: ${JSON.stringify(res.json())}`);

        for (const user of res.json()) {
          this.googleMapService.pinSavedPosition(user, true);
        }

        this.reset();
      })
      .catch((e: any) => {
        return Observable.throw(e || 'backend server error');
      })
      .subscribe();
  }

  private reset() {
    const currentLat = this.queryUserForm.value.latitude;
    const currentLng = this.queryUserForm.value.longitude;
    const currentReqVerified = this.queryUserForm.value.reqVerified;

    this.queryUserForm.reset({
      latitude: currentLat,
      longitude: currentLng,
      reqVerified: currentReqVerified
    });
  }

}
