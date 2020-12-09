import { Component, OnInit, ViewChild } from '@angular/core';
// import { ImportTransactionValidationUiDto } from 'src/app/dto/import-transaction-validation-ui-dto';
import { TruckTransactionUiDto } from 'src/app/dto/truck-transaction-ui-dto';
import { ImportTransactionValidationUiDto } from 'src/app/dto/import-transaction-validation-ui-dto';
import { ExportTransactionUiDto } from 'src/app/dto/export-transaction-ui-dto';
import { Router } from '@angular/router';
import { TransactionSummaryPageService } from './transaction-summary-page.service';
import { TruckTransactionUiApiResponse } from 'src/app/response/truck-transaction-ui-api-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InSurveyPageService } from '../in-survey-page.service';


@Component({
  selector: 'app-transaction-summary-page',
  templateUrl: './transaction-summary-page.component.html',
  styleUrls: ['./transaction-summary-page.component.scss']
})
export class TransactionSummaryPageComponent implements OnInit {
  public BestPickDomView: boolean = false;
  public dpdDomView: boolean = false;
  public exportDomView: boolean = false;
  editMode: boolean;

  constructor(private formBuilder: FormBuilder, private routes: Router, private transactionSummaryPageService: TransactionSummaryPageService, private http: HttpClient, private inSurveyPageService: InSurveyPageService) {
    //  -----------------------formBuilder---------------------------------------------   
    this.SummaryFormGroup = this.formBuilder.group(
      {
        truckNumber: [''],
        pinContainerNo1: [''],
        pinContainerNo2: [''],
        transporterCode: [''],
        containerCount: [''],
        containerSize: [''],
        dpdCode1: [''],
        dpdCode2: [''],
        containerNo1: [''],
        containerNo2: ['']
      }
    );
    
    this.allcontentDisable();

  }
  SummaryFormGroup: FormGroup;

  ngOnInit() {
    this.showAndHideImportExport();
    this.SummaryFormGroup.patchValue({

      truckNumber: this.inSurveyPageService.truckNumber,
      pinContainerNo1: this.inSurveyPageService.exportTransactionUiCommonDto.container1,
      pinContainerNo2: this.inSurveyPageService.exportTransactionUiCommonDto.container2,
      transporterCode: this.inSurveyPageService.importTransactionValidationUiDto.transporterCode,
      containerCount: this.inSurveyPageService.importTransactionValidationUiDto.containerCount,
      containerSize: this.inSurveyPageService.importTransactionValidationUiDto.containerSizeInFeet,
      dpdCode1: this.inSurveyPageService.importTransactionValidationUiDto.dpdCode1,
      dpdCode2: this.inSurveyPageService.importTransactionValidationUiDto.dpdCode2,
      containerNo1: this.inSurveyPageService.importTransactionValidationUiDto.containerCode1,
      containerNo2: this.inSurveyPageService.importTransactionValidationUiDto.containerCode2
    }
    )

  }

  get SummaryFormControls() { return this.SummaryFormGroup.controls; }

  allcontentDisable() {
    this.SummaryFormControls.truckNumber.disable();
    this.SummaryFormControls.pinContainerNo1.disable();
    this.SummaryFormControls.pinContainerNo2.disable();
    this.SummaryFormControls.transporterCode.disable();
    this.SummaryFormControls.containerCount.disable();
    this.SummaryFormControls.containerSize.disable();
    this.SummaryFormControls.dpdCode1.disable();
    this.SummaryFormControls.dpdCode2.disable();
    this.SummaryFormControls.containerNo1.disable();
    this.SummaryFormControls.containerNo2.disable();
  }

  showAndHideImportExport() {

    this.exportDomView = this.inSurveyPageService.exportTransactionCheckbox;
    if (this.inSurveyPageService.importTransactionValidationUiDto.isBestPickTransactionType) {

      this.BestPickDomView = true;
    } else {
      if (this.inSurveyPageService.importTransactionValidationUiDto.isBestPickTransactionType == false) {

        this.dpdDomView = true

      }


    }
  }


  onSubmitButtonClick() {

    console.log(this.inSurveyPageService.truckTransactionId)
    this.transactionSummaryPageService.submitSumaaryPageValidta(this.inSurveyPageService.truckTransactionId).subscribe(response => {

      console.log(response)
      alert("Data submitted successfully")
    })

  }
  goToExportPage() {
    this.routes.navigate(['/home/in-survey/export-transaction-mapping'])
    this.editMode = true;
    this.inSurveyPageService.editMode = this.editMode;
  }
  goToImportPage() {
    this.routes.navigate(['/home/in-survey/import-transaction-mapping'])
    this.editMode = true;
    this.inSurveyPageService.editMode = this.editMode;
  }

}
