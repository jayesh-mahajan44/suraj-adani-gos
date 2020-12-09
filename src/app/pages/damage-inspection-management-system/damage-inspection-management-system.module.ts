import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DamageInspectionManagementSystemComponent } from './damage-inspection-management-system.component';
import { DamageInspectionManagementSysteRoutmRoutingModule } from './damage-inspection-management-syste-routm-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';



@NgModule({
 
  imports: [
    CommonModule,
    DamageInspectionManagementSysteRoutmRoutingModule ,
    FormsModule,
    ReactiveFormsModule,
    LightboxModule,
    
    
   
    
  ],
  declarations: [DamageInspectionManagementSystemComponent],

  exports:[DamageInspectionManagementSystemComponent]
})
export class DamageInspectionManagementSystemModule { }
