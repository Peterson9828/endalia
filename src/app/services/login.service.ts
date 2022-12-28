import { Injectable } from '@angular/core';
import { USER } from './bd';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  login(email: string | null, password: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      if (USER.email === email && USER.password === password) {
        resolve('token');
      } else {
        reject('Usuario o contraseña incorrecto');
      }
    });
  }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ? true : false;
  }
}
