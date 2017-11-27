import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { FormModule } from '../../forms/form.module';
import { QueryFormComponent } from '../../forms/queryForm.component';
import { GoogleMapService } from '../../services/googleMapService';
import { UserService } from '../../services/userService';

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
        de = fixture.debugElement;
        comp = fixture.componentInstance;

        googleMapService = TestBed.get(GoogleMapService);
        userService = TestBed.get(UserService);

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

  it('initial query form', () => {
    expect(fixture.componentInstance instanceof QueryFormComponent).toBeTruthy();

    let element: DebugElement = de.query(By.css('.panel-heading h2'));
    expect(element.nativeElement.textContent).toBe('Find Teammates! (Map Query)');

    element = de.query(By.css('form label[for=latitude]'));
    expect(element.nativeElement.textContent).toBe('Your Latitude');

    element = de.query(By.css('form label[for=longitude]'));
    expect(element.nativeElement.textContent).toBe('Your Longitude');

    element = de.query(By.css('form label[for=distance]'));
    expect(element.nativeElement.textContent).toBe('Max. Distance (miles)');

    element = de.query(By.css('form label#gender'));
    expect(element.nativeElement.textContent).toBe('Gender');

    element = de.query(By.css('form label#male'));
    expect(element.nativeElement.textContent.trim()).toBe('Male');

    element = de.query(By.css('form label#female'));
    expect(element.nativeElement.textContent.trim()).toBe('Female');

    element = de.query(By.css('form label#other'));
    expect(element.nativeElement.textContent.trim()).toBe('What\'s it to ya?');

    element = de.query(By.css('form label[for=minage]'));
    expect(element.nativeElement.textContent).toBe('Min. Age');

    element = de.query(By.css('form label[for=maxage]'));
    expect(element.nativeElement.textContent).toBe('Max Age');

    element = de.query(By.css('form label[for=favlang]'));
    expect(element.nativeElement.textContent).toBe('Favorite Language');

    element = de.query(By.css('form label#reqVerified'));
    expect(element.nativeElement.textContent.trim()).toBe('Include Only HTML5 Verified Locations?');

    element = de.query(By.css('form button'));
    expect(element.nativeElement.textContent).toBe('Search');

    element = de.query(By.css('#queryCount'));
    expect(element).toBeNull();
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
    const users = ['user1', 'user2'];
    spyOn(userService, 'queryUsers').and.returnValue(Observable.of(users));
    spyOn(comp, 'queryUsers').and.callThrough();

    // check initial form
    let queryCountElement: DebugElement = de.query(By.css('#queryCount'));
    expect(comp.queryUserForm.valid).toBeTruthy();
    expect(queryCountElement).toBeNull();

    // call form submit and detect changes
    de.query(By.css('form')).triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    // assert method calls
    expect(comp.queryUsers).toHaveBeenCalled();
    expect(userService.queryUsers).toHaveBeenCalled();

    // check form
    queryCountElement = de.query(By.css('#queryCount'));
    expect(queryCountElement).not.toBeNull();
    expect(queryCountElement.nativeElement.textContent).toBe('Hot Dang! We Found 2 Teammates');

    // form is reset
    expect(comp.queryCount).toBe(users.length);
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

