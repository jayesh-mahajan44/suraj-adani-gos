import { Injectable } from '@angular/core';
import { OnInit,  } from '@angular/core';
import {FileUploadLogic} from './file-upload-logic'

@Injectable({
    providedIn: 'root'
})
export class DriverPageLogic implements OnInit {
    public formData: FormData = new FormData();
    
    constructor(private fileUploadLogic: FileUploadLogic){}

    ngOnInit() { }

    public storeSelectedFileAndClearUploaderQueue() {
        let fileItem = this.fileUploadLogic.fileUploader.queue[0]._file;
        this.fileUploadLogic.fileUploader.clearQueue();
        this.formData = new FormData();
        this.formData.append("file", fileItem, fileItem.name);    
      }
}

