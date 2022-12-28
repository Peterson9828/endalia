import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  textFilter: string = '';
  value: string = '';

  constructor(private router: Router, public userService: UsersService) {}
  ngOnInit() {
    this.getUsers();
  }
  logout() {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/');
  }

  getUsers() {
    this.userService.getList(this.textFilter).then((response: User[]) => {
      response.sort((a, b) => a.lastName.localeCompare(b.lastName));

      this.userService.users = response;
    });
  }

  clear() {
    this.textFilter = '';
    this.getUsers();
  }
}
