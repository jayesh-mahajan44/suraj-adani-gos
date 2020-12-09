import { Routes, RouterModule } from "@angular/router";
import { TruckTransactionMappingPageComponent } from "./truck-transaction-mapping-page.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
      path: '',
       component: TruckTransactionMappingPageComponent,
      data: {
        title: 'In Survey Page'
      },    
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class TruckTransactionMappingPageRoutingModule { }