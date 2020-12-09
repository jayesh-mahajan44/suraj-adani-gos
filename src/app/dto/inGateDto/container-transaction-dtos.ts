export class ContainerTransactionDtos {

    containerNumber:string;
    isoCode: string;
    status:string;
    seal1:string;
    seal2:string;
    operationType:string;
    location:string;

    constructor(containerNumber?:string, isoCode?:string,status?:string, seal1?:string,seal2?:string,operationType?:string,
    location?:string )
    {

     this.containerNumber = containerNumber;
     this.isoCode = isoCode;
     this.status = status;
     this.seal1 = seal1;
     this.seal2 = seal2;
     this.operationType = operationType;
     this.location = location;

    }
}
