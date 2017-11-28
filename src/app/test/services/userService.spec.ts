import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserData } from '../../common/types';
import { UserService } from '../../services/userService';
import { MOCK_QUERY_USER_DATA, MOCK_USER_DATA, MOCK_USERS } from '../common/mockUser';

describe('UserService', () => {
  let userService: UserService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ UserService ]
    });

    userService = TestBed.get(UserService);
    http = TestBed.get(HttpTestingController);
  });

  it('list all users', () => {
    userService.getUsers().subscribe((users: Array<UserData>) => {
      expect(users).toEqual(MOCK_USERS);
    });

    const testRequest: TestRequest = http.expectOne('/api/users');

    testRequest.flush(MOCK_USERS);
    expect(testRequest.request.method).toEqual('GET');

    http.verify();
  });

  it('post user', () => {
    userService.postUser(MOCK_USER_DATA).subscribe((user: UserData) => {
      expect(user).toEqual(MOCK_USER_DATA);
    });

    const testRequest: TestRequest = http.expectOne('/api/users');

    testRequest.flush(MOCK_USER_DATA);
    expect(testRequest.request.method).toEqual('POST');

    http.verify();
  });

  it('query user data', () => {
    userService.queryUsers(MOCK_QUERY_USER_DATA).subscribe((userData: Array<UserData>) => {
      expect(userData).toEqual(MOCK_USERS);
    });

    const testRequest: TestRequest = http.expectOne('/api/query');

    testRequest.flush(MOCK_USERS);
    expect(testRequest.request.method).toEqual('POST');

    http.verify();
  });
});
