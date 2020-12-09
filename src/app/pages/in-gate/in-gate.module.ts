import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InGateRoutingModule } from './in-gate-routing.module';
import { InGateComponent } from './in-gate.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  imports: [
    CommonModule,
    InGateRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [InGateComponent],
  exports:[InGateComponent]
})
export class InGateModule { }
