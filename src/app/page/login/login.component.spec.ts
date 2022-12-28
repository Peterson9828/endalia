import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersComponent } from '../users/users.component';
import { browser } from 'protractor';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../users/users.module').then((m) => m.UsersModule),
  },
];

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message if wrong email and password', fakeAsync(() => {
    component.loginForm.patchValue({
      email: 'invalid@email.com',
      password: '123',
    });
    component.onSubmit();

    tick();

    expect(component.getLoginError()).toBe('Usuario o contraseña incorrecto');
  }));

  it('should show message because password required and invalid email', () => {
    component.loginForm.controls['email'].markAsTouched();

    expect('Debe insertar algún valor').toContain(
      component.getPasswordErrorMessage(component.loginForm.controls['email'])
    );
    expect('Debe insertar un email válido').toContain(
      component.getEmailErrorMessage(
        new FormControl('invalid', [Validators.required, Validators.email])
      )
    );
  });

  it('should show message because password required', () => {
    component.loginForm.controls['password'].markAsTouched();

    expect('Debe insertar algún valor').toContain(
      component.getPasswordErrorMessage(
        component.loginForm.controls['password']
      )
    );
  });
});
