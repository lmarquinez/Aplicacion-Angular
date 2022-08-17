import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';


import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.css']
})
export class UserPopupComponent implements OnInit {

  @Input() myUser!: User;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }


  ngOnInit(): void {
  }

  /**
   * If the user id is not undefined, then delete the user
   * @param {number | undefined} pId - number | undefined
   */
  async deleteUser(pId: number | undefined) {
    if (pId !== undefined) {
      let response = await this.usersService.delete(pId)
      let deleteUser = response;
      if (deleteUser.id) {
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
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              text: `The user ${response.first_name} ${response.last_name} has been deleted successfully!`,
              icon: 'success',
              iconColor: '#0275d8',
              width: '50%',
              showConfirmButton: false,
              timer: 2500
            });
            this.router.navigate(['/home']);
          } else {
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
