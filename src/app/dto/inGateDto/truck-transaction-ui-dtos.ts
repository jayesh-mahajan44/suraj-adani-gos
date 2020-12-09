
import { ApproveTransactionDto } from './approve-transaction-dto';
import { ContainerTransactionDtos } from './container-transaction-dtos';
export class TruckTransactionUiDtos {
    registrationNumber?:string;
    driverName?:string;
    containerTransactionDtos:ContainerTransactionDtos[];
    truckTransactionRequestDto:ApproveTransactionDto
    
    constructor(registrationNumber?:string,driverName?:string,containerTransactionDtos?:ContainerTransactionDtos[],truckTransactionRequestDto?:ApproveTransactionDto){
    this.registrationNumber = registrationNumber;
    this.containerTransactionDtos=containerTransactionDtos;
    this.driverName = driverName;
    this.truckTransactionRequestDto = truckTransactionRequestDto;
    }

    
}
