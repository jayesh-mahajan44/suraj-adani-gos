import { Component, OnInit } from '@angular/core';
import { CaptureImageDto } from 'src/app/dto/capture-image-dto';
import { WebcamInitError, WebcamImage } from 'ngx-webcam';
import { UtilityService } from 'src/app/shared/utility/utility.service';
import { Observable, Subject } from 'rxjs';
import { ViewChild } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-image-capturing-screen',
  templateUrl: './image-capturing-screen.component.html',
  styleUrls: ['./image-capturing-screen.component.scss']
})
export class ImageCapturingScreenComponent implements OnInit {
  constructor(private utilityService:UtilityService) {
    
   }
   public photos : any = []; 
   captureImage
 // captureImageDtoList: CaptureImageDto[] = [];
  captureImageDtoList: CaptureImageDto[] = [
    // {
    //   "name": "Cont No:",
    //   "id": 1,
    //   "value": "BAXU123456722G1",
    //   "images": null
    // },
    // {
    //   "name": "Seal 1 :",
    //   "id": 2,
    //   "value": "12034987612367899876",
    //   "images": null
    // },
    // {
    //   "name": "Seal 2 :",
    //   "id": 3, 
    //   "value":"3422",
    //   "images": null
    // },
    // {
    //   "name": "Seal 3 :",
    //   "id": 4,
    //   "value":  "7883",
    //   "images": null
    // }
   
  ]
 


  ngOnInit() {
   
   

    // let captureImageDto = new CaptureImageDto("Cont No:", "BAXU123456722G1");
    // this.captureImageDtoList.push(captureImageDto);
    // captureImageDto = new CaptureImageDto("Seal 1 :", "12034987612367899876");
    // this.captureImageDtoList.push(captureImageDto);
    // captureImageDto = new CaptureImageDto("Seal 2 :", "3422");
    // this.captureImageDtoList.push(captureImageDto);
    // captureImageDto = new CaptureImageDto("Seal 3 :", "7883");
    // this.captureImageDtoList.push(captureImageDto);
  }
 

  onViewButtonClick(event: any,index:any) {
    let imageName = event.target.getAttribute("data-image-name");
    

  }
  onCaptureButtonClick(event: any) {
    let imageName = event.target.getAttribute("data-image-name");
  }





  public allowCameraSwitch = false;
  public selectedOrCapturedDriverLicenseImageURL:string[]=[] ;

  public showCapturedImage: Boolean = false;

  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  // private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  // public uploader: FileUploader = new FileUploader({ itemAlias: 'photo', allowedMimeType: ['image/jpeg', 'image/png'], allowedFileType: ["image"] });//allowedFileType: ["pdf", "jpg"]//allowedMimeType:['image/png', 'image/gif', 'video/mp4', 'image/jpeg']//, allowedMimeType: ['application/pdf', 'jpeg'] //allowedMimeType:["jpg","png"]});
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId

  public triggerSnapshot(): void {
    this.trigger.next();
    
  }


  public handleInitError(error: WebcamInitError): void {
   // console.log(error);
    this.errors.push(error);
  }

  public handleCapturedImage(webcamImage: WebcamImage,indexId:number) {
    console.info('received webcam image', webcamImage);
    console.log(webcamImage.imageAsDataUrl)
    //this.captureImageDtoList[indexId].images =webcamImage.imageAsDataUrl
    console.log(indexId)
   // this.photos.push(webcamImage.imageAsDataUrl);
   // this.photos.reverse();
    //this.webcamImage = webcamImage;
    this.showCapturedImage = true;
    // this.captureImageDtoList.images = webcamImage.imageAsDataUrl
    // this.captureImageDtoList[index] = captureImageDto
    // console.log(this.captureImageDtoList[index].images = webcamImage.imageAsDataUrl)


    let image = this.utilityService.convertImageBase64StringToImageFile(this.webcamImage.imageAsBase64);
    // this.driverPageLogic.formData = new FormData();
    // this.driverPageLogic.formData.append("file", image, image.name);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  




  
}
