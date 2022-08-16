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
  /* Creating an array of type Number. */
  arrPages: Number[] = [];

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
  async ngOnInit(): Promise<void> {
    /* Calling the gotoPage() function. */
    this.gotoPage();

    let response = await this.usersService.getAll()
    /* Creating an array of numbers from 1 to the total number of pages. */
    for (let index = 0; index < response.total_pages; index++) {
      this.arrPages.push(index + 1);
    }
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

      /* Assigning the value of the page property of the response object to the currentPage variable. */
      this.currentPage = response.page;
      /* Assigning the value of the data property of the response object to the arrUsers variable. */
      this.arrUsers = response.data;
      /* Assigning the value of the total_pages property of the response object to the total_pages variable. */
      this.total_pages = response.total_pages;

    } catch (err) {
      console.log(err)
    }
  }
}
