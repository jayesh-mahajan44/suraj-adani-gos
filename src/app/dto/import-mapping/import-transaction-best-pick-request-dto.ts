export class ImportTransactionBestPickRequestDto {

    containerCount:number;
    containerSizeInFeet:number;
    transporterCode: string;
    truckId:number;

    constructor(containerCount?:number,containerSizeInFeet?:number,transporterCode?: string,truckId?:number){

        this.containerCount = containerCount;
        this.containerSizeInFeet = containerSizeInFeet;
        this.transporterCode = transporterCode;
        this.truckId = truckId;

    }
}

