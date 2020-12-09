import { NgModule } from '@angular/core';
import { ExportTransactionMappingPageComponent } from './export-transaction-mapping-page.component';
import { ExportTransactionMappingPageRoutingModule } from './export-transaction-mapping-page-routing.module';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        ExportTransactionMappingPageRoutingModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ExportTransactionMappingPageComponent
    ],
   
    exports:[ExportTransactionMappingPageComponent]
})
export class ExportTransactionMappingPageModule { }