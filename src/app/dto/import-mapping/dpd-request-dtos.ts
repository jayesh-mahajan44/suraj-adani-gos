export class DpdRequestDto {

    containerCode:string;
    containerSize:number;
    dpdCode:string;
    constructor(containerCode?:string,containerSize?:number,dpdCode?:string){

        this.containerCode = containerCode;
        this.containerSize = containerSize;
        this.dpdCode = dpdCode;
    }
}
