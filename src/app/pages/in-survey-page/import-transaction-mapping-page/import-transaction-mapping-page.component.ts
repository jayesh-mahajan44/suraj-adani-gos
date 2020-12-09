import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ImportTransactionMappingService } from './import-transaction-mapping.service';
import { ImportTransactionValidationUiDto } from 'src/app/dto/import-transaction-validation-ui-dto';
import { ImportTransactionUiApiResponse } from 'src/app/response/import-transaction-ui-api-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransactionSummaryPageService } from '../transaction-summary-page/transaction-summary-page.service';
import { faEject } from '@fortawesome/free-solid-svg-icons';
import { ImportDpdRequest } from 'src/app/request/import-dpd-request';
import { InSurveyPageService } from '../in-survey-page.service';
import { ImportTransactionBestPickRequestDto } from 'src/app/dto/import-mapping/import-transaction-best-pick-request-dto';
import { Router } from '@angular/router';
import { TruckTransactionUiDto } from 'src/app/dto/truck-transaction-ui-dto';

declare var $: any;
@Component({
  selector: 'app-import-transaction-mapping-page',
  templateUrl: './import-transaction-mapping-page.component.html',
  styleUrls: ['./import-transaction-mapping-page.component.scss']
})
export class ImportTransactionMappingPageComponent implements OnInit {
  dpdCode1: any;
  dpdCode2: any;
  importContainerNo1: any;
  importContainerNo2: any;
  transporterCode: any;
  dpdRadio: any;
  bestPic:boolean = false;
  dpd:boolean = true;
  dpdRequestDtos: ImportDpdRequest = new ImportDpdRequest();
  importTransactionBestPickRequestDto = new ImportTransactionBestPickRequestDto();


  constructor(private formBuilder: FormBuilder, private importTransactionService: ImportTransactionMappingService, private spinner: NgxSpinnerService, private trucksummary: TransactionSummaryPageService, private inSurveyPageService: InSurveyPageService, private routes: Router) {
    let inputTextRegex = /^[A-Z ]{4}[0-9]{7}$/;
    let transporterCodeTextRegex = /^[A-Z ]{3}[0-9]{4}$/;
    //  -----------------------formBuilder---------------------------------------------   
    this.ImportFormGroup = this.formBuilder.group(
      {

        importTransactionCategory: [],
        importTransactionCategoryRadioBtn: [],
        containerSizeRadioBtn: [' ', [Validators.required]],
        containerCountRadioBtn: [' ', [Validators.required]],
        dpdCode1: ['', [Validators.required, Validators.pattern(inputTextRegex)]],
        dpdCode2: ['', [Validators.required, Validators.pattern(inputTextRegex)]],
        containerNo1: ['', [Validators.required, Validators.pattern(inputTextRegex)]],
        containerNo2: ['', [Validators.required, Validators.pattern(inputTextRegex)]],
        transporterCode: ['', [Validators.required, Validators.pattern(transporterCodeTextRegex)]],

      }
    );

  }
  importTransactionCategoryRadioBtn
  ImportFormGroup: FormGroup;
  isContainerCountToBeDisabled: boolean;
  isFormElementsToBeDisabled: boolean;


  ngOnInit() {
    let that = this;
    $(document).ready(function($) {
      that.hideTooltip('#transporterCodeIcon');
      that.hideTooltip('#dpdCode1Icon');
      that.hideTooltip('#containerNo1Icon');
      that.hideTooltip('#dpdCode2Icon');
    });


    this.importFormControls.importTransactionCategoryRadioBtn.setValue(1);
    this.importFormControls.containerSizeRadioBtn.setValue(20);
    this.importFormControls.containerCountRadioBtn.setValue(1);
    this.importTransactionCategoryRadioButtonChanged();
    this.containerCountRadioButtonChanged()


    this.hideTooltip('#containerNo2Icon');

    // this.importFormControls.containerSizeRadioBtn.enable();
    if (this.inSurveyPageService.editMode) {

      if (this.inSurveyPageService.importTransactionValidationUiDto.isBestPickTransactionType) {

        this.importFormControls.importTransactionCategoryRadioBtn.setValue(1)
        this.importTransactionCategoryRadioButtonChanged()
        this.ImportFormGroup.patchValue({

          containerSizeRadioBtn: this.inSurveyPageService.importTransactionValidationUiDto.containerSizeInFeet,
          containerCountRadioBtn: this.inSurveyPageService.importTransactionValidationUiDto.containerCount,
        })
        this.containerCountRadioButtonChanged()
        //
        this.importFormControls.transporterCode.setValue(this.inSurveyPageService.importTransactionValidationUiDto.transporterCode)
      } else {
        this.importFormControls.importTransactionCategoryRadioBtn.setValue(2)
        this.importTransactionCategoryRadioButtonChanged()
        this.ImportFormGroup.patchValue({
          containerSizeRadioBtn: this.inSurveyPageService.importTransactionValidationUiDto.containerSizeInFeet,
          containerCountRadioBtn: this.inSurveyPageService.importTransactionValidationUiDto.containerCount,
        })
        this.containerCountRadioButtonChanged()
        this.ImportFormGroup.patchValue({

          dpdCode1: this.inSurveyPageService.importTransactionValidationUiDto.dpdCode1,
          dpdCode2: this.inSurveyPageService.importTransactionValidationUiDto.dpdCode2,
          containerNo1: this.inSurveyPageService.importTransactionValidationUiDto.containerCode1,
          containerNo2: this.inSurveyPageService.importTransactionValidationUiDto.containerCode2,

        });
      }

    }



    // this.importFormControls.importTransactionCategoryRadioBtn.setValue(1);
    // this.importFormControls.containerSizeRadioBtn.setValue(20);
    // this.importFormControls.containerCountRadioBtn.setValue(1);
    // this.importFormControls.transporterCode.enable();
    // this.clearAndDisableFieldsForFirstContainer();
    // this.clearAndDisableFieldsForSecondContainer();
  }
  get importFormControls() { return this.ImportFormGroup.controls; }


  // *****************best pick and dpd radio button method******************************** 
  selectBestPick() {
    this.importFormControls.importTransactionCategoryRadioBtn.setValue(1)
  }
  selectDpd() {
    this.importFormControls.importTransactionCategoryRadioBtn.setValue(2)
  }

  resetInputFields(){
    this.importFormControls.transporterCode.reset();
    this.importFormControls.dpdCode1.reset();
    this.importFormControls.containerNo1.reset();
    this.importFormControls.dpdCode2.reset();
    this.importFormControls.containerNo2.reset();
  }
  // *****************end codebest pick and dpd radio button method******************************** 
  importTransactionCategoryRadioButtonChanged() {
    this.resetInputFields();
    if (this.importFormControls.importTransactionCategoryRadioBtn.value == 1) {
      //if(this.trucksummary.truckTranactionDto.importTransactionUiDto.isBestPickTransactionType==true){
    this.container2 = false;
        this.bestPic =true;
    this.dpd = false;
      this.importFormControls.transporterCode.enable();
    
      this.clearAndDisableFieldsForFirstContainer();
      this.clearAndDisableFieldsForSecondContainer();
      // this.importFormControls.containerSizeRadioBtn.setValue("");
      // this.importFormControls.containerCountRadioBtn.setValue("");
      this.importFormControls.containerSizeRadioBtn.enable();
      this.importFormControls.containerCountRadioBtn.enable();
      this.inSurveyPageService.importTransactionValidationUiDto.isBestPickTransactionType = true
    }
    else {
      this.enableFieldsForFirstContainer();

      this.bestPic =false;
      this.dpd = true;
      // this.dpdHide = true;
      // this.bestPickHide = false;
      // this.enableFieldsForSecondContainer();
    this.importFormControls.containerCountRadioBtn.setValue(1);

      this.enableFieldsForFirstContainer();
      this.clearAndDisableFieldsForSecondContainer();

      // this.importFormControls.containerSizeRadioBtn.disable();
      // this.importFormControls.containerSizeRadioBtn.setValue("");
      // this.importFormControls.containerCountRadioBtn.setValue("");
      this.importFormControls.transporterCode.setValue("");
      this.importFormControls.transporterCode.disable();
      this.hideTooltip('#transporterCodeIcon')
      this.inSurveyPageService.importTransactionValidationUiDto.isBestPickTransactionType = false
    }
  }

  containerSizeRadioButtonChanged(event: any) {
    if (this.importFormControls.containerSizeRadioBtn.value == 40) {
      this.container2 = false;
      this.importFormControls.containerCountRadioBtn.setValue(1);
      this.clearAndDisableFieldsForSecondContainer();
      this.importFormControls.containerCountRadioBtn.disable();

    }
    else {
      this.importFormControls.containerCountRadioBtn.enable();
    }
  }

