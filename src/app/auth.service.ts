import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface authResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/';
  token: string = '';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log('yo', username, password);
    this.http
      .post<authResponse>(`${this.url}auth/login`, {
        username,
        password,
      })
      .subscribe((res) => {
        localStorage.setItem('id_token', res.access_token);
      });

    console.log(this.token);
    return 'logged in';
  }
}
