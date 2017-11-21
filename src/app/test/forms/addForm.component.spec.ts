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

class UserServiceStub {
  getUsers(): Observable<any> {
    return Observable.of('');
  }

  postUser(userData: any): Observable<any> {
    return Observable.of('');
  }
}

describe('AddFormComponent', () => {
  let comp: AddFormComponent;
  let fixture: ComponentFixture<AddFormComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let googleMapService: GoogleMapService;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormModule ],
      providers: [
        {provide: GoogleMapService, useClass: GoogleMapServiceStub},
        {provide: UserService, useClass: UserServiceStub}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AddFormComponent);
        comp = fixture.componentInstance; // AddFormComponent test instance

        comp.ngOnInit();
        fixture.detectChanges();

        googleMapService = TestBed.get(GoogleMapService);
        userService = TestBed.get(UserService);
      });
  }));

  it('create AddFormComponent', () => {
    expect(fixture.componentInstance instanceof AddFormComponent).toBeTruthy();
  });

  it('display header', fakeAsync(() => {
      de = fixture.debugElement.query(By.css('h2'));
      el = de.nativeElement;
      expect(el.textContent).toContain('Join the Scotch Team!');
  }));

  it('form invalid when empty', fakeAsync(() => {
    expect(comp.addUserForm.valid).toBeFalsy();
  }));

  it('username field validity', () => {
    const username = comp.addUserForm.controls['username'];
    expect(username.valid).toBeFalsy();

    // username field is required
    let errors = username.errors || {};
    expect(errors['required']).toBeTruthy();

    // set username
    username.setValue('test_username');
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('gender field validity', () => {
    const gender = comp.addUserForm.controls['gender'];
    expect(gender.valid).toBeFalsy();

    // gender field is required
    let errors = gender.errors || {};
    expect(errors['required']).toBeTruthy();

    // set gender
    gender.setValue('test_gender');
    errors = gender.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('age field validity', () => {
    const age = comp.addUserForm.controls['age'];
    expect(age.valid).toBeFalsy();

    // age field is required
    let errors = age.errors || {};
    expect(errors['required']).toBeTruthy();

    // set age
    age.setValue(55);
    errors = age.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('favlang field validity', () => {
    const favlang = comp.addUserForm.controls['favlang'];
    expect(favlang.valid).toBeFalsy();

    // favlang field is required
    let errors = favlang.errors || {};
    expect(errors['required']).toBeTruthy();

    // set favlang
    favlang.setValue('favlang');
    errors = favlang.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('longitude field validity', () => {
    const longitude = comp.addUserForm.controls['longitude'];
    expect(longitude.valid).toBeTruthy();

    // longitude field set in constructor
    const errors = longitude.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('latitude field validity', () => {
    const latitude = comp.addUserForm.controls['latitude'];
    expect(latitude.valid).toBeTruthy();

    // latitude field set in constructor
    const errors = latitude.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  xit('save user throws error on invalid form', () => {
    spyOn(userService, 'postUser');
    spyOn(userService, 'getUsers').and.returnValue(new EmptyObservable());

    expect(comp.addUserForm.valid).toBeFalsy();

    comp.addUserForm.controls['username'].setValue('test_username');
    comp.addUserForm.controls['gender'].setValue('test_gender');
    comp.addUserForm.controls['age'].setValue(55);
    comp.addUserForm.controls['favlang'].setValue('test_favlang');

    expect(comp.addUserForm.valid).toBeTruthy();

    comp.saveUser();

    expect(userService.postUser).toHaveBeenCalled();

    expect(comp.addUserForm.valid).toBeFalsy();

  });
});
