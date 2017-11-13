import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GoogleMapService } from '../services/googleMapService';
import { UserService } from '../services/userService';

@Component({
  selector: 'app-form-root',
  templateUrl: './addForm.component.html'
})
export class AddFormComponent implements OnInit {
  addUserForm: FormGroup;

  private verified = 'Yep (Thanks for giving us real data!)';
  private notVerified = 'Nope (Thanks for spamming my map...)';

  private defaultLatitude: number;
  private defaultLongitude: number;

  constructor(private http: Http, private formBuilder: FormBuilder,
              private googleMapService: GoogleMapService, private userService: UserService) {
    this.defaultLatitude = this.googleMapService.defaultLatitude;
    this.defaultLongitude = this.googleMapService.defaultLongitude;
  }

  /**
   * Pins current position on the google map and initializes the form
   */
  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      favlang: ['', [Validators.required]],
      longitude: [this.defaultLongitude, [Validators.required]],
      latitude: [this.defaultLatitude, [Validators.required]],
      htmlverified: [this.notVerified, [Validators.required]]
    });

    // clear map and pin user's current position on google map
    this.googleMapService.clearMap();
    this.googleMapService.pinCurrentPosition();

    // query for users
    this.userService.getUsers().subscribe(users => {
      for (const user of users) {
        this.googleMapService.pinSavedPosition(user, false);
      }
    });

    // subscribing to Observable for clicked coordinates
    this.googleMapService.getClickedCoords().subscribe((x) => {
      this.addUserForm.patchValue({
        latitude: parseFloat(x[0]).toFixed(3),
        longitude: parseFloat(x[1]).toFixed(3),
        htmlverified: this.notVerified
      });
    });

    // subscribing to Observable for auto coordinates
    this.googleMapService.getAutoCoords().subscribe((x) => {
      this.addUserForm.patchValue({
        latitude: parseFloat(x[0]).toFixed(3),
        longitude: parseFloat(x[1]).toFixed(3),
        htmlverified: this.verified
      });
    });
  }

  /**
   * Retrieves form data and sends POST request to add user to db
   */
  createUser() {
    const userData = {
      username: this.addUserForm.value.username,
      gender: this.addUserForm.value.gender,
      age: this.addUserForm.value.age,
      favlang: this.addUserForm.value.favlang,
      location: [this.addUserForm.value.longitude, this.addUserForm.value.latitude],
      htmlverified: this.addUserForm.value.htmlverified
    };

    console.log(`Sending POST request to '/api/users': ${JSON.stringify(userData)}`);

    // POST request to save user and reset the form's content
    this.http.post('/api/users', userData)
      .map((res: Response) => {
        this.defaultLatitude = this.addUserForm.value.latitude;
        this.defaultLongitude = this.addUserForm.value.longitude;

        this.reset();
      })
      .catch((e: any) => {
        return Observable.throw(e || 'backend server error');
      })
      .subscribe();
  }

  /**
   * Resets the form's content
   */
  private reset() {
    const currentLat = this.addUserForm.value.latitude;
    const currentLng = this.addUserForm.value.longitude;
    const currentHtmlverified = this.addUserForm.value.htmlverified;

    this.addUserForm.reset({
      latitude: currentLat,
      longitude: currentLng,
      htmlverified: currentHtmlverified
    });
  }
}
