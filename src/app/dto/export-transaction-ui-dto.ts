export class ExportTransactionUiDto {
    exportTransactionId:number;
    containerNo: string;
    containerIsoCode: string;
    containerCustomSeal: string;
    containerAgentSeal: string;
    containerLocation: string;
    containerSeal1: string;
    containerSeal2: string;
    containerSeal3: string
    transactionPin:number;
    clientTosTranId: string;
    containerUnloadTime?:Date;
    containerCustomStatus:number;
    containerCustomStatusChangedBy: string;
    containerCustomClearanceTime?:Date;
    containerCustomRemarks: string;
    containerLine: string;
    containerVia: string;
    containerVessel: string;
    containerLoadStatus: string;
    containerGrossWeight: string;
    containerGrossWeightUnit: string;
    containerNetWeight: string;
    containerTareWeight: string;
    containerDeliveryOrderNo: string;
    containerOglNo: string;
    containerPortOfDisCharge: string;
    containerTemperature: string;
    containerVoltage: string;
    containerShpngBillNo: string;
    containerIgmEgm: string;
    containerOrigin: string;
    containerRemarks: string;
    containerHaulier: string;
    sealImgDirLoc: string;
    addedInCstmQueue:boolean;
    isContainerUnloadedInYard:boolean;
    noOfContainer:number;
    containerSize:number;
    destination: string;
    scanMode: string;
    truckCompany: string;
    isActive:boolean;
    createdBy: string;
    createdDate?:Date;
    modifiedBy: string;
    modifiedDate?:Date;
    isContainerEmpty:any;
    containerWeightUnit:any;
}