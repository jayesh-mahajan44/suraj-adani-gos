import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { FileUploader} from 'ng2-file-upload';

@Injectable({
    providedIn: 'root'
})
export class FileUploadLogic implements OnInit {
    public fileUploader: FileUploader = new FileUploader({ itemAlias: 'photo', allowedMimeType: ['image/jpeg', 'image/png'], allowedFileType: ["image"] });//allowedFileType: ["pdf", "jpg"]//allowedMimeType:['image/png', 'image/gif', 'video/mp4', 'image/jpeg']//, allowedMimeType: ['application/pdf', 'jpeg'] //allowedMimeType:["jpg","png"]});
    ngOnInit() {
        this.fileUploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
            console.log("selected file uploaded");
        };
        this.fileUploader.onBeforeUploadItem = (file) => {
            console.log("In onBeforeUploadItem method");
        }
        this.fileUploader.onWhenAddingFileFailed = (item) => { console.log(item); };
        this.fileUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            console.log('ImageUpload:uploaded:', item, status, response);
            console.log('headers: ' + headers);
            alert('File uploaded successfully');
        };
    }
}