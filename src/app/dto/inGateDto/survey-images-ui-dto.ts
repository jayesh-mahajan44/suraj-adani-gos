export class SurveyImagesUiDto {
    
    byteArray:string;
    labelName:string;

    constructor(byteArray?:string,labelName?:string){
        this.byteArray=byteArray;
        this.labelName=labelName;
    }
}
