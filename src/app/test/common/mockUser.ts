import { QueryUserData, UserData } from '../../common/types';

export const MOCK_USER_DATA: UserData = {
  username: 'testUser',
  gender: 'male',
  age: '22',
  favlang: 'javascript',
  location: ['23.4', '45.6'],
  htmlverified: 'true'
};

export const MOCK_USERS: Array<UserData> = [ MOCK_USER_DATA ];

export const MOCK_QUERY_USER_DATA: QueryUserData = {
  latitude: 23.4,
  longitude: 45.6,
  distance: 10,
  male: 'true',
  female: '',
  other: '',
  minAge: '',
  maxAge: '25',
  favlang: 'javascript',
  reqVerified: true
};
