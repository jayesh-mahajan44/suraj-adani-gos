export class ExportImageDto {

    label:string;
    imageByteArray:string;
    constructor(label?:string, imageByteArray?:string){
      
        this.label = label;
        this.imageByteArray = imageByteArray;
    }
}


