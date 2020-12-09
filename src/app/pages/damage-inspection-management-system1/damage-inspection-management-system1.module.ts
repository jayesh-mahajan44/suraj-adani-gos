import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DamageInspectionManagementSystem1RoutingModule } from './damage-inspection-management-system1-routing.module';
import { DamageInspectionManagementSystem1Component } from './damage-inspection-management-system1.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  
  imports: [
    CommonModule,
    DamageInspectionManagementSystem1RoutingModule,
    FormsModule,
    ReactiveFormsModule   ,
  ],
  declarations: [DamageInspectionManagementSystem1Component],
  exports:[DamageInspectionManagementSystem1Component]
})
export class DamageInspectionManagementSystem1Module { }
