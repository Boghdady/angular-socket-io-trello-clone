import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { CurrentUserInterface } from '../types/currentUser.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';

@Injectable()
export class AuthService {
  // define stream - we can access this stream from anywhere inside our application
  currentUser$ = new BehaviorSubject<CurrentUserInterface | null | undefined>(
    undefined
  );

  // transform currentUser$ stream to true or false depend on if is null or have user value
  isLoggedIn$ = this.currentUser$.pipe(
    filter((currentUser) => currentUser !== undefined),
    map(Boolean)
  );

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/currentUser';
    return this.http.get<CurrentUserInterface>(url);
  }

  setCurrentUser(currentUser: CurrentUserInterface | null): void {
    this.currentUser$.next(currentUser);
  }

  register(
    registerRequest: RegisterRequestInterface
  ): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/register';
    return this.http.post<CurrentUserInterface>(url, registerRequest);
  }

  setToken(currentUser: CurrentUserInterface): void {
    localStorage.setItem('token', currentUser.token);
  }

  login(loginRequest: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login';
    return this.http.post<CurrentUserInterface>(url, loginRequest);
  }
}
