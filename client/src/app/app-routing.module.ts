import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUpdateUserComponent } from '../app/add-update-user/add-update-user.component';
import { UserListComponent } from '../app/user-list/user-list.component';
import {UserDetailsComponent} from '../app/user-details/user-details.component';

const routes: Routes = [
  {
    path: 'add-user', component: AddUpdateUserComponent
  },
  {
    path: 'user-list', component: UserListComponent
  },
  {
    path: 'user-details', component: UserDetailsComponent
  },
  { path: '', redirectTo: '/user-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
