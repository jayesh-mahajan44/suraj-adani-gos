import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionSummaryPageRoutingModule } from './transaction-summary-page-routing.module';
import { TransactionSummaryPageComponent } from './transaction-summary-page.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionSummaryPageService } from './transaction-summary-page.service';
import { ImportTransactionMappingPageComponent } from '../import-transaction-mapping-page/import-transaction-mapping-page.component';
import { ImportTransactionMappingPageModule } from '../import-transaction-mapping-page/import-transaction-mapping-page.module';
import { Routes } from '@angular/router';
const summaryRoutes: Routes = [
  {
    path: 'export', component: ImportTransactionMappingPageComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    TransactionSummaryPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ImportTransactionMappingPageModule
  ],
  declarations: [
    TransactionSummaryPageComponent,



  ],

  providers: [TransactionSummaryPageService]
})

export class TransactionSummaryPageModule { }
