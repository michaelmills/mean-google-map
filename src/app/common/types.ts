export interface UserData {
  username: string;
  gender: string;
  age: string;
  favlang: string;
  location: [string, string];
  htmlverified: string;
}

export interface QueryUserData {
  latitude: number;
  longitude: number;
  distance: number;
  male: string;
  female: string;
  other: string;
  minAge: string;
  maxAge: string;
  favlang: string;
  reqVerified: boolean;
}
