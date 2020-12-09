import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { InGateComponent } from './in-gate.component';

const routes:Routes=[
  {
    path:'',
    component:InGateComponent,
    data:{
      title:'In Gate Mapping'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule],

})
export class InGateRoutingModule { }
