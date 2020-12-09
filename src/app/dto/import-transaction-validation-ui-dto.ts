import { TruckStatusEnum } from './../pages/truck-management-page/truck-status-enum';

export class ImportTransactionValidationUiDto {
    containerCount?: number;
    containerSizeInFeet?: number;  
    isBestPickTransactionType?: boolean;
    transporterCode?: string;
    dpdCode1?: string;
    dpdCode2?: string;
    containerCode1?: string;
    containerCode2?: string;

    constructor(containerCount?: number, containerSizeInFeet?: number, isDPDTransactionType?: boolean, isBestPickTransactionType?: boolean, transporterCode?: string, dpdCode1?: string, dpdCode2?: string, containerCode1?: string, containerCode2?: string) {
        this.containerCount= containerCount;
        this.containerSizeInFeet = containerSizeInFeet;
        this.isBestPickTransactionType = isBestPickTransactionType;
        this.transporterCode=transporterCode;
        this.dpdCode1=dpdCode1;
        this.dpdCode2 = dpdCode2;
        this.containerCode1 = containerCode1;
        this.containerCode2 = containerCode2;
    }
}