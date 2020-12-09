import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TruckManagementPageRoutingModule } from "./truck-management-page-routing.module";
import { TruckManagementPageComponent } from './truck-management-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TruckMasterService } from './truck-master.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        TruckManagementPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        FontAwesomeModule
    ],
    declarations: [       
        TruckManagementPageComponent
    ],
    providers:[
        TruckMasterService
    ]
})
export class TruckManagementPageModule { }
