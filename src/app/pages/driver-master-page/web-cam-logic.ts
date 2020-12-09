import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs'
import { Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { UtilityService } from 'src/app/shared/utility/utility.service';
import { DriverPageLogic } from './driver-page-logic'

@Injectable({
  providedIn: 'root'
})
export class WebCamLogic implements OnInit {
  public allowCameraSwitch = true;
  selectedOrCapturedDriverLicenseImageURL: string;

  public showCapturedImage: Boolean = false;

  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  //private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  // public uploader: FileUploader = new FileUploader({ itemAlias: 'photo', allowedMimeType: ['image/jpeg', 'image/png'], allowedFileType: ["image"] });//allowedFileType: ["pdf", "jpg"]//allowedMimeType:['image/png', 'image/gif', 'video/mp4', 'image/jpeg']//, allowedMimeType: ['application/pdf', 'jpeg'] //allowedMimeType:["jpg","png"]});

  constructor(private utilityService: UtilityService, private driverPageLogic: DriverPageLogic) { }
  ngOnInit() {
  
  }
  public triggerSnapshot(): void {
    this.trigger.next();
  }


  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleCapturedImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.showCapturedImage = true;
    this.selectedOrCapturedDriverLicenseImageURL = webcamImage.imageAsDataUrl;
    let image = this.utilityService.convertImageBase64StringToImageFile(this.webcamImage.imageAsBase64);
    this.driverPageLogic.formData = new FormData();
    this.driverPageLogic.formData.append("file", image, image.name);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}