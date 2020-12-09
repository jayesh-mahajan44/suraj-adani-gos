import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ImageCapturingScreenComponent } from "./image-capturing-screen.component";
import { ImageCapturingScreenRoutingModule } from "./image-capturing-screen-routing.module";
import { WebcamModule } from 'ngx-webcam';
import { WebCamLogic } from '../driver-master-page/web-cam-logic';

@NgModule({
    imports: [
        CommonModule,
        ImageCapturingScreenRoutingModule,
        WebcamModule
    ],
    declarations: [
        ImageCapturingScreenComponent,
    ],
    providers: [WebCamLogic]
})
export class ImageCapturingScreenModule { }