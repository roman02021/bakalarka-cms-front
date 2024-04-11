import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

interface authResponse {
  access_token: string;
}
interface User {
  username: string;
  isLoggedIn: boolean;
}

export interface Profile {
  id: number;
  username: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.backendUrl;
  token = signal<string>('');

  user = signal<User | null>(null);
  profile = signal<Profile | null>(null);

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log('yo', username, password);
    this.http
      .post<authResponse>(`${this.url}auth/login`, {
        username,
        password,
      })
      .subscribe((res) => {
        localStorage.setItem('access_token', res.access_token);
        this.token.set(res.access_token);
        this.http
          .get<Profile>(`${this.url}auth/profile`, {
            headers: {
              Authorization: res.access_token,
            },
          })
          .subscribe((profile) => {
            console.log(profile, 'yooo');
            this.profile.set(profile);
          });
      });

    const test2 = localStorage.getItem('access_token');

    this.profile.set(this.getProfile()());

    return 'logged in';
  }
  logout() {
    localStorage.removeItem('access_token');
    this.profile.set(null);
  }

  getProfile() {
    this.http.get<Profile>(`${this.url}auth/profile`).subscribe((profile) => {
      console.log(profile, 'yooo');
      this.profile.set(profile);
    });
    return this.profile;
  }

  getUser() {
    return this.user;
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
}
