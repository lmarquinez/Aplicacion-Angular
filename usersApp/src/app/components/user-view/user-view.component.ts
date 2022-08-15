import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  /* A non-null assertion operator. It is used to assert that the value of myUser is not null or
  undefined. */
  myUser!: User | any;

  /* Setting the value of the actualTab variable to the string 'aboutme'. */
  actualTab: string = 'aboutme'


  /**
   * We're injecting the UsersService and ActivatedRoute into the constructor function
   * @param {UsersService} usersService - This is the service we created earlier.
   * @param {ActivatedRoute} activatedRoute - This is the object that is handling the route information
   * for this component.
   */
  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    /* Subscribing to the params observable. */
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: number = parseInt(params.iduser)
      /* Calling the getById method in the UsersService. */
      let response = await this.usersService.getById(id)
      this.myUser = response;
    })
  }

  /**
   * It sets the value of the actualTab variable to the value of the tab parameter
   * @param {string} tab - string - The name of the tab to be charged.
   */
  chargeTab(tab: string): void {
    this.actualTab = tab;
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
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              text: `The user ${response.first_name} ${response.last_name} has been deleted successfully!`,
              icon: 'info',
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
        //alert('There was an error deleting the user.');
      }
    }
  }

}
