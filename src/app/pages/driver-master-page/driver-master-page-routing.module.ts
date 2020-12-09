
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverMasterPageComponent } from './driver-master-page-component';

const routes: Routes = [
  {
    path: '',
     component: DriverMasterPageComponent,
    data: {
      title: 'Driver Master Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverMasterPageRoutingModule { }
