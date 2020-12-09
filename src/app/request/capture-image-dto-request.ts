export class CaptureImageDtoRequest {

  imageByteArray?:string;
  label?: any;
  
  constructor(imageByteArray?:string, label?:any)
  {
      this.imageByteArray = imageByteArray;
      this.label = label; 
  } 
}

