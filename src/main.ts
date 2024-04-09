import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { jwtInterceptor } from './app/jwt.interceptor';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
