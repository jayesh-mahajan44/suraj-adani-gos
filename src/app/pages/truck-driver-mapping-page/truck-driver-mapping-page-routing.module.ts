import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TruckDriverMappingPageComponent } from './truck-driver-mapping-page.component';
const routes: Routes = [
  {
    path: '',
     component: TruckDriverMappingPageComponent,
    data: {
      title: 'Truck-Driver Mapping Page'
    },    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TruckDriverMappingPageRoutingModule { }
