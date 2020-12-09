import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ImportTransactionMappingPageComponent } from "./import-transaction-mapping-page.component";

const routes: Routes = [
    {
      path: '',
       component: ImportTransactionMappingPageComponent,
      data: {
        title: 'In Survey Page'
      },    
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ImportTransactionMappingPageRoutingModule { }