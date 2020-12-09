import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebCamLogic } from '../driver-master-page/web-cam-logic';
import { ImageCaptureRoutingModule } from './image-capture-routing.module';
import { ImageCaptureComponentComponent } from './image-capture-component.component';
import { WebcamModule } from 'ngx-webcam';
import { NgxSpinnerModule } from 'ngx-spinner';




@NgModule({
  imports: [
    CommonModule,
    ImageCaptureRoutingModule,
    WebcamModule,
    NgxSpinnerModule
],
declarations: [
  ImageCaptureComponentComponent 
],
providers: [WebCamLogic]
})
export class ImageCaptureModuleModule { }
