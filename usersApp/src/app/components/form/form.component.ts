import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

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
    private router: Router
  ) {
    /* Creating a new FormGroup object. */
    this.userForm = new FormGroup({
      /* Creating a new FormControl object. */
      first_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      image: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }


  async getDataForm() {
    /* Getting the values from the form. */
    let newUser = this.userForm.value;
    /* Waiting for the response from the server. */
    let response = await this.usersService.create(newUser);
    /* Checking if the response has an id. */
    if (response.id) {
      /* Showing an alert to the user. */
      alert(`The user ${response.first_name} ${response.last_name} has been successfully created!`);
      /* Redirecting the user to the home page. */
      this.router.navigate(['/home']);
    } else {
      /* Showing an alert to the user. */
      alert("There was an error. Please try again.");
    }

  }

}
