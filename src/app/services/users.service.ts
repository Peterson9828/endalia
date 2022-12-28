import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { USERS } from './bd';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: User[] = [];

  constructor() {}

  getList(textFilter: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        let list: User[] = [];

        if (textFilter.length > 0) {
          USERS.map((val: any) => {
            Object.entries(val).forEach(([key, item]) => {
              const value = <any>item;
              if (value.toLowerCase().includes(textFilter.toLowerCase())) {
                list.push(val);
              }
            });
          });
          list = list.filter((obj, index) => {
            return index === list.findIndex((o) => obj.id === o.id);
          });
          resolve(list);
        }

        resolve(USERS);
      }, 1000);
    });
  }
}
