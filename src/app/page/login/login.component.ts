import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  loginError = <string | null>null;

  constructor(
    private router: Router,
    public loginService: LoginService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  onSubmit() {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .then((token: string) => {
        localStorage.setItem('access_token', token);
        this.router.navigateByUrl('/users');
      })
      .catch((error) => {
        this.loginError = error;
      });
  }

  getEmailErrorMessage(email: any) {
    if (email.hasError('required')) {
      return 'Debe insertar algún valor';
    }

    return email.hasError('email') ? 'Debe insertar un email válido' : '';
  }

  getPasswordErrorMessage(password: any) {
    return password.hasError('required') ? 'Debe insertar algún valor' : '';
  }

  getLoginError() {
    return this.loginError ? this.loginError : '';
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['valid@email.com', [Validators.required, Validators.email]],
      password: ['123', [Validators.required]],
    });
  }
}
