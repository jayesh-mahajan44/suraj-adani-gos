//import { WebcamImage } from 'ngx-webcam';

export class CaptureImageDto
{
    imageByteArray?:string;
    labelName?: string;
    label?: string;
    
    constructor(imageByteArray?:string, labelName?:string,label?: string)
    {
        this.imageByteArray = imageByteArray;
        this.labelName = labelName; 
        this.label = label;
    } 
}
