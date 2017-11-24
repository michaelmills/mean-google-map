import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { AddFormComponent } from '../../forms/addForm.component';
import { FormModule } from '../../forms/form.module';
import { GoogleMapService } from '../../services/googleMapService';
import { UserService } from '../../services/userService';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { AbstractControl } from '@angular/forms';

class GoogleMapServiceStub {
  clearMap() {}
  pinCurrentPosition() {}

  getClickedCoords(): Observable<any> {
    return new EmptyObservable();
  }

  getAutoCoords(): Observable<any> {
    return new EmptyObservable();
  }

  get defaultLongitude(): number {
    return 0;
  }

  get defaultLatitude(): number {
    return 0;
  }
}

describe('AddFormComponent', () => {
  let comp: AddFormComponent;
  let fixture: ComponentFixture<AddFormComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let googleMapService: GoogleMapService;
  let userService: UserService;

  let usernameControl: AbstractControl;
  let genderControl: AbstractControl;
  let ageControl: AbstractControl;
  let favlangControl: AbstractControl;
  let longitudeControl: AbstractControl;
  let latitudeControl: AbstractControl;
  let htmlverifiedControl: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormModule ],
      providers: [
        {provide: GoogleMapService, useClass: GoogleMapServiceStub},
        UserService
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AddFormComponent);
        comp = fixture.componentInstance; // AddFormComponent test instance

        googleMapService = TestBed.get(GoogleMapService);
        userService = fixture.debugElement.injector.get(UserService);

        spyOn(userService, 'getUsers').and.returnValue(new EmptyObservable());

        comp.ngOnInit();
        fixture.detectChanges();

        usernameControl = comp.addUserForm.controls['username'];
        genderControl = comp.addUserForm.controls['gender'];
        ageControl = comp.addUserForm.controls['age'];
        favlangControl = comp.addUserForm.controls['favlang'];
        longitudeControl = comp.addUserForm.controls['longitude'];
        latitudeControl = comp.addUserForm.controls['latitude'];
        htmlverifiedControl = comp.addUserForm.controls['htmlverified'];
      });
  }));

  it('create AddFormComponent', () => {
    expect(fixture.componentInstance instanceof AddFormComponent).toBeTruthy();
  });

  it('display header', () => {
      de = fixture.debugElement.query(By.css('h2'));
      el = de.nativeElement;
      expect(el.textContent).toContain('Join the Scotch Team!');
  });

  it('form invalid when empty', fakeAsync(() => {
    expect(comp.addUserForm.valid).toBeFalsy();
  }));

  it('username field validity', () => {
    expect(usernameControl.valid).toBeFalsy();

    // username field is required
    let errors = usernameControl.errors || {};
    expect(errors['required']).toBeTruthy();

    // set username
    usernameControl.setValue('test_username');
    errors = usernameControl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('gender field validity', () => {
    expect(genderControl.valid).toBeFalsy();

    // gender field is required
    let errors = genderControl.errors || {};
    expect(errors['required']).toBeTruthy();

    // set gender
    genderControl.setValue('test_gender');
    errors = genderControl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('age field validity', () => {
    expect(ageControl.valid).toBeFalsy();

    // age field is required
    let errors = ageControl.errors || {};
    expect(errors['required']).toBeTruthy();

    // set age
    ageControl.setValue(55);
    errors = ageControl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('favlang field validity', () => {
    expect(favlangControl.valid).toBeFalsy();

    // favlang field is required
    let errors = favlangControl.errors || {};
    expect(errors['required']).toBeTruthy();

    // set favlang
    favlangControl.setValue('favlang');
    errors = favlangControl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('longitude field validity', () => {
    expect(longitudeControl.valid).toBeTruthy();

    // longitude field set in constructor
    const errors = longitudeControl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('latitude field validity', () => {
    expect(latitudeControl.valid).toBeTruthy();

    // latitude field set in constructor
    const errors = latitudeControl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('htmlverified field validity', () => {
    expect(htmlverifiedControl.valid).toBeTruthy();

    // latitude field set in constructor
    const errors = htmlverifiedControl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('submit form saves user and resets form', () => {
    spyOn(userService, 'postUser').and.returnValue(Observable.of(''));

    expect(comp.addUserForm.valid).toBeFalsy();

    usernameControl.setValue('test_username');
    genderControl.setValue('test_gender');
    ageControl.setValue(55);
    favlangControl.setValue('test_favlang');

    expect(comp.addUserForm.valid).toBeTruthy();

    comp.saveUser();

    // form is reset
    expect(userService.postUser).toHaveBeenCalled();
    expect(usernameControl.valid).toBeFalsy();
    expect(genderControl.valid).toBeFalsy();
    expect(ageControl.valid).toBeFalsy();
    expect(favlangControl.valid).toBeFalsy();
    expect(latitudeControl.value).toEqual(0);
    expect(longitudeControl.value).toEqual(0);
    expect(htmlverifiedControl.value).toEqual('Nope (Thanks for spamming my map...)');
    expect(comp.addUserForm.valid).toBeFalsy();
  });
});

