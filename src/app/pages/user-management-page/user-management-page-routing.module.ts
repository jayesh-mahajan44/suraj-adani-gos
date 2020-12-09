import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementPageComponent } from './user-management-page.component';

const routes: Routes = [
  {
    path: '',
     component: UserManagementPageComponent,
    data: {
      title: 'User Management Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementPageRoutingModule { }
