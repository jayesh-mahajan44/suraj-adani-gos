import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import{ImportTransactionMappingPageRoutingModule} from './import-transaction-mapping-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImportTransactionMappingPageComponent } from './import-transaction-mapping-page.component';
import { ImportTransactionMappingService } from './import-transaction-mapping.service';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
    imports: [
        CommonModule,
        ImportTransactionMappingPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        NgxSpinnerModule
    ],
    declarations: [
        ImportTransactionMappingPageComponent,
    ],
    providers:[ImportTransactionMappingService],
    //exports:[ImportTransactionMappingPageComponent]
})
export class ImportTransactionMappingPageModule { }
