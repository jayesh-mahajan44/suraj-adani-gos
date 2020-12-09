import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  public componentTitle: string;
  public isNavbarLogoutButtonToBeDisabled: boolean = false;

  public base64EncodedStringtoJpegTypeBlob(base64EncodeString) {
    const byteString = window.atob(base64EncodeString);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  public convertImageBase64StringToImageFile(imageBase64EncodedString) {
    const date = new Date()
    let dateString = date.toISOString().slice(0, 10) + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
    let text = '';
    const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
    }
    // Replace extension according to your media type
    const imageName = dateString + '_' + text + '.jpeg';
    // call method that creates a blob from dataUri
    const imageBlob = this.base64EncodedStringtoJpegTypeBlob(imageBase64EncodedString);
    //const fileURL = URL.createObjectURL(imageByte);
    // window.open(fileURL, '_blank');
    const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
   // console.info('received file', imageFile);
    return imageFile;
  }
}