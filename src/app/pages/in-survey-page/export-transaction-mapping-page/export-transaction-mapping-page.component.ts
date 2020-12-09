import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionSummaryPageService } from '../transaction-summary-page/transaction-summary-page.service';
import { Router } from '@angular/router';
import { InSurveyPageService } from '../in-survey-page.service';
import { ExportTransactionRequestDto } from 'src/app/dto/export-mapping/export-transaction-request-dto';
import { ExportTransactionMappingPageService } from './export-transaction-mapping-page.service';
import { ExportDpdResponse } from 'src/app/response/export-mapping-response/export-dpd-response';
declare var $: any;

@Component({
  selector: 'app-export-transaction-mapping-page',
  templateUrl: './export-transaction-mapping-page.component.html',
  styleUrls: ['./export-transaction-mapping-page.component.scss']
})
export class ExportTransactionMappingPageComponent implements OnInit {
  exportContainerNo1: any;
  exportContainerNo2: any;
  exportTransactionRequestDto: ExportDpdResponse = new ExportDpdResponse();
  exportTransactionId2: number;
  exportTransactionId1: number;
  disableBUtton: boolean = false;
  captureImage2: string;
  secondOfConatinerValue: number;
  validationIcon: boolean;
  validationIcon2: boolean;
  validationSpinner: boolean;
  captureImageButton1: boolean = false;
  constructor(private formBuilder: FormBuilder, private trucksummary: TransactionSummaryPageService, private routes: Router, private inSurveyPageService: InSurveyPageService, private exportTransactionMappingPageService: ExportTransactionMappingPageService) {


    let containerTextRegex = /^[A-Z ]{4}[0-9]{7}$/;
    let pinTextRegex = /^[0-9]{4}$/;
    this.exportFormGroup = this.formBuilder.group(
      {
        containerCountRadioBtn: ['', [Validators.required]],
        pin1: ['', [Validators.required, Validators.pattern(pinTextRegex)]],
        pin2: ['', [Validators.required, Validators.pattern(pinTextRegex)]],
        containerNo1: ['', [Validators.required, Validators.pattern(containerTextRegex)]],
        containerNo2: ['', [Validators.required, Validators.pattern(containerTextRegex)]],
        imagecapturebtn: ['']
      }
    )

  }

  exportFormGroup: FormGroup;

  ngOnInit() {
    //this.containerNumber()
    this.exportFormControls.containerCountRadioBtn.setValue(2);
    this.exportTransactionId2 = this.inSurveyPageService.truckTransactionUiDto.exportTransactionId2;
    this.secondOfConatinerValue = this.inSurveyPageService.exportTransactionUiCommonDto.noOfContainer;

    let that = this;
    $(document).ready(function($) {
      that.hideTooltip('pin1Icon');
      that.hideTooltip('pin2Icon');
      that.hideTooltip('containerNo1Icon');
      that.hideTooltip('containerNo2Icon');
    });
    if (this.inSurveyPageService.editMode || this.inSurveyPageService.exportTransactionUiCommonDto.captureSubmitButton) {
      this.exportFormControls.containerCountRadioBtn.setValue(this.inSurveyPageService.exportTransactionUiCommonDto.noOfContainer)
      console.log(this.inSurveyPageService.exportTransactionUiCommonDto)
      if (this.exportFormControls.containerCountRadioBtn.value == 1) {

        this.exportFormGroup.patchValue({
          containerCountRadioBtn: this.inSurveyPageService.exportTransactionUiCommonDto.noOfContainer,
          containerNo1: this.inSurveyPageService.exportTransactionUiCommonDto.container1,
          pin1: this.inSurveyPageService.exportTransactionUiCommonDto.pin1
        })
        this.containerCountRadioBtnChangedEvent();
        if (this.inSurveyPageService.exportTransactionUiCommonDto.pin1 == "") {
          this.exportFormControls.pin1.disable();
        } else {
          if (this.inSurveyPageService.exportTransactionUiCommonDto.container1 == "") {
            this.exportFormControls.containerNo1.disable();
          }
        }
      } else {
        if (this.exportFormControls.containerCountRadioBtn.value == 2) {

          this.exportFormGroup.patchValue({
            containerCountRadioBtn: this.inSurveyPageService.exportTransactionUiCommonDto.noOfContainer,
            containerNo1: this.inSurveyPageService.exportTransactionUiCommonDto.container1,
            pin1: this.inSurveyPageService.exportTransactionUiCommonDto.pin1,
            containerNo2: this.inSurveyPageService.exportTransactionUiCommonDto.container2,
            pin2: this.inSurveyPageService.exportTransactionUiCommonDto.pin2
          });
          this.containerCountRadioBtnChangedEvent();
          if (this.inSurveyPageService.exportTransactionUiCommonDto.pin1 == "" || this.inSurveyPageService.exportTransactionUiCommonDto.pin2 == "") {
            this.exportFormControls.pin1.disable();
            this.exportFormControls.pin2.disable();
          } else {
            if (this.inSurveyPageService.exportTransactionUiCommonDto.container1 == "" || this.inSurveyPageService.exportTransactionUiCommonDto.container2 == "") {
              this.exportFormControls.containerNo1.disable();
              this.exportFormControls.containerNo2.disable();
            }
          }
        }
      }
    }
    this.disableBUtton = this.inSurveyPageService.exportButtonEnableDisable;

  }

  get exportFormControls() { return this.exportFormGroup.controls; }

  redirectToCaptureImage1Page() {
    this.inSurveyPageService.exportTransactionId = this.exportTransactionId1;
    this.inSurveyPageService.captureImage1 = true;
    this.inSurveyPageService.exportTransactionUiCommonDto.noOfContainer = this.exportFormControls.containerCountRadioBtn.value;
    this.inSurveyPageService.exportTransactionUiCommonDto.container1 = this.exportFormControls.containerNo1.value;
    this.inSurveyPageService.exportTransactionUiCommonDto.pin1 = this.exportFormControls.pin1.value;
    this.inSurveyPageService.exportTransactionUiCommonDto.container2 = this.exportFormControls.containerNo2.value;
    this.inSurveyPageService.exportTransactionUiCommonDto.pin2 = this.exportFormControls.pin2.value;
    this.routes.navigate(['/home/in-survey/images-capture']);
  }
  redirectToCaptureImage2Page() {

    this.inSurveyPageService.exportTransactionId = this.exportTransactionId2;
    this.inSurveyPageService.exportTransactionUiDto.noOfContainer = this.secondOfConatinerValue;
    this.inSurveyPageService.exportTransactionUiCommonDto.noOfContainer = this.exportFormControls.containerCountRadioBtn.value;
    this.inSurveyPageService.exportTransactionUiCommonDto.container1 = this.exportFormControls.containerNo1.value;
    this.inSurveyPageService.exportTransactionUiCommonDto.pin1 = this.exportFormControls.pin1.value;
    this.inSurveyPageService.exportTransactionUiCommonDto.container2 = this.exportFormControls.containerNo2.value;
    this.inSurveyPageService.exportTransactionUiCommonDto.pin2 = this.exportFormControls.pin2.value;
    this.routes.navigate(['/home/in-survey/images-capture'])
  }

  showTooltip(controlId: String, message: String) {
    $("#" + controlId).show();
    $("#" + controlId).tooltip("dispose");
    // $(controlId).tooltip({ title: message, trigger: "hover focus" });
    $("#" + controlId).tooltip({ title: message, trigger: "hover" });
    $("#" + controlId).tooltip('show');

  }

  hideTooltip(controlId: String) {
    $("#" + controlId).tooltip("dispose");
    $("#" + controlId).hide();
  }
  removeWhitespacesFromString(valueToCheck: String) {
    return valueToCheck.replace(/\s*/g, "");
  }

  container1:boolean = true;
  container2:boolean = false;


  containerCountRadioBtnChangedEvent() {

    if (this.exportFormControls.containerCountRadioBtn.value == 1) {

      this.container1 = true;
      this.container2 = false;
      this.exportFormControls.containerNo2.setValue("");
      this.exportFormControls.containerNo2.disable();
      this.hideTooltip("containerNo2Icon");
      this.exportFormControls.pin2.setValue("");
      this.exportFormControls.pin2.disable();
      this.hideTooltip("pin2Icon");
    }
    else {
      this.container1 = true;
      this.container2 = true;
      this.exportFormControls.containerNo2.enable();
      this.exportFormControls.pin2.enable();
    }
  }

