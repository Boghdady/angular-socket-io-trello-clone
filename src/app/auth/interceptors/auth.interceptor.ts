import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // 1. Get token from local storage
    const token = localStorage.getItem('token');
    // 2. Clone the request to set token
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token ?? '',
      },
    });
    return next.handle(req);
  }
}
