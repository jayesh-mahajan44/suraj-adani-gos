import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutGateComponent } from './out-gate.component';
import { OutGateRoutingModule } from './out-gate-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [ OutGateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OutGateRoutingModule,
    FontAwesomeModule,
  ]
})
export class OutGateModule { }