  clearAndDisableFieldsForFirstContainer() {
    this.importFormControls.dpdCode1.setValue("");
    this.importFormControls.containerNo1.setValue("");
    this.importFormControls.dpdCode1.disable();
    this.importFormControls.containerNo1.disable();
    this.hideTooltip('#dpdCode1Icon')
    this.hideTooltip('#containerNo1Icon')
  }
  // ------------------dpd input disable------------------------
  dpdSelectDisable() {
    this.importFormControls.dpdCode1.setValue("");
    this.importFormControls.containerNo1.setValue("");
    this.importFormControls.dpdCode2.setValue("");
    this.importFormControls.containerNo2.setValue("");
    this.importFormControls.dpdCode1.disable();
    this.importFormControls.containerNo1.disable();
    this.importFormControls.dpdCode2.disable();
    this.importFormControls.containerNo2.disable();

  }
  // ------------------end dpd input disable------------------------
  //--------------best pick disable----------------
  bestPickSelectDisable() {
    this.importFormControls.transporterCode.disable();
    this.importFormControls.containerSizeRadioBtn.disable();
    // this.importFormControls.containerCountRadioBtn.setValue("");
    // this.importFormControls.transporterCode.setValue("");
    // this.hideTooltip('#transporterCodeIcon')
    // this.importFormControls.containerSizeRadioBtn.setValue("");
  }
  //--------------end best pick disable----------------
  clearAndDisableFieldsForSecondContainer() {
    this.importFormControls.dpdCode2.setValue("");
    this.importFormControls.containerNo2.setValue("");
    this.importFormControls.dpdCode2.disable();
    this.importFormControls.containerNo2.disable();
    this.hideTooltip('#dpdCode2Icon');
    this.hideTooltip('#containerNo2Icon');
  }

  enableFieldsForFirstContainer() {
    // this.dpd = true;
    this.importFormControls.dpdCode1.enable();
    this.importFormControls.containerNo1.enable();
  }

  enableFieldsForSecondContainer() {
    this.importFormControls.dpdCode2.enable();
    this.importFormControls.containerNo2.enable();
  }
  container2:boolean = false;
  containerCountRadioButtonChanged() {
    if (this.importFormControls.importTransactionCategoryRadioBtn.value == 2) {

      if (this.importFormControls.containerCountRadioBtn.value == 1) {
        this.container2  = false;

        this.clearAndDisableFieldsForSecondContainer();
        this.importFormControls.dpdCode1.setValue("");
        this.importFormControls.containerNo1.setValue("");
      }
      else {
        this.enableFieldsForSecondContainer();
  this.container2 = true;

      }
    }
  }
  onTransporterCodeTextChanged() {
    this.validateTransporterCode();
  }
  onTransporterCodeLostFocus() {
    this.validateTransporterCode();
  }


  validateTransporterCode() {
    if (this.removeWhitespacesFromString(this.importFormControls.transporterCode.value).length > 0) {
      let transporterCodeToolTipMessage: String = "Invalid";
      if (this.importFormControls.transporterCode.errors) {
        if (this.importFormControls.transporterCode.hasError('required')) {
          this.showTooltip('#transporterCodeIcon', transporterCodeToolTipMessage);

        }
        else if (this.importFormControls.transporterCode.hasError('pattern')) {
          this.showTooltip('#transporterCodeIcon', transporterCodeToolTipMessage);

        }
        this.showTooltip('#transporterCodeIcon', transporterCodeToolTipMessage);
      }
      else {
        this.hideTooltip('#transporterCodeIcon');
      }
    }
    else {

      let transporterCodeToolTipMessage = "Invalid";
      this.showTooltip('#transporterCodeIcon', transporterCodeToolTipMessage);
    }
  }
  onDPDCode1TextChanged() {
    this.validateDPDCode1();
  }
  onDPDCode1LostFocus() {
    this.validateDPDCode1();
  }
  validateDPDCode1() {
    if (this.removeWhitespacesFromString(this.importFormControls.dpdCode1.value).length > 0) {
      if (this.importFormControls.dpdCode1.errors) {
        let dpdCodeToolTipMessage: String = "Invalid";
        if (this.importFormControls.dpdCode1.hasError('required')) {

        }
        else if (this.importFormControls.dpdCode1.hasError('pattern')) {

        }
        this.showTooltip('#dpdCode1Icon', dpdCodeToolTipMessage);
      }
      else {
        this.hideTooltip('#dpdCode1Icon');
      }
    }
    else {

      let dpdCodeToolTipMessage = "Invalid";

      this.showTooltip('#dpdCode1Icon', dpdCodeToolTipMessage);
    }
  }

