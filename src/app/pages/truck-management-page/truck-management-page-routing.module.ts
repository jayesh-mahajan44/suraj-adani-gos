import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TruckManagementPageComponent } from './truck-management-page.component';

const routes: Routes = [
  {
    path: '',
     component: TruckManagementPageComponent,
    data: {
      title: 'Truck Management Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TruckManagementPageRoutingModule { }
