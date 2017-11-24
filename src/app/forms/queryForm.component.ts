import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GoogleMapService } from '../services/googleMapService';
import { UserService } from '../services/userService';
import { QueryUserData } from '../common/types';

@Component({
  selector: 'app-form-root',
  templateUrl: './queryForm.component.html'
})
export class QueryFormComponent implements OnInit {
  queryUserForm: FormGroup;
  queryCount: any;

  constructor(private formBuilder: FormBuilder,
              private googleMapService: GoogleMapService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.queryUserForm = this.formBuilder.group({
      latitude: [this.googleMapService.defaultLatitude, [Validators.required]],
      longitude: [this.googleMapService.defaultLongitude, [Validators.required]],
      distance: '',
      male: false,
      female: false,
      other: false,
      minAge: '',
      maxAge: '',
      favlang: '',
      reqVerified: false
    });

    // clear map and pin user's current position on google map
    this.googleMapService.clearMap();
    this.googleMapService.pinCurrentPosition();

    // subscribing to Observable for clicked coordinates
    this.googleMapService.getClickedCoords().subscribe((x) => {
      this.queryUserForm.patchValue({
        latitude: parseFloat(x[0]).toFixed(3),
        longitude: parseFloat(x[1]).toFixed(3)
      });
    });

    // subscribing to Observable for auto coordinates
    this.googleMapService.getAutoCoords().subscribe((x) => {
      this.queryUserForm.patchValue({
        latitude: parseFloat(x[0]).toFixed(3),
        longitude: parseFloat(x[1]).toFixed(3)
      });
    });
  }

  /**
   * Queries users based on criteria
   */
  queryUsers() {
    const queryUserData: QueryUserData = {
      latitude: parseFloat(this.queryUserForm.value.latitude),
      longitude: parseFloat(this.queryUserForm.value.longitude),
      distance: parseFloat(this.queryUserForm.value.distance),
      male: this.queryUserForm.value.male ? 'Male' : '',
      female: this.queryUserForm.value.female ? 'Female' : '',
      other: this.queryUserForm.value.other ? 'What\'s it to ya?' : '',
      minAge: this.queryUserForm.value.minAge,
      maxAge: this.queryUserForm.value.maxAge,
      favlang: this.queryUserForm.value.favlang,
      reqVerified: this.queryUserForm.value.reqVerified
    };

    console.log(`Sending POST request to '/api/query': ${JSON.stringify(queryUserData)}`);

    // POST request to query for users
    this.userService.queryUsers(queryUserData).subscribe(users => {
      this.googleMapService.clearMap();

      this.queryCount = users.length;
      for (const user of users) {
        this.googleMapService.pinSavedPosition(user, true);
      }

      this.reset();
    });
  }

  /**
   * Resets the form's content
   */
  private reset() {
    const currentLat = this.queryUserForm.value.latitude;
    const currentLng = this.queryUserForm.value.longitude;

    this.queryUserForm.reset({
      latitude: currentLat,
      longitude: currentLng
    });
  }

}
