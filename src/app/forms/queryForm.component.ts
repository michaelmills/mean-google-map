import { Component, OnInit } from '@angular/core';
import { GoogleMapService } from '../services/googleMapService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

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
      latitude: [this.defaultLatitude, [Validators.required]],
      longitude: [this.defaultLongitude, [Validators.required]],
      distance: ['', [Validators.required]],
      male: ['', [Validators.required]],
      female: ['', [Validators.required]],
      other: ['', [Validators.required]],
      minAge: ['', [Validators.required]],
      maxAge: ['', [Validators.required]],
      favlang: ['', [Validators.required]],
      reqVerified: [false, [Validators.required]]
    });

    this.googleMapService.pinCurrentPosition(document.getElementById('map'));

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
    console.log(`Sending POST request to '/api/query': ${JSON.stringify(this.queryUserForm.value)}`);

    const queryData = {
      longitude: parseFloat(this.queryUserForm.value.longitude),
      latitude: parseFloat(this.queryUserForm.value.latitude),
      distance: parseFloat(this.queryUserForm.value.distance),
      male: this.queryUserForm.value.male,
      female: this.queryUserForm.value.female,
      other: this.queryUserForm.value.other,
      minAge: this.queryUserForm.value.minage,
      maxAge: this.queryUserForm.value.maxage,
      favlang: this.queryUserForm.value.favlang,
      reqVerified: this.queryUserForm.value.verified
    };

    // POST request to query for users
    this.http.post('/api/query', queryData)
      .map((res: Response) => {
        this.reset();
      })
      .catch((e: any) => {
        console.log(e.status);
        return Observable.throw({'Errors': e.json()});
      })
      .subscribe();
  }

  private reset() {
    this.queryUserForm.reset();
  }

}