  validatePin1() {
    if (this.removeWhitespacesFromString(this.exportFormControls.pin1.value).length > 0) {
      this.exportFormControls.containerNo1.setValue("");
      this.exportFormControls.containerNo1.disable();
      this.hideTooltip("containerNo1Icon");
      if (this.exportFormControls.pin1.errors) {
        let pinToolTipMessage: String = "Invalid";
        if (this.exportFormControls.pin1.hasError('required')) {
          // pinToolTipMessage = "Container No code is mandatory";
        }
        else if (this.exportFormControls.pin1.hasError('pattern')) {
          // pinToolTipMessage = "Invalid container no";
        }
        this.showTooltip('pin1Icon', pinToolTipMessage);
      }
      else {
        this.hideTooltip('pin1Icon');
      }
    }
    else {
      // let containerNoToolTipMessage = "Container No code is mandatory";
      let pinToolTipMessage = "Invalid";
      this.showTooltip('pin1Icon', pinToolTipMessage);
      this.exportFormControls.containerNo1.enable();
    }
  }
  onPin1TextChanged() {
    this.validatePin1();
  }
  onPin1LostFocus() {
    this.validatePin1();
  }

  exportInputAutoFocusValidation() {

    if (this.exportFormControls.containerCountRadioBtn.value == 1) {
      if (this.exportFormControls.containerNo1.valid) {
        setTimeout(() => {
          if (confirm("Are you sure to validate this Container Number ")) {
            this.validationContainerToBackend();
          }
        }, 100);
      }
    } else
      if (this.exportFormControls.containerCountRadioBtn.value == 2)
      {
      if (this.exportFormControls.containerNo1.valid && this.exportFormControls.containerNo2.valid) {

        if (this.exportFormControls.containerNo1.valid) {
          setTimeout(() => {
            if (confirm("Are you sure to validate this Container Number ")) {
              this.validationContainerToBackend();
            }
          }, 100);
        }
      }
    }

  }

  validateContainerNo1() {
    if (this.removeWhitespacesFromString(this.exportFormControls.containerNo1.value).length > 0) {
      this.exportFormControls.pin1.setValue("");
      this.exportFormControls.pin1.disable();
      this.hideTooltip("pin1Icon");
      if (this.exportFormControls.containerNo1.errors) {
        let containerNoToolTipMessage: String = "Invalid";
        if (this.exportFormControls.containerNo1.hasError('required')) {
          // containerNoToolTipMessage = "Container No code is mandatory";
        }
        else if (this.exportFormControls.containerNo1.hasError('pattern')) {
          // containerNoToolTipMessage = "Invalid container no";
        }
        this.showTooltip('containerNo1Icon', containerNoToolTipMessage);
        this.validationIcon = false;
        this.validationSpinner = false;
      }
      else {

        this.hideTooltip('containerNo1Icon');

      }
    }
    else {
      // let containerNoToolTipMessage = "Container No code is mandatory";
      this.validationIcon = false;
      this.validationSpinner = false;
      let containerNoToolTipMessage = "Invalid";
      this.showTooltip('containerNo1Icon', containerNoToolTipMessage);
      this.exportFormControls.pin1.enable();
    }
  }

  onContainerNo1LostFocus() {
    this.validateContainerNo1();
    // this.validationContainerToBackend()
  }
  onContainerNo1TextChanged() {
    this.validateContainerNo1();
    this.exportInputAutoFocusValidation();
    if (this.exportFormControls.containerCountRadioBtn.value == 2) {
      if (this.exportFormControls.containerNo1.valid) {
        setTimeout(() => {
          alert("Enter The Next Container number");
        }, 100);
      }

    }

  }
  onContainerNo2TextChanged() {
    this.validateContainerNo2();
    this.exportInputAutoFocusValidation();
  }

  validatePin2() {
    if (this.removeWhitespacesFromString(this.exportFormControls.pin2.value).length > 0) {
      this.exportFormControls.containerNo2.setValue("");
      this.exportFormControls.containerNo2.disable();
      this.hideTooltip("containerNo2Icon");
      if (this.exportFormControls.pin2.errors) {
        let pinToolTipMessage: String = "Invalid";
        if (this.exportFormControls.pin2.hasError('required')) {
          // pinToolTipMessage = "Container No code is mandatory";
        }
        else if (this.exportFormControls.pin2.hasError('pattern')) {
          // pinToolTipMessage = "Invalid container no";
        }
        this.showTooltip('pin2Icon', pinToolTipMessage);
      }
      else {
        this.hideTooltip('pin2Icon');
      }
    }
    else {
      let pinToolTipMessage = "Invalid";
      this.showTooltip('pin2Icon', pinToolTipMessage);
      this.exportFormControls.containerNo2.enable();
    }
  }
  onPin2TextChanged() {
    this.validatePin2();
  }
  onPin2LostFocus() {
    this.validatePin2();
  }

