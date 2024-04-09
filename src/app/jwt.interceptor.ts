import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next
) => {
  let token = inject(AuthService).getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
