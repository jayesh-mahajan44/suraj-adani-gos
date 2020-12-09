import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DriverMasterPageRoutingModule } from "./driver-master-page-routing.module";
import { FileUploadModule } from 'ng2-file-upload';
import { DriverMasterPageComponent } from './driver-master-page-component';
import { WebCamLogic } from './web-cam-logic';
import { FileUploadLogic } from './file-upload-logic';
import {DriverPageLogic} from './driver-page-logic'
import { WebcamModule } from 'ngx-webcam';
import { DriverMasterService } from './driver-master.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        DriverMasterPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        WebcamModule,
        FileUploadModule,
        FontAwesomeModule
    ],
    declarations: [
        DriverMasterPageComponent
    ],
    providers: [DriverMasterService,WebCamLogic, FileUploadLogic, DriverPageLogic]
})
export class DriverMasterPageModule { }
