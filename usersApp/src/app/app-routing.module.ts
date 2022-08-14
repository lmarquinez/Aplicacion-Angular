import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';
import { FormComponent } from './components/form/form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';

/* This is the routing configuration for the application. */
const routes: Routes = [
  /* Redirecting the user to the home page if the user enters the root of the application. */
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  /* Telling the router to load the UserListComponent when the user navigates to the home page. */
  { path: 'home', component: UserListComponent },
  /* Telling the router to load the UserViewComponent when the user navigates to the user/:iduser page. */
  { path: 'user/:iduser', component: UserViewComponent },
  /* Telling the router to load the FormComponent when the user navigates to the new-user page. */
  { path: 'new-user', component: FormComponent },
  /* Telling the router to load the FormComponent when the user navigates to the update/:iduser page. */
  { path: 'update/:iduser', component: FormComponent },
  /* This is a wildcard route. It will match any route that is not defined in the application. */
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
