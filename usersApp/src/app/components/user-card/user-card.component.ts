import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

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
      if (deleteUser.id) {
        /* This is a template literal. It allows you to use variables in a string. */
        //alert(`The user ${response.first_name} ${response.last_name} has been deleted successfully!`);

        /* A sweet alert. */
        Swal.fire({
          title: 'Are you sure you want to delete this user?',
          icon: 'warning',
          iconColor: '#d9534f',
          width: '30%',
          focusConfirm: true,
          showCancelButton: true,
          confirmButtonColor: '#0275d8',
          cancelButtonColor: '#d9534f',
          confirmButtonText: 'Delete',
          /* A callback function. It is called when the user clicks on the delete button. */
        }).then((result) => {
          /* Checking if the user has confirmed the delete operation. */
          if (result.isConfirmed) {
            /* A sweet alert. */
            Swal.fire({
              text: `The user ${response.first_name} ${response.last_name} has been deleted successfully!`,
              icon: 'success',
              iconColor: '#0275d8',
              width: '50%',
              showConfirmButton: false,
              timer: 2500
            });
          } else {
            /* Displaying an alert to the user. */
            Swal.fire({
              text: 'You have cancel the operation',
              icon: 'error',
              iconColor: '#d9534f',
              width: '50%',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });

      } else {
        /* A sweet alert. */
        Swal.fire({
          text: 'There was an error deleting the user.',
          icon: 'error',
          iconColor: '#d9534f',
          width: '50%',
          showConfirmButton: false,
          timer: 1500
        });

      }
    }
  }
}
