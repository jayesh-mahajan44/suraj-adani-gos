import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DamageInspectionManagementSystemComponent } from './damage-inspection-management-system.component';


const routes: Routes = [
  {
    path:'',
    component:DamageInspectionManagementSystemComponent,
    data:{
      title:'Damage Inspection mapping'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DamageInspectionManagementSysteRoutmRoutingModule { }
