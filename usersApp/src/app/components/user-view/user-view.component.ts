import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';


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
    private activatedRoute: ActivatedRoute
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

}
