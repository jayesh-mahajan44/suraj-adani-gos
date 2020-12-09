import { Component, OnInit, ViewChild, ElementRef,  ChangeDetectorRef,Renderer2 } from '@angular/core';
// import * as $ from 'jquery';
// import 'datatables.net';
import 'datatables.net-bs4';
import { DriverMasterService } from 'src/app/pages/driver-master-page/driver-master.service';
import { UtilityService } from 'src/app/shared/utility/utility.service';
import { Driver } from 'src/app/dto/driver';
import { WebCamLogic } from 'src/app/pages/driver-master-page/web-cam-logic';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DriverPageLogic } from './driver-page-logic';
import { FileUploadLogic } from './file-upload-logic';
// import 'src/assets/DataTables/DataTables-1.10.18/js/datatables.bootstrap.js';
// import 'src/assets/DataTables/DataTables-1.10.18/js/datatables.bootstrap4.js';
declare var $: any;

@Component({
  selector: 'app-driver-master-page',
  templateUrl: './driver-master-page.component.html',
  styleUrls: ['./driver-master-page.component.scss']
})
export class DriverMasterPageComponent implements OnInit {
  driverDetailsFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private fileUploadLogic: FileUploadLogic
    , private driverPageLogic: DriverPageLogic, private webCamLogic: WebCamLogic, private utilityService: UtilityService, private driverMasterService: DriverMasterService, private chref: ChangeDetectorRef,private renderer: Renderer2) {
    this.utilityService.componentTitle = "DRIVER MASTER";
  }

  @ViewChild('fileSelectInput')
  fileSelectInputVariable: ElementRef;

  private dataTable: any;
  showNew: Boolean = false;
  submitType: string = 'Save';
  driverModel: Driver;
  savedDriverLicenseImageURL: string;
  licenseValidityDateString: string;

  get f() { return this.driverDetailsFormGroup.controls; }

  ngOnInit() {

    let that = this;

    $(document).ready(function ($) {

    that.hideTooltip('driverNameIcon');
    that.hideTooltip('licenseNumberIcon');
    that.hideTooltip('contactNumberIcon');

    });



    let driverNameRegex = /^[a-zA-Z ]{0,20}$/;
    let licenseNumberRegex = /^((AP)|(AR)|(AS)|(BR)|(CG)|(GA)|(GJ)|(HR)|(HP)|(JK)|(JH)|(KA)|(KL)|(MP)|(MH)|(MN)|(ML)|(MZ)|(NL)|(OR)|(PB)|(RJ)|(SK)|(TN)|(TR)|(UK)|(UP)|(WB)|(TN)|(TR)|(AN)|(CH)|(DH)|(DD)|(DL)|(LD)|(PY)){1,1}([0-9]){13,13}$/;
    let contactNumberRegex = /^[0-9\-_]{10,10}$/;
    this.driverDetailsFormGroup = this.formBuilder.group({
      driverName: ['', [Validators.required, Validators.pattern(driverNameRegex)]],
      licenseNumber: ['', [Validators.required, Validators.pattern(licenseNumberRegex)]],
      contactNumber: ['', [Validators.required, Validators.pattern(contactNumberRegex)]],
      licenseValidityDate: ['', [Validators.required]],
    });
    
    // "url": "http://192.168.1.88:9080/sga-ui-registration-service/ui/reg/v1/drivers/datatable",
    
    $(document).ready(function () {
      that.dataTable = $('#example').DataTable({
        "bLengthChange": false,
        "retrieve": "true",
        "ajax": {
          "url": "http://localhost:9080/sga-registration-facade-service/ui/reg/v1/drivers/datatable",
//          "url": "http://localhost:9081/ui/reg/v1/drivers/datatable",          
          "type": "post",
          ///////////To pass ajax request data as JSON by default is 'Application Form Url Encoded'////////////////////////////
          "contentType": "application/json",
          "data": function (d) {
            return JSON.stringify(d);
          },
          "dataSrc": function (dataSource) {
            return dataSource.data;
          }
        },
        "columns": [
          { "data": "driverId", "visible": false },
          { "data": "driverName" },
          { "data": "licenseNumber" },
          { "data": "contactNumber" },
          { "data": "licenseValidityDate" },
          {
            "orderable": false,
            "defaultContent": '<input type = "button" id="edit" class="btn btn-raised btn-info" value = "Edit"/>'
          },
          {
            "orderable": false,
            "render": function (data, type, full, meta) {
              return '<input type = "button" id="delete"  class="btn btn-raised btn-danger" value = "Delete"/>';
            }
          }
        ],
        //it indicates that pagination feature will try to adjust in most page numbers(1,2,3) in space provided
        // and also it would have all next, previous, first, last buttons
        "pagingType": "full_numbers",

        ///need to evaluate this, i think it is for showing spinner
        "processing": "true",

        //it sets the default number of rows in page"
        // "pageLength": 2,

        // it indicates that the processing will be done by server end
        "serverSide": true,
      });
      let that2 = that;
      $('#example tbody').on('click', '#edit', function () {
        console.log("Edit button clicked");
        // it gets the object of the row whose button is clicked
        let data = that.dataTable.row($(this).parents('tr')).data();
        that.onEdit(data);
      });
      $('#example tbody').on('click', '#delete', function () {
        console.log("Delete button clicked");
        //it gets the object of the row whose button is clicked
        let data = that.dataTable.row($(this).parents('tr')).data();
        that.onDelete(data);
      });
    });



  }

  onNew() {
    if (this.fileSelectInputVariable != null) {
      this.fileSelectInputVariable.nativeElement.value = "";
    }
    this.driverDetailsFormGroup.reset();
    this.driverPageLogic.formData = new FormData();
    this.savedDriverLicenseImageURL = "";
    this.webCamLogic.showCapturedImage = false;
    this.driverModel = new Driver();
    this.f.licenseNumber.enable();
    // Change submitType to 'Save'.
    this.submitType = 'Save';
    // display Truck registration entry section.
    this.showNew = true;
  }

  onSave() {
    let tempDate = new Date(this.licenseValidityDateString);
    let todaysDate = new Date();
    if (tempDate.getTime() > todaysDate.getTime()) {
      console.log("License Validity Date: " + this.licenseValidityDateString);
      this.driverModel.licenseValidityDate = tempDate.toISOString().slice(0, 10);
      if (this.submitType === 'Save') {
        if (this.driverPageLogic.formData != null && this.driverPageLogic.formData.has("file")) {
          let that = this;
          console.log("Calling addDriverWithImage");
          if (this.driverPageLogic.formData.get('file') != null) {
            this.driverModel.active = true;
            this.driverPageLogic.formData.append("driverString", JSON.stringify(this.driverModel));
          }
          else {
            alert("Please upload or capture image of driver license");
            return;
          }
          this.driverMasterService.addDriverWithImage(this.driverPageLogic.formData).subscribe(response => {
            if (response.status == "CREATED") {
              that.webCamLogic.webcamImage = null;
              that.dataTable.draw();
            }
            else {
              alert(response.message)
            }
          });
          this.licenseValidityDateString = "";
          this.showNew = false;
        }
        else {
          alert("Please select valid file");
        }
      }
      else {
        let that = this;
        if (this.driverPageLogic.formData != null) {
          this.driverModel.active = true;
          this.driverPageLogic.formData.append("driverString", JSON.stringify(this.driverModel));
        }
        else {
          alert("Application error: formData is null");
          return;
        }
        this.driverMasterService.updateDriverWithImage(this.driverPageLogic.formData).subscribe(response => {
          //resetting saved camera image after getting response
          if (response.status == "OK") {
            this.webCamLogic.webcamImage = null;
            that.dataTable.draw(false);
          }
          else {
            this.showNew = false;
            alert("Error while updating driver against driver license number: " + this.driverModel.licenseNumber);
          }
        });
        this.licenseValidityDateString = "";
        this.showNew = false;
      }
    }
    else {
      alert("License Validity date should be greater than todays date");
    }
  }

  onEdit(data) {
    this.driverPageLogic.formData = new FormData();
    this.savedDriverLicenseImageURL = "";
    this.webCamLogic.selectedOrCapturedDriverLicenseImageURL = "";
    this.webCamLogic.showCapturedImage = false;
    // Initiate new registration.
    this.driverModel = new Driver();
    this.driverModel.driverId = data.driverId;
    this.driverModel.driverName = data.driverName;
    this.driverModel.licenseValidityDate = data.licenseValidityDate;
    this.driverModel.licenseNumber = data.licenseNumber;
    this.driverModel.contactNumber = data.contactNumber;
    this.driverModel.licenseImagePath = data.licenseImagePath;
    this.driverModel.licenseImageInBase64Format = data.licenseImageInBase64Format;
    this.driverModel.createdBy = data.createdBy;
    this.driverModel.modifiedBy = data.modifiedBy;
    this.driverModel.creationTime = data.creationTime;
    this.driverModel.modifiedTime = data.modifiedTime;
    this.driverModel.active = data.active;

    this.licenseValidityDateString = this.driverModel.licenseValidityDate;//licenseValidityDate.toISOString().slice(0,10);
    console.log("Date string: " + this.licenseValidityDateString);
    let that = this;
    this.driverMasterService.getImageAgainstDriverId(this.driverModel.driverId).subscribe(response => {
      if (response.status == "OK") {
        let imageBlob = that.utilityService.base64EncodedStringtoJpegTypeBlob(response.driverUiDto.licenseImageInBase64Format);
        that.setImageUrlToDisplaySavedLicense(imageBlob);
        this.f.licenseNumber.disable();
        // Change submitType to Update.
        that.submitType = 'Update';
        // Display registration entry section.
        that.showNew = true;
      }
      else {
        alert("Error while fetching driver license image for driver license number: " + this.driverModel.licenseNumber);
      }
    });
  }
  setImageUrlToDisplaySavedLicense(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.savedDriverLicenseImageURL = <string>reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
  onFileSelected(event: any) {
    let queuelength = this.fileUploadLogic.fileUploader.queue.length;
    if (queuelength > 0) {
      let fileItem = this.fileUploadLogic.fileUploader.queue[0]._file;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(fileItem);
      this.setImageUrlToDisplaySelectedLicense(fileItem)
      this.driverPageLogic.storeSelectedFileAndClearUploaderQueue();
    }
  }

  setImageUrlToDisplaySelectedLicense(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.webCamLogic.selectedOrCapturedDriverLicenseImageURL = <string>reader.result;
      this.webCamLogic.showCapturedImage = true;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onDelete(data) {
    let that = this;
    if (confirm("this row record will be deleted permenantly ?")) {
      this.driverMasterService.deleteDriverById(data.driverId).subscribe(response => {
        if (response.status = "OK") {
          that.dataTable.draw(false);
        }
        else {
          alert("Error while deleting driver against driver license number: " + data.licenseNumber)
        }
      });
    }
  }

  onCancel() {
    // Hide registration entry section.
    this.showNew = false;
  }

// Tooltip Start



get truckDriverFormControls() { return this.driverDetailsFormGroup.controls; }

onTruckNoTextChanged() {
  console.log("onTruckNoTextChanged method called");
  this.validateTruckTextField(this.truckDriverFormControls.driverName.value);
}
onTruckNoLostFocus() {
  console.log("onTruckNoLostFocus method called");
  this.validateTruckTextField(this.truckDriverFormControls.driverName.value);
}

validateTruckTextField(truckNo: String) {
  if (this.removeWhitespacesFromString(truckNo).length > 0) {
    if (this.truckDriverFormControls.driverName.errors) {
      let truckTooltipMessage: String = "Driver Name is invalid";
      if (this.truckDriverFormControls.driverName.hasError('required')) {
        // truckTooltipMessage = "Container No code is mandatory";
      }
      else if (this.truckDriverFormControls.driverName.hasError('pattern')) {
        // truckTooltipMessage = "Invalid container no";
      }
      this.showTooltip('driverNameIcon', truckTooltipMessage);
    }
    else {
      this.hideTooltip("driverNameIcon");
    }
  }
  else {
    let truckTooltipMessage = "Invalid";
    this.showTooltip("driverNameIcon", truckTooltipMessage);
  }
}




onDriverLicenseNoTextChanged() {
  console.log("onTruckNoTextChanged method called");
  this.validateLicenseTextField(this.truckDriverFormControls.licenseNumber.value);
}
onDriverLicenseNoLostFocus() {
  console.log("onTruckNoLostFocus method called");
  this.validateLicenseTextField(this.truckDriverFormControls.licenseNumber.value);
}

validateLicenseTextField(truckNo: String) {
  if (this.removeWhitespacesFromString(truckNo).length > 0) {
    if (this.truckDriverFormControls.licenseNumber.errors) {
      let truckTooltipMessage: String = "License Number invalid";
      if (this.truckDriverFormControls.licenseNumber.hasError('required')) {
        // truckTooltipMessage = "Container No code is mandatory";
      }
      else if (this.truckDriverFormControls.licenseNumber.hasError('pattern')) {
        // truckTooltipMessage = "Invalid container no";
      }
      this.showTooltip('licenseNumberIcon', truckTooltipMessage);
    }
    else {
      this.hideTooltip("licenseNumberIcon");
    }
  }
  else {
    let truckTooltipMessage = "Invalid";
    this.showTooltip("licenseNumberIcon", truckTooltipMessage);
  }
}



onDriverContctNoTextChanged() {
  console.log("onTruckNoTextChanged method called");
  this.validatContactTextField(this.truckDriverFormControls.contactNumber.value);
}
onDriverContctNoLostFocus() {
  console.log("onTruckNoLostFocus method called");
  this.validatContactTextField(this.truckDriverFormControls.contactNumber.value);
}

validatContactTextField(truckNo: String) {
  if (this.removeWhitespacesFromString(truckNo).length > 0) {
    if (this.truckDriverFormControls.contactNumber.errors) {
      let truckTooltipMessage: String = "contact Number Invalid";
      if (this.truckDriverFormControls.contactNumber.hasError('required')) {
        // truckTooltipMessage = "Container No code is mandatory";
      }
      else if (this.truckDriverFormControls.contactNumber.hasError('pattern')) {
        // truckTooltipMessage = "Invalid container no";
      }
      this.showTooltip('contactNumberIcon', truckTooltipMessage);
    }
    else {
      this.hideTooltip("contactNumberIcon");
    }
  }
  else {
    let truckTooltipMessage = "Invalid";
    this.showTooltip("contactNumberIcon", truckTooltipMessage);
  }
}




onDriverLicenseValadityNoTextChanged() {
  console.log("onTruckNoTextChanged method called");
  this.validatContactTextField(this.truckDriverFormControls.licenseValidityDate.value);
}
onDriverLicenseValadityNoLostFocus() {
  console.log("onTruckNoLostFocus method called");
  this.validatLicenseValadityTextField(this.truckDriverFormControls.licenseValidityDate.value);
}

validatLicenseValadityTextField(truckNo: String) {
  if (this.removeWhitespacesFromString(truckNo).length > 0) {
    if (this.truckDriverFormControls.licenseValidityDate.errors) {
      let truckTooltipMessage: String = "Invalid";
      if (this.truckDriverFormControls.licenseValidityDate.hasError('required')) {
        // truckTooltipMessage = "Container No code is mandatory";
      }
      else if (this.truckDriverFormControls.licenseValidityDate.hasError('pattern')) {
        // truckTooltipMessage = "Invalid container no";
      }
      this.showTooltip('licenseValidityDateIcon', truckTooltipMessage);
    }
    else {
      this.hideTooltip("licenseValidityDateIcon");
    }
  }
  else {
    let truckTooltipMessage = "Invalid";
    this.showTooltip("licenseValidityDateIcon", truckTooltipMessage);
  }
}



  showTooltip(controlId: String, message: String) {
    $("#" + controlId).show();
    $("#" + controlId).tooltip("dispose");
    // $(controlId).tooltip({ title: message, trigger: "hover focus" });

    //for displaying tooltip continuously, it does not need any action to trigger tooltip
    // $("#" + controlId).tooltip({ title: message, trigger: "manual" });
    $("#" + controlId).tooltip({ title: message, trigger: "hover" });
    $("#" + controlId).tooltip('show');

  }

  hideTooltip(controlId: String) {
    $("#" + controlId).tooltip("hide");
    $("#" + controlId).tooltip("dispose");    
    $("#" + controlId).hide();
  }
  removeWhitespacesFromString(valueToCheck: String) {
    return valueToCheck.replace(/\s*/g, "");
  }



}
