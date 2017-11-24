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
import { QueryFormComponent } from '../../forms/queryForm.component';

class GoogleMapServiceStub {
  clearMap() {}
  pinCurrentPosition() {}
  pinSavedPosition(user: any, filter: boolean) {
    return new EmptyObservable();
  }

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

describe('QueryFormComponent', () => {
  let comp: QueryFormComponent;
  let fixture: ComponentFixture<QueryFormComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let googleMapService: GoogleMapService;
  let userService: UserService;

  let latitudeControl: AbstractControl;
  let longitudeControl: AbstractControl;
  let distanceControl: AbstractControl;
  let maleControl: AbstractControl;
  let femaleControl: AbstractControl;
  let otherControl: AbstractControl;
  let minAgeControl: AbstractControl;
  let maxAgeControl: AbstractControl;
  let favlangControl: AbstractControl;
  let reqVerifiedControl: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormModule ],
      providers: [
        {provide: GoogleMapService, useClass: GoogleMapServiceStub},
        UserService
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(QueryFormComponent);
        comp = fixture.componentInstance;

        googleMapService = TestBed.get(GoogleMapService);
        userService = fixture.debugElement.injector.get(UserService);

        comp.ngOnInit();
        fixture.detectChanges();

        latitudeControl = comp.queryUserForm.controls['latitude'];
        longitudeControl = comp.queryUserForm.controls['longitude'];
        distanceControl = comp.queryUserForm.controls['distance'];
        maleControl = comp.queryUserForm.controls['male'];
        femaleControl = comp.queryUserForm.controls['female'];
        otherControl = comp.queryUserForm.controls['other'];
        minAgeControl = comp.queryUserForm.controls['minAge'];
        maxAgeControl = comp.queryUserForm.controls['maxAge'];
        favlangControl = comp.queryUserForm.controls['favlang'];
        reqVerifiedControl = comp.queryUserForm.controls['reqVerified'];
      });
  }));

  it('create QueryFormComponent', () => {
    expect(fixture.componentInstance instanceof QueryFormComponent).toBeTruthy();
  });

  it('display header', () => {
      de = fixture.debugElement.query(By.css('h2'));
      el = de.nativeElement;
      expect(el.textContent).toContain('Find Teammates! (Map Query)');
  });

  it('form valid when empty', () => {
    expect(comp.queryUserForm.valid).toBeTruthy();
  });

  it('distance field validity', () => {
    expect(distanceControl.valid).toBeTruthy();

    // username field is not required
    const errors = distanceControl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('male field validity', () => {
    expect(maleControl.valid).toBeTruthy();

    // gender field is required
    const errors = maleControl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('female field validity', () => {
    expect(femaleControl.valid).toBeTruthy();

    // gender field is required
    const errors = femaleControl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('other field validity', () => {
    expect(otherControl.valid).toBeTruthy();

    // gender field is required
    const errors = otherControl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('min age field validity', () => {
    expect(minAgeControl.valid).toBeTruthy();

    // age field is required
    const errors = minAgeControl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('max age field validity', () => {
    expect(maxAgeControl.valid).toBeTruthy();

    // age field is required
    const errors = maxAgeControl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('favlang field validity', () => {
    expect(favlangControl.valid).toBeTruthy();

    // favlang field is required
    const errors = favlangControl.errors || {};
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

  it('reqVerified field validity', () => {
    expect(reqVerifiedControl.valid).toBeTruthy();

    // latitude field set in constructor
    const errors = reqVerifiedControl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('submit form saves user and resets form', () => {
    spyOn(userService, 'queryUsers').and.returnValue(Observable.of(''));
    expect(comp.queryUserForm.valid).toBeTruthy();

    comp.queryUsers();

    // form is reset
    expect(userService.queryUsers).toHaveBeenCalled();
    expect(distanceControl.value).toBeNull();
    expect(maleControl.value).toBeFalsy();
    expect(femaleControl.value).toBeFalsy();
    expect(otherControl.value).toBeFalsy();
    expect(minAgeControl.value).toBeNull();
    expect(maxAgeControl.value).toBeNull();
    expect(favlangControl.value).toBeNull();
    expect(latitudeControl.value).toEqual(0);
    expect(longitudeControl.value).toEqual(0);
    expect(reqVerifiedControl.value).toBeFalsy();
    expect(comp.queryUserForm.valid).toBeTruthy();
  });
});

