import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  /* Creating an array of type User. */
  arrUsers: User[] = [];

  /* Setting the default value of the currentPage to 0. */
  currentPage: number = 0;
  /* Setting the default value of the total_pages to 0. */
  total_pages: number = 0

  /**
   * The constructor function is a default function that runs whenever a new instance of a class is
   * created
   * @param {UsersService} usersService - UsersService
   */
  constructor(private usersService: UsersService) { }

  /**
   * The function is called when the component is initialized. It calls the gotoPage() function
   */
  ngOnInit(): void {
    this.gotoPage();
  }

  /**
   * It calls the getAll() function in the usersService, which returns a promise. When the promise is
   * resolved, the function assigns the response to the currentPage, arrUsers, and total_pages
   * variables
   * @param {number} [pPage=1] - number = 1
   */
  async gotoPage(pPage: number = 1): Promise<void> {
    try {
      /* Calling the getAll() function in the usersService, which returns a promise. When the promise is
      resolved, the function assigns the response to the currentPage, arrUsers, and total_pages
      variables */
      let response = await this.usersService.getAll(pPage)

      this.currentPage = response.page;
      this.arrUsers = response.data;
      this.total_pages = response.total_pages;

    } catch (err) {
      console.log(err)
    }
  }
}
