export class ExportTransactionRequestDto {

    containerNo?: string;
    transactionPin?: number;
    

    constructor(containerNo?: string,transactionPin?: number){

        this.containerNo = containerNo;
        this.transactionPin = transactionPin;
        
        
    }

    
}
