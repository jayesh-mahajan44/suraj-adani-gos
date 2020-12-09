import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CaptureImageDto } from 'src/app/dto/capture-image-dto';
import { WebcamInitError, WebcamImage } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ImageCaptureServiceService } from './image-capture.service';
import { InSurveyPageService } from '../in-survey-page/in-survey-page.service';
import { Router } from '@angular/router';
import { ExportTransactionUiDto } from 'src/app/dto/export-transaction-ui-dto';
import { ExportImageDtoRequest } from 'src/app/request/export-image-dto-request';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;
@Component({
  selector: 'app-image-capture-component',
  templateUrl: './image-capture-component.component.html',
  styleUrls: ['./image-capture-component.component.scss']
})

export class ImageCaptureComponentComponent implements OnInit {

  public allowCameraSwitch = false;
  selectionDropDownindex: any;
  public dropDownIndexValue: string[] = [];
  public showCapturedImage: Boolean = false;
  validationButton: boolean = true;
  public errors: WebcamInitError[] = [];
  public webcamImage: WebcamImage = null;
  Object = Object;
  exportImageDto: ExportImageDtoRequest = new ExportImageDtoRequest();
  exportTransactionDto: ExportTransactionUiDto = new ExportTransactionUiDto();
  labelValue: string;
  captureImageDtoList: CaptureImageDto[] = []
  imageLabelName: string;

  constructor(private imageCaptureServiceService: ImageCaptureServiceService, private inSurveyPageService: InSurveyPageService, private routes: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // this.inSurveyPageService.exportTransactionId
    //TODO where thing about seal 1 seal 2 and container number
    console.log(this.inSurveyPageService.exportTransactionUiCommonDto.noOfContainer)
    this.imageCaptureServiceService.validDropDownData(this.inSurveyPageService.exportTransactionId).subscribe(data => {
      if (data.status == "OK") {

        this.exportTransactionDto = data.exportTransactionDto;
        this.inSurveyPageService.exportTransactionDto = data.exportTransactionDto;
        console.log(Object.keys(data.exportTransactionDto))
        if (data.exportTransactionDto.containerNo != null) {
          this.captureImageDtoList.push({
            labelName: data.exportTransactionDto.containerNo,
            label: "Container No",
          })
        }

        if (data.exportTransactionDto.containerSeal1 != null) {

          this.captureImageDtoList.push({
            labelName: data.exportTransactionDto.containerSeal1,
            label: "Seal 1",
          })

        }

        if (data.exportTransactionDto.containerSeal2 != null) {

          this.captureImageDtoList.push({
            labelName: data.exportTransactionDto.containerSeal2,
            label: "Seal 2",
          })

        }
        if (data.exportTransactionDto.containerSeal3 != null) {
          this.captureImageDtoList.push({
            labelName: data.exportTransactionDto.containerSeal3,
            label: "Seal 3",
          })
        }

      }

    })
    this.exportImageDto.exportTransactionId = this.inSurveyPageService.truckTransactionUiDto.exportTransactionId1;
    this.exportImageDto.truckTransactionId = this.inSurveyPageService.truckTransactionUiDto.truckTransactionId;
  }

  private trigger: Subject<void> = new Subject<void>();

  public triggerSnapshot(): void {
    this.trigger.next();

  }

  public handleInitError(error: WebcamInitError): void {

    this.errors.push(error);
  }

  ChangingValue(data) {

    this.selectionDropDownindex = data.target.selectedIndex - 1;
    this.labelValue = data.target.value
    console.log(this.captureImageDtoList[data.target.selectedIndex - 1].label)
    this.imageLabelName = this.captureImageDtoList[data.target.selectedIndex - 1].label
  }

  public handleCapturedImage(webcamImage: WebcamImage) {

    this.webcamImage = webcamImage;
    this.showCapturedImage = true;
    this.captureImageDtoList[this.selectionDropDownindex].imageByteArray = webcamImage.imageAsDataUrl
    this.exportImageDto.exportImageRequestDtos[this.selectionDropDownindex] = {
      label: this.labelValue,
      imageByteArray: webcamImage.imageAsBase64,
      labelName: this.imageLabelName
    }
    this.dropDownIndexValue[this.selectionDropDownindex] = this.selectionDropDownindex;
    this.submitButtonValidation();
  }

  submitButtonValidation() {

    if (this.captureImageDtoList.length === this.dropDownIndexValue.length) {

      this.validationButton = false;

    } else {

      this.validationButton = true;

    }

  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  onSubmit() {
    this.spinner.show();
    if (this.inSurveyPageService.exportTransactionUiCommonDto.noOfContainer == 2) {

      if (this.inSurveyPageService.captureImage1) {
        this.inSurveyPageService.exportButtonEnableDisable = false;
      } else {
        this.inSurveyPageService.exportButtonEnableDisable = true;
      }

    } else if (this.inSurveyPageService.exportTransactionUiCommonDto.noOfContainer == 1) {

      this.inSurveyPageService.exportButtonEnableDisable = true
    }
    this.inSurveyPageService.exportTransactionUiCommonDto.captureSubmitButton = true
    this.inSurveyPageService.exportTransactionUiCommonDto = this.inSurveyPageService.exportTransactionUiCommonDto
    console.log(this.inSurveyPageService.exportTransactionUiCommonDto);

    console.log(this.exportImageDto)
    this.imageCaptureServiceService.exportCaptureImages(this.exportImageDto).subscribe(response => {

      if (response.status == "OK") {
        this.spinner.hide();
        alert(response.message);
        this.routes.navigate(['/home/in-survey/export-transaction-mapping'])

      } else {
        alert(response.message);
        this.spinner.hide();
      }
      console.log(this.exportImageDto)
      console.log(response)
    }, err => {

      this.spinner.hide();
    },
      () => {

        this.spinner.hide();
      });

    this.inSurveyPageService.captureImage1 = false

  }

  ngAfterViewChecked() {

    $('img').on('click', function() {
      var image = $(this).attr('src');
      //alert(image);
      $('#myModal').on('show.bs.modal', function() {
        $(".showimage").attr("src", image);
      });
    });

  }

}
