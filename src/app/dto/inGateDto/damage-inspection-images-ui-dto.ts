export class DamageInspectionImagesUiDto {
    byteArray:string;
    positionName: string;
    
    constructor( byteArray?:string,positionName?: string){
        this.byteArray=byteArray;
        this.positionName=positionName;
    }
}