  onDPDCode2TextChanged() {
    this.validateDPDCode2();
  }
  onDPDCode2LostFocus() {
    this.validateDPDCode2();
  }
  validateDPDCode2() {
    if (this.removeWhitespacesFromString(this.importFormControls.dpdCode2.value).length > 0) {
      if (this.importFormControls.dpdCode2.errors) {
        let dpdCodeToolTipMessage: String = "Invalid";
        if (this.importFormControls.dpdCode2.hasError('required')) {

        }
        else if (this.importFormControls.dpdCode2.hasError('pattern')) {

        }
        this.showTooltip('#dpdCode2Icon', dpdCodeToolTipMessage);
      }
      else {
        this.hideTooltip('#dpdCode2Icon');
      }
    }
    else {

      let dpdCodeToolTipMessage = "Invalid";
      this.showTooltip('#dpdCode2Icon', dpdCodeToolTipMessage);
    }
  }
  onContainerNo1TextChanged() {
    this.validateContainerNo1();
  }

  onContainerNo1LostFocus() {
    this.validateContainerNo1();
  }

  validateContainerNo1() {
    if (this.removeWhitespacesFromString(this.importFormControls.containerNo1.value).length > 0) {
      if (this.importFormControls.containerNo1.errors) {
        let containerNoToolTipMessage: String = "Invalid";
        if (this.importFormControls.containerNo1.hasError('required')) {

        }
        else if (this.importFormControls.containerNo1.hasError('pattern')) {

        }
        this.showTooltip('#containerNo1Icon', containerNoToolTipMessage);
      }
      else {
        this.hideTooltip('#containerNo1Icon');
      }
    }
    else {

      let containerNoToolTipMessage = "Invalid";
      this.showTooltip('#containerNo1Icon', containerNoToolTipMessage);
    }
  }

  onContainerNo2TextChanged() {
    this.validateContainerNo2();
  }

  onContainerNo2LostFocus() {
    this.validateContainerNo2();
  }

  validateContainerNo2() {
    if (this.removeWhitespacesFromString(this.importFormControls.containerNo2.value).length > 0) {
      if (this.importFormControls.containerNo2.errors) {
        let containerNoToolTipMessage: String = "Invalid";
        if (this.importFormControls.containerNo2.hasError('required')) {

        }
        else if (this.importFormControls.containerNo2.hasError('pattern')) {

        }
        this.showTooltip('#containerNo2Icon', containerNoToolTipMessage);
      }
      else {
        this.hideTooltip('#containerNo2Icon');
      }
    }
    else {

      let containerNoToolTipMessage = "Invalid";
      this.showTooltip('#containerNo2Icon', containerNoToolTipMessage);
    }
  }

  showTooltip(controlId: String, message: String) {
    $(controlId).show();
    $(controlId).tooltip("dispose");

    $(controlId).tooltip({ title: message, trigger: "hover" });
    // $("#" + controlId).tooltip({ title: message, trigger: "hover" });

    $(controlId).tooltip('show');

  }


  // showTooltip(controlId: String, message: String) {
  //   $("#" + controlId).show();
  //   $("#" + controlId).tooltip("dispose");
  //   // $(controlId).tooltip({ title: message, trigger: "hover focus" });
  //   $("#" + controlId).tooltip({ title: message, trigger: "hover" });
  //   $("#" + controlId).tooltip('show');

  // }

  hideTooltip(controlId: String) {
    $(controlId).tooltip("dispose");
    $(controlId).hide();
  }

  removeWhitespacesFromString(valueToCheck: String) {
    return valueToCheck.replace(/\s*/g, "");
  }

  resetValue() {
    this.importFormControls.containerNo1.setValue("");
    this.importFormControls.dpdCode1.setValue("");
    this.importFormControls.containerNo2.setValue("");
    this.importFormControls.dpdCode2.setValue("");
    this.importFormControls.containerSizeRadioBtn.setValue("");

    this.importFormControls.containerCountRadioBtn.setValue("");
    this.importFormControls.containerSizeRadioBtn.setValue("");
    this.importFormControls.transporterCode.setValue("");


  }

  bestPickRestEndPointApi() {
    console.log(this.importTransactionBestPickRequestDto)
    this.importTransactionService.bestPickValidateDetails(this.importTransactionBestPickRequestDto).subscribe((response) => {

      console.log(this.importTransactionBestPickRequestDto)
      let importTransactionUiApiResponse = <ImportTransactionUiApiResponse>response;
      if (importTransactionUiApiResponse.status === "OK") {

        alert(importTransactionUiApiResponse.message);
        this.routes.navigate(['/home/in-survey/transaction-summary-page'])
      }
      else {
        alert(importTransactionUiApiResponse.message);
      }


    },
      err => {

        console.log("In error callback of subscribe call");
        this.isFormElementsToBeDisabled = false;
        this.spinner.hide();
      },
      () => {
        //check response from server, if success then redirect to summarry page else show message to user
        console.log("In completion callback of subscribe call");
        this.isFormElementsToBeDisabled = false;
        this.spinner.hide();
      });

  }

  dpdRestEndPointApi() {

    this.importTransactionService.DpdValidateDetails(this.dpdRequestDtos).subscribe((response) => {

      let importTransactionUiApiResponse = <ImportTransactionUiApiResponse>response;
      if (importTransactionUiApiResponse.status === "OK") {
        alert(importTransactionUiApiResponse.message);
        this.routes.navigate(['/home/in-survey/transaction-summary-page'])
      }
      else {
        alert("Error: " + importTransactionUiApiResponse.message);
      }

    },
      err => {

        console.log("In error callback of subscribe call");
        this.isFormElementsToBeDisabled = false;
        this.spinner.hide();
      },
      () => {
        //check response from server, if success then redirect to summarry page else show message to user
        console.log("In completion callback of subscribe call");
        this.isFormElementsToBeDisabled = false;
        this.spinner.hide();
      });

  }
  setInSurveyPageValue() {

    this.inSurveyPageService.importTransactionValidationUiDto.transporterCode = this.importFormControls.transporterCode.value;
    this.inSurveyPageService.importTransactionValidationUiDto.containerCode1 = this.importFormControls.containerNo1.value;
    this.inSurveyPageService.importTransactionValidationUiDto.dpdCode1 = this.importFormControls.dpdCode1.value;
    this.inSurveyPageService.importTransactionValidationUiDto.containerCode2 = this.importFormControls.containerNo2.value;
    this.inSurveyPageService.importTransactionValidationUiDto.dpdCode2 = this.importFormControls.dpdCode2.value;
    this.inSurveyPageService.importTransactionValidationUiDto.containerSizeInFeet = this.importFormControls.containerSizeRadioBtn.value;
    this.inSurveyPageService.importTransactionValidationUiDto.containerCount = this.importFormControls.containerCountRadioBtn.value;
    if (this.importFormControls.importTransactionCategoryRadioBtn.value == 1) {

      this.inSurveyPageService.importTransactionValidationUiDto.isBestPickTransactionType = true;
     
    } else {
      if (this.importFormControls.importTransactionCategoryRadioBtn.value == 2) {
        this.inSurveyPageService.importTransactionValidationUiDto.isBestPickTransactionType = false;
  

      }
    }

  }

  onSubmitButtonClick() {
    this.isFormElementsToBeDisabled = true;
    this.spinner.show();
    this.setInSurveyPageValue();

    this.dpdRequestDtos.truckId = this.inSurveyPageService.truckId;
    if (this.importFormControls.importTransactionCategoryRadioBtn.value == 1) {

      this.importTransactionBestPickRequestDto.containerCount = this.importFormControls.containerCountRadioBtn.value;
      this.importTransactionBestPickRequestDto.containerSizeInFeet = this.importFormControls.containerSizeRadioBtn.value;
      this.importTransactionBestPickRequestDto.transporterCode = this.importFormControls.transporterCode.value;
      this.importTransactionBestPickRequestDto.truckId = this.inSurveyPageService.truckId;

      this.bestPickRestEndPointApi();
      this.resetValue();
    }
    else {
      this.dpdRequestDtos.dpdRequestDtos.push({
        containerCode: this.importFormControls.containerNo1.value,
        dpdCode: this.importFormControls.dpdCode1.value,
        containerSize: this.importFormControls.containerSizeRadioBtn.value
      })
      if (this.importFormControls.containerCountRadioBtn.value == 2) {

        this.dpdRequestDtos.dpdRequestDtos.push({
          containerCode: this.importFormControls.containerNo2.value,
          dpdCode: this.importFormControls.dpdCode2.value,
          containerSize: this.importFormControls.containerSizeRadioBtn.value
        })
      }
      this.dpdRestEndPointApi();
      this.resetValue();
    }

  }
}
