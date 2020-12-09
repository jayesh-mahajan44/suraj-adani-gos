import { Routes, RouterModule } from "@angular/router";
import { TransactionSummaryPageComponent } from "./transaction-summary-page.component";
import { NgModule } from "@angular/core";
import { ImportTransactionMappingPageComponent } from "../import-transaction-mapping-page/import-transaction-mapping-page.component";
const routes: Routes = [
  {
    path: '',
     component: TransactionSummaryPageComponent,
    data: {
      title: 'Transaction Summary Page'
    },    
  },
  // {
  //   path:'',component:ImportTransactionMappingPageComponent,
  //   data: {
  //     title: 'export'
  //   }, 
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionSummaryPageRoutingModule { }
