import { Injectable } from '@angular/core';
import { ExportTransactionUiCommonDto } from 'src/app/dto/export-mapping/export-transaction-ui-common-dto';
import { ExportTransactionUiDto } from 'src/app/dto/export-transaction-ui-dto';
import { ImportTransactionValidationUiDto } from 'src/app/dto/import-transaction-validation-ui-dto';
import { TruckTransactionUiDto } from 'src/app/dto/truck-transaction-ui-dto';

@Injectable({
  providedIn: 'root'
})
export class InSurveyPageService {

  truckId: number;
  truckTransactionId: number;
  exportTransactionId: number;
  registrationNumber:string;
  exportButtonEnableDisable:boolean;
  componentToComponentRedirect:boolean;
  captureImage1:boolean;
  noOfContainer: boolean;
  truckTransactionUiDto: TruckTransactionUiDto = new TruckTransactionUiDto() ;
  exportTransactionDto: ExportTransactionUiDto = new ExportTransactionUiDto();
  importTransactionValidationUiDto: ImportTransactionValidationUiDto = new ImportTransactionValidationUiDto();
  exportTransactionUiCommonDto: ExportTransactionUiCommonDto = new ExportTransactionUiCommonDto();
  exportTransactionUiDto:ExportTransactionUiDto = new ExportTransactionUiDto();
  importTransactionBestPickCheckbox: Number;
  importTransactionDpdCheckbox: Number;
  exportTransactionCheckbox: boolean;
  truckNumber: string;
  editMode: boolean;


  constructor() { }
}
