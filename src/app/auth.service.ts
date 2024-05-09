import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface authResponse {
  token: string;
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

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    this.http
      .post<authResponse>(`${this.url}/auth/login`, {
        username,
        password,
      })
      .subscribe((res) => {
        localStorage.setItem('access_token', res.token);
        this.token.set(res.token);
        this.http
          .get<Profile>(`${this.url}/auth/profile`, {
            headers: {
              Authorization: res.token,
            },
          })
          .subscribe((profile) => {
            console.log(profile, 'yooo');
            this.profile.set(profile);
          });
      });

    this.profile.set(this.getProfile()());

    return 'logged in';
  }
  logout() {
    localStorage.removeItem('access_token');
    this.profile.set(null);
  }
  register(username: string, password: string, email: string, name: string) {
    this.http
      .post<authResponse>(`${this.url}/auth/register`, {
        name,
        username,
        password,
        email,
      })
      .subscribe((res) => {
        this.router.navigate(['/login']);
      });

    // this.profile.set(this.getProfile()());

    return 'registered';
  }

  getProfile() {
    this.http.get<Profile>(`${this.url}/auth/profile`).subscribe((profile) => {
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
