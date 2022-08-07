import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../types/currentUser.interface';
import { LoginRequestInterface } from '../../types/loginRequest.interface';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  error: string | null = null;
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    this.authService.login(this.form.value as LoginRequestInterface).subscribe({
      next: (currentUser: CurrentUserInterface) => {
        this.authService.setToken(currentUser);
        this.authService.setCurrentUser(currentUser);
        console.log('Success login');
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error.message;
      },
    });
  }
}
