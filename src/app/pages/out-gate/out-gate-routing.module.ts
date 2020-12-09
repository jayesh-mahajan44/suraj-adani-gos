import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutGateComponent } from './out-gate.component';


const routes: Routes = [

  {
    path:'',
    component:OutGateComponent,
    data:{
      title:'Out Gate Mapping'
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutGateRoutingModule { }
