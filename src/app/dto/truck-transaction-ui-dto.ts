import { ExportTransactionUiDto } from "./export-transaction-ui-dto";
import { ImportTransactionValidationUiDto } from "./import-transaction-validation-ui-dto";

export class TruckTransactionUiDto {
    acceptTransactionRemark: string;
    isActive: boolean;
    checkPointFlagId: number;
    createdBy: string;
    creationTime?: Date;
    errorId: number;
    errorRemarks: string;
    importTransactionId1: number;
    importTransactionId2: number;
    exportTransactionId1: number;
    exportTransactionId2: number;
    inGateRejectionRemark: string;
    inGateTime?: Date;
    inGateUserId: number;
    inLaneId: number;
    inSurveyUserId: number;
    isItt: boolean;
    isTroubleAtGate: boolean;
    laneImgDirLoc: string;
    modifiedBy: string;
    modifiedTime?: Date;
    operationTypeId: number;
    outGateRejectionRemark: string;
    outGateTime: string;
    outGateUserId: number;
    outLaneId: number;
    outSurveyPointTime?: Date;
    outSurveyUserId: number;
    transactionFlagName: string;
    truckId: number;
    truckTransactionId: number;
    truckVisitNo: number;
    truckRegNo: string;
    transactionFlagId: number;
    exportTransactionUiDto1:ExportTransactionUiDto;
    exportTransactionUiDto2:ExportTransactionUiDto;
    importTransactionUiDto:ImportTransactionValidationUiDto;
}
