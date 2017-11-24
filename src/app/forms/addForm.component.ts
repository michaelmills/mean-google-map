import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { GoogleMapService } from '../services/googleMapService';
import { UserService } from '../services/userService';
import { UserData } from '../common/types';

@Component({
  selector: 'app-form-root',
  templateUrl: './addForm.component.html'
})
export class AddFormComponent implements OnInit {
  addUserForm: FormGroup;

  private verified = 'Yep (Thanks for giving us real data!)';
  private notVerified = 'Nope (Thanks for spamming my map...)';

  constructor(private formBuilder: FormBuilder,
              private googleMapService: GoogleMapService, private userService: UserService) {
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
      longitude: [this.googleMapService.defaultLatitude, [Validators.required]],
      latitude: [this.googleMapService.defaultLongitude, [Validators.required]],
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
  saveUser() {
    if (!this.addUserForm.valid) {
      console.log('Error: Form not valid');
      return;
    }

    const userData: UserData  = {
      username: this.addUserForm.value.username,
      gender: this.addUserForm.value.gender,
      age: this.addUserForm.value.age,
      favlang: this.addUserForm.value.favlang,
      location: [this.addUserForm.value.longitude, this.addUserForm.value.latitude],
      htmlverified: this.addUserForm.value.htmlverified
    };

    console.log(`Sending POST request to '/api/users': ${JSON.stringify(userData)}`);

    // POST request to save user and reset the form's content
    this.userService.postUser(userData).subscribe(response => {
      this.reset();
    });
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