  validateContainerNo2() {
    if (this.removeWhitespacesFromString(this.exportFormControls.containerNo2.value).length > 0) {
      this.exportFormControls.pin2.setValue("");
      this.exportFormControls.pin2.disable();
      this.hideTooltip("pin2Icon");
      if (this.exportFormControls.containerNo2.errors) {
        let containerNoToolTipMessage: String = "Invalid";
        if (this.exportFormControls.containerNo2.hasError('required')) {
          // containerNoToolTipMessage = "Container No code is mandatory";
        }
        else if (this.exportFormControls.containerNo2.hasError('pattern')) {
          // containerNoToolTipMessage = "Invalid container no";
        }
        this.showTooltip('containerNo2Icon', containerNoToolTipMessage);
        this.validationIcon2 = false;
      }
      else {
        this.hideTooltip('containerNo2Icon');
      }
    }
    else {

      this.validationIcon2 = false;
      let containerNoToolTipMessage = "Invalid";
      this.showTooltip('containerNo2Icon', containerNoToolTipMessage);

      this.exportFormControls.pin2.enable();
    }
  }

  onContainerNo2LostFocus() {
    this.validateContainerNo2();
  }

  validationContainerToBackend() {
 
    this.exportTransactionRequestDto.truckId = this.inSurveyPageService.truckId;
    if (this.exportFormControls.containerCountRadioBtn.value == 1) {

      this.exportTransactionRequestDto.exportDpdRequestDtos.push({

        containerNo: this.exportFormControls.containerNo1.value,
        transactionPin: this.exportFormControls.pin1.value,

      })
      this.exportDataPostToServer();

    } else {


      if (this.exportFormControls.containerCountRadioBtn.value == 2) {

        this.exportTransactionRequestDto.exportDpdRequestDtos.push({

          containerNo: this.exportFormControls.containerNo1.value,
          transactionPin: this.exportFormControls.pin1.value,

        })

        this.exportTransactionRequestDto.exportDpdRequestDtos.push({

          containerNo: this.exportFormControls.containerNo2.value,
          transactionPin: this.exportFormControls.pin2.value,

        })
        this.exportDataPostToServer();

      }

    }
    
  }

  exportDataPostToServer() {

    this.validationSpinner = true;
    this.exportTransactionMappingPageService.ValidateDetails(this.exportTransactionRequestDto).subscribe(response => {
     
      if (response.status == "OK") {

        this.inSurveyPageService.truckTransactionUiDto = response.truckTransactionUiDto;
        this.exportTransactionId1 = response.truckTransactionUiDto.exportTransactionId1;
        this.exportTransactionId2 = response.truckTransactionUiDto.exportTransactionId2;
        console.log(this.inSurveyPageService.truckTransactionUiDto)
        if (this.exportFormControls.containerCountRadioBtn.value == 1) {
          this.validationIcon = true;
          this.validationIcon2 = false;
        } else {
          if (this.exportFormControls.containerCountRadioBtn.value == 2) {
            this.validationIcon = true;
            this.validationIcon2 = true;
          }
        }
        //this.validationIcon = true;
        this.validationSpinner = false;
        console.log("post response" + response)
        this.captureImageButton1 = true;
        alert(response.message);

      } else {
        this.validationSpinner = false;
        alert("Error: " + response.message);
        console.log("error response" + response)
        this.captureImageButton1 = false;
      }

    }, err => {

      this.validationSpinner = false;
      console.log("In error callback of subscribe call");
      this.captureImageButton1 = false;

    },
      () => {
        //check response from server, if success then redirect to summarry page else show message to user
        console.log("In completion callback of subscribe call");
        this.validationSpinner = false;
        //this.captureImageButton1 = true;
      });

  }

  onExportTransactionSubmit() {
    this.inSurveyPageService.exportTransactionUiCommonDto.captureSubmitButton = false;
    this.inSurveyPageService.exportTransactionUiCommonDto.container1 = this.exportFormControls.containerNo1.value;
    this.inSurveyPageService.exportTransactionUiCommonDto.container2 = this.exportFormControls.containerNo2.value;
    this.inSurveyPageService.editMode = false;
    this.inSurveyPageService.exportTransactionCheckbox = true;
    this.routes.navigate(['/home/in-survey/transaction-summary-page'])

    if (this.inSurveyPageService.componentToComponentRedirect) {

      this.routes.navigate(['/home/in-survey/import-transaction-mapping']);
      this.inSurveyPageService.componentToComponentRedirect = false;

    }

  }

}
