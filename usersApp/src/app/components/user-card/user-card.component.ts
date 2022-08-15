import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  /* A decorator that allows the user to pass in a user object. */
  @Input() myUser!: User;

  /**
   * The constructor function is a default function that runs whenever a new instance of a class is
   * created
   * @param {UsersService} usersService - UsersService
   */
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  /**
   * The deleteUser function is called when the user clicks on the delete button. It calls the delete
   * function in the users service and passes in the id of the user. If the user is deleted successfully,
   * an alert is displayed. If there is an error, an alert is displayed
   * @param {number | undefined} pId - number | undefined
   */
  async deleteUser(pId: number | undefined) {
    if (pId !== undefined) {
      /* Calling the delete function in the users service and passing in the id of the user. */
      let response = await this.usersService.delete(pId)
      let deleteUser = response;
      if (deleteUser !== null) {
        /* This is a template literal. It allows you to use variables in a string. */
        alert(`The user ${response.first_name} ${response.last_name} has been deleted successfully!`);
      } else {
        alert('There was an error deleting the user.');
      }
    }
  }
}
