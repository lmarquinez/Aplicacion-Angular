import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  /* A variable that is going to be used to make the request to the API. */
  baseUrl: string = 'https://peticiones.online/api/users/';

  /**
   * The constructor function is a special function that is called when a new instance of the class is
   * created
   * @param {HttpClient} httpClient - HttpClient - This is the service that we're going to use to make
   * the HTTP request.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * "Get all the users from the API, and return the last value from the observable."
   * 
   * The first line of the function is the function signature. It's a function that returns a promise of
   * type any. It takes one parameter, pPage, which is a number, and defaults to 1
   * @param {number} [pPage=1] - number = 1
   * @returns A promise of an array of objects.
   */
  getAll(pPage: number = 1): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}?page=${pPage}`))
  }


}