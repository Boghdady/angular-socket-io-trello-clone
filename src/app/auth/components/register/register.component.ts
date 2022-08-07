import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../types/currentUser.interface';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  errorMessage: string | null = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  form = this.fb.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    this.authService
      .register(this.form.value as RegisterRequestInterface)
      .subscribe({
        next: (currentUser: CurrentUserInterface) => {
          this.authService.setToken(currentUser);
          this.authService.setCurrentUser(currentUser);
          this.errorMessage = null;
          this.router.navigateByUrl('/');
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.message;
        },
      });
  }
}
