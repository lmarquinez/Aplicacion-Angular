import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  /* Creating a new FormGroup object. */
  userForm: FormGroup;

  /* A variable that is used to determine if the form is being used to create a new user or to edit an
  existing user. */
  type: string = 'New';

  /* Injecting the UsersService into the constructor. */
  constructor(
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    /* Creating a new FormGroup object. */
    this.userForm = new FormGroup({
      /* Creating a new FormControl object. */
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      image: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    /* Subscribing to the params of the activated route. */
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: number = parseInt(params.iduser);
      /* if the id exists, it is a updating form*/
      if (id) {
        /* Setting the type of the form to update. */
        this.type = 'Update'
        /* Getting the user by id. */
        const response = await this.usersService.getById(id);
        const updateUser: User = response;
        /* Creating a new FormGroup object. */
        this.userForm = new FormGroup({
          id: new FormControl(updateUser?.id, []),
          first_name: new FormControl(updateUser?.first_name, [Validators.required, Validators.minLength(3)]),
          last_name: new FormControl(updateUser?.last_name, [Validators.required, Validators.minLength(3)]),
          username: new FormControl(updateUser?.username, [Validators.required]),
          email: new FormControl(updateUser?.email, [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
          image: new FormControl(updateUser?.image, [Validators.required])
        }, [])
      }
    })
  }


  async getDataForm() {
    /* Getting the values from the form. */
    let newUser = this.userForm.value;
    /* Checking if the user has an id, if it does, it means that it is an update, if it doesn't, it means
    that it is a create. */
    if (newUser.id) { /****UPDATE*****/
      let responseUpdate = await this.usersService.update(newUser);
      /* Checking if the response has an id. */
      if (responseUpdate.id) {
        Swal.fire({
          text: `The user ${responseUpdate.first_name} ${responseUpdate.last_name} has been successfully updated!`,
          icon: 'info',
          iconColor: '#0275d8',
          width: '50%',
          showConfirmButton: false,
          timer: 2500
        });
        /* Redirecting the user to the home page. */
        this.router.navigate(['/home']);
      } else {
        /* Showing an alert to the user. */
        Swal.fire({
          text: 'There was an error. Please try again.',
          icon: 'error',
          iconColor: '#d9534f',
          width: '50%',
          showConfirmButton: false,
          timer: 1500
        });
      }

    } else {       /****CREATE*****/

      /* Waiting for the response from the server. */
      let responseCreate = await this.usersService.create(newUser);
      /* Checking if the response has an id. */
      if (responseCreate.id) {
        /* Showing an alert to the user. */
        Swal.fire({
          text: `The user ${responseCreate.first_name} ${responseCreate.last_name} has been successfully created!`,
          icon: 'info',
          iconColor: '#0275d8',
          width: '50%',
          showConfirmButton: false,
          timer: 2500
        });
        /* Redirecting the user to the home page. */
        this.router.navigate(['/home']);
      } else {
        /* Showing an alert to the user. */
        Swal.fire({
          text: 'There was an error. Please try again.',
          icon: 'error',
          iconColor: '#d9534f',
          width: '50%',
          showConfirmButton: false,
          timer: 1500
        });

      }
    }

  }

  /**
   * If the control has the error and has been touched, return true, otherwise return false
   * @param {string} pControlName - The name of the control you want to check.
   * @param {string} pError - The error that we want to check for.
   * @returns A boolean value.
   */
  checkControl(pControlName: string, pError: string): boolean {
    /* Checking if the control has the error and has been touched, if it does, it returns true, otherwise
    it returns false. */
    if (this.userForm.get(pControlName)?.hasError(pError) && this.userForm.get(pControlName)?.touched) {
      return true;
    } else {
      return false;
    }
  }

}
