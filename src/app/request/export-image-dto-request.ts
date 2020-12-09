import { CaptureImageDto } from '../dto/capture-image-dto';

export class ExportImageDtoRequest {

    exportImageRequestDtos: CaptureImageDto[] = [];
    //Array<CaptureImageDto>() let objArray: Array<MyObjClass> = new Array();
    exportTransactionId:number;
    truckTransactionId:number;
}
