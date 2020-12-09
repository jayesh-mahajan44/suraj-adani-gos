import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
//import {NgxChartsModule} from '@swimlane/ngx-charts';
//import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruckDriverMappingPageRoutingModule } from "./truck-driver-mapping-page-routing.module";

import { TruckDriverMappingPageComponent } from './truck-driver-mapping-page.component';
import { TruckDriverMappingPageService } from './truck-driver-mapping-page.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { ReportPageComponent } from '../report-page/report-page.component';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [
        CommonModule,
        TruckDriverMappingPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule
    ],
    declarations: [       
        TruckDriverMappingPageComponent
    ],
    providers:[TruckDriverMappingPageService]
})
export class TruckDriverMappingPageModule { }
