import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { AddFormComponent } from '../../forms/addForm.component';
import { FormModule } from '../../forms/form.module';
import { GoogleMapService } from '../../services/googleMapService';
import { UserService } from '../../services/userService';

class GoogleMapServiceStub {
  initialCoords: [number, number] = [0, 0];
  clearMap() {}
  pinCurrentPosition() {}
  getClickedCoords(): Observable<any> {
    return Observable.of('');
  }

  getAutoCoords(): Observable<any> {
    return Observable.of('');
  }
}

class UserServiceStub {
  getUsers(): Observable<any> {
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

        googleMapService = TestBed.get(GoogleMapService);
        userService = TestBed.get(UserService);
      });
  }));

  it('display header', fakeAsync(() => {
      de = fixture.debugElement.query(By.css('h2'));
      el = de.nativeElement;
      expect(el.textContent).toContain('Join the Scotch Team!');
  }));

  it('form invalid when empty', fakeAsync(() => {
    expect(comp.addUserForm.valid).toBeFalsy();
  }));

  it('should have default props', fakeAsync(() => {
    // fixture.detectChanges();
    const username = comp.addUserForm.controls['username'];
    expect(username.valid).toBeFalsy();
  }));
});
