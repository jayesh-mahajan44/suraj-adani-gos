import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TruckTransactionMappingPageComponent } from './truck-transaction-mapping-page.component';
import { FormsModule } from '@angular/forms';
import{TruckTransactionMappingPageRoutingModule} from './truck-transaction-mapping-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TruckTransactionMappingService } from './truck-transaction-mapping.service';
@NgModule({
    imports: [
        CommonModule,
        TruckTransactionMappingPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule
    ],
    declarations: [
        TruckTransactionMappingPageComponent,
    ],
    providers:[TruckTransactionMappingService]
})
export class TruckTransactionMappingPageModule { }
