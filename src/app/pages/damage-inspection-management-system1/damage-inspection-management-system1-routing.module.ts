import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DamageInspectionManagementSystem1Component } from './damage-inspection-management-system1.component';


const routes: Routes = [
  {
    path:'',
    component:DamageInspectionManagementSystem1Component,
    data:{
      title:'Damage Inspection mapping1'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DamageInspectionManagementSystem1RoutingModule { }
