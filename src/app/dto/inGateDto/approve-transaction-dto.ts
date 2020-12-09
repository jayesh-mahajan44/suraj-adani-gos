export class ApproveTransactionDto {

    truckTransactionId?: number;
    importTransactionId1?:number;
    importTransactionId2?:number;
    exportTransactionId1?:number;
    exportTransactionId2?:number;

    constructor( truckTransactionId?: number,importTransactionId1?:number, importTransactionId2?:number,exportTransactionId1?:number, exportTransactionId2?:number,){

        this.exportTransactionId1 = exportTransactionId1;
        this.exportTransactionId2 = exportTransactionId2;
        this.importTransactionId1 = importTransactionId1;
        this.importTransactionId2 = importTransactionId2;
        this.truckTransactionId =  truckTransactionId;

    }
}
