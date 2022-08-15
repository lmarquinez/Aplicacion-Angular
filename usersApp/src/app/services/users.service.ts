import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';


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

  /**
   * "Get the last value from the observable returned by the httpClient.get() method."
   * 
   * The httpClient.get() method returns an observable. The lastValueFrom() function takes an observable
   * as an input and returns a promise. The promise resolves to the last value emitted by the observable
   * @param {number} pId - number - the id of the entity to be retrieved
   * @returns A promise of an object of type any.
   */
  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${pId}`))
  }

  /**
   * It creates a new user by sending a POST request to the server
   * @param {User} pUser - User: This is the user object that we want to create.
   * @returns A promise of a user
   */
  create(pUser: User): Promise<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
      }),
    }
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl, pUser, httpOptions))
  }

  /**
   * It returns a promise that resolves to the last value emitted by the observable returned by the
   * httpClient.delete() function
   * @param {number} pId - number - the id of the person to delete
   * @returns A promise of any type.
   */
  delete(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pId}`))
  }

}
