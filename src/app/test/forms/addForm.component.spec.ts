import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { AddFormComponent } from '../../forms/addForm.component';
import { FormModule } from '../../forms/form.module';
import { GoogleMapService } from '../../services/googleMapService';
import { UserService } from '../../services/userService';

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
        de = fixture.debugElement;
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

  it('initial add form', () => {
    expect(fixture.componentInstance instanceof AddFormComponent).toBeTruthy();

    let element: DebugElement = de.query(By.css('.panel-heading h2'));
    expect(element.nativeElement.textContent.trim()).toBe('Join the Scotch Team!');

    element = de.query(By.css('form label[for=username]'));
    expect(element.nativeElement.textContent).toBe('Username All fields required');

    element = de.query(By.css('form label#gender'));
    expect(element.nativeElement.textContent).toBe('Gender');

    element = de.query(By.css('form label#male'));
    expect(element.nativeElement.textContent.trim()).toBe('Male');

    element = de.query(By.css('form label#female'));
    expect(element.nativeElement.textContent.trim()).toBe('Female');

    element = de.query(By.css('form label#other'));
    expect(element.nativeElement.textContent.trim()).toBe('What\'s it to ya?');

    element = de.query(By.css('form label[for=age]'));
    expect(element.nativeElement.textContent).toBe('Age');

    element = de.query(By.css('form label[for=language]'));
    expect(element.nativeElement.textContent).toBe('Favorite Language');

    element = de.query(By.css('form label[for=latitude]'));
    expect(element.nativeElement.textContent).toBe('Latitude');

    element = de.query(By.css('form label[for=longitude]'));
    expect(element.nativeElement.textContent).toBe('Longitude');

    element = de.query(By.css('form label[for=verified]'));
    expect(element.nativeElement.textContent).toBe('HTML5 Verified Location?');

    element = de.query(By.css('form button'));
    expect(element.nativeElement.textContent).toBe('Submit');
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
    spyOn(comp, 'saveUser').and.callThrough();

    expect(comp.addUserForm.valid).toBeFalsy();

    // set form values
    usernameControl.setValue('test_username');
    genderControl.setValue('test_gender');
    ageControl.setValue(55);
    favlangControl.setValue('test_favlang');

    expect(comp.addUserForm.valid).toBeTruthy();

    // call form submit and detect changes
    de.query(By.css('form')).triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    // assert method calls
    expect(comp.saveUser).toHaveBeenCalled();
    expect(userService.postUser).toHaveBeenCalled();

    // form is reset
    expect(usernameControl.valid).toBeFalsy();
    expect(genderControl.valid).toBeFalsy();
    expect(ageControl.valid).toBeFalsy();
    expect(favlangControl.valid).toBeFalsy();
    expect(latitudeControl.value).toEqual(0);
    expect(longitudeControl.value).toEqual(0);
    expect(htmlverifiedControl.value).toEqual('Nope (Thanks for spamming my map...)');
    expect(comp.addUserForm.valid).toBeFalsy();
  });

  it('log invalid form submission', () => {
    spyOn(comp, 'saveUser').and.callThrough();
    spyOn(console, 'log').and.callThrough();

    expect(comp.addUserForm.valid).toBeFalsy();

    // call form submit and detect changes
    de.query(By.css('form')).triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();


    // assert method calls
    expect(comp.saveUser).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalled();

    expect(comp.addUserForm.valid).toBeFalsy();
  });
});

