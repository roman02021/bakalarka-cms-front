import { Component, OnInit, inject } from '@angular/core';
import { CollectionService } from './collection/collection.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface User {
  username: string;
  isLoggedIn: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService],
})
export class AppComponent implements OnInit {
  constructor(private collectionService: CollectionService) {
    // this.user = this.authService.user();
    this.profile = this.authService.getProfile();
  }
  private authService = inject(AuthService);

  title = 'zemanik-cms';

  profile;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.profile = this.authService.getProfile();
  }
}
