import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ExportTransactionMappingPageComponent } from "./export-transaction-mapping-page.component";


const routes: Routes = [
  {
    path: '',
    component: ExportTransactionMappingPageComponent,
    data: {
      title: 'Export Transaction Mapping'
    },
  },
  // {
  //   path: 'capture',
  //   component: ImageCapturingScreenComponent,
  //   data: {
  //     title: 'Image Capturing Screen'
  //   },
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportTransactionMappingPageRoutingModule {
}