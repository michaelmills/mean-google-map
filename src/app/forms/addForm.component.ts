import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-form-root',
  templateUrl: './addForm.component.html'
})
export class AddFormComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(private http: Http, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      favlang: ['', [Validators.required]],
      longitude: [-98.350, [Validators.required]],
      latitude: [39.500, [Validators.required]],
      htmlverified: ['Nope (Thanks for spamming my map...)', [Validators.required]]
    });
  }

  createUser() {
    console.log(JSON.stringify(this.addUserForm.value));

    let userData = {
      username: this.addUserForm.value.username,
      gender: this.addUserForm.value.gender,
      age: this.addUserForm.value.age,
      favlang: this.addUserForm.value.favlang,
      location: [this.addUserForm.value.longitude, this.addUserForm.value.latitude],
      htmlverified: this.addUserForm.value.htmlverified
    };

    this.http.post('/api/users', userData)
      .map((res: Response) => console.log(`Posted user: ${JSON.stringify(res.json())}`))
      .subscribe();
  }
}
