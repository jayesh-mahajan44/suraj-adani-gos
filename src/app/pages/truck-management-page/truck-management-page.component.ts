import { Component, OnInit , OnDestroy, AfterViewChecked, EventEmitter} from '@angular/core';
// import * as $ from 'jquery';
// import 'datatables.net';
import 'datatables.net-bs4';
import { ChangeDetectorRef } from '@angular/core';
import { TruckMasterService } from 'src/app/pages/truck-management-page/truck-master.service';
import { UtilityService } from 'src/app/shared/utility/utility.service';
import { Truck } from 'src/app/dto/truck';
import { HttpClient } from '@angular/common/http';
import { TruckStatus, TruckStatusEnum } from './truck-status-enum';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Output } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-truck-management-page',
  templateUrl: './truck-management-page.component.html',
  styleUrls: ['./truck-management-page.component.css']
})
export class TruckManagementPageComponent implements OnInit,OnDestroy  {
  urlParam;
  truckDetailsFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private utilityService: UtilityService, private truckMasterService: TruckMasterService, private chref: ChangeDetectorRef,private router:Router) {
    this.utilityService.componentTitle = "TRUCK MANAGEMENT";
  }
  private dataTable: any;
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  truckModel: Truck;
  truckStatusList: TruckStatus[] = new Array<TruckStatus>();
  get f() { return this.truckDetailsFormGroup.controls; }
  ngOnInit() {
    this.fillTruckStatusDropdown();
    let registrationNumberRegex = /^((AP)|(AR)|(AS)|(BR)|(CG)|(GA)|(GJ)|(HR)|(HP)|(JK)|(JH)|(KA)|(KL)|(MP)|(MH)|(MN)|(ML)|(MZ)|(NL)|(OR)|(PB)|(RJ)|(SK)|(TN)|(TR)|(UK)|(UP)|(WB)|(TN)|(TR)|(AN)|(CH)|(DH)|(DD)|(DL)|(LD)|(PY)){1,1}([0-9]){2,2}([a-zA-Z]){2,2}([0-9]){4,4}$/;
    let batNumberRegex = /^[a-zA-Z0-9]{4,6}$/;
    let rfidTagIdRegex = /^[a-zA-Z0-9]{0,24}$/;
    this.truckDetailsFormGroup = this.formBuilder.group({
      registrationNumber: ['', [Validators.required, Validators.pattern(registrationNumberRegex)]],
      batNo: ['', [Validators.required, Validators.pattern(batNumberRegex)]],
      rfidTagId: ['', [Validators.required, Validators.pattern(rfidTagIdRegex)]],
      truckStatusDropDown: []
    });
    let that = this;
    // "url": "http://localhost:9081/sga-ui-registration-service/ui/reg/v1/trucks/datatable",
    $(document).ready(function () {
      that.dataTable = $('#example').DataTable({
        "bLengthChange": false,
        "retrieve": "true",
        "ajax": {
          "url": "http://localhost:9080/sga-registration-facade-service/ui/reg/v1/trucks/datatable",
//          "url": "http://localhost:9081/ui/reg/v1/trucks/datatable",          
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
        ///////////setting data in table by getting from source using key /////////////
        "columns": [
          { "data": "truckId", "visible": false },
          { "data": "registrationNumber" },
          { "data": "batNo" },
          { "data": "rfidTagId" },
          { "data": "status" },
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

    
    $(document).ready(function ($) {
      that.hideTooltip('registrationNumberIcon');
      that.hideTooltip('batNoIcon');
      that.hideTooltip('rfidIcon');
      $('#registrationNumberIcon').hide();
      $('#batNoIcon').hide();
      $('#rfidIcon').hide();
      
    });

    $('#registrationNumberIcon').hide();
    $('#batNoIcon').hide();
    $('#rfidIcon').hide();


    // this.urlParam = this.router.url.split("/");

    // if(!this.urlParam.includes("truck-management")){
    //   this.hideTooltip( 'registrationNumberIcon',('Invalid' || 'Registration Number is Invalid' ))
    //   this.hideTooltip( 'batNoIcon', ('Invalid' ||'Bat number is Invalid'))
    //   this.hideTooltip( 'rfidIcon' , ('Invalid' || " RFID Tag Id is Invalid"))
    // }
    // console.log(this.urlParam)
    
  
  }

  @Output() newItemEvent = new EventEmitter<object>();

  addNewItem(value: object) {
    this.newItemEvent.emit(value);
  }
  

  get truckDriverFormControls() { return this.truckDetailsFormGroup.controls; }

  onRegistraionNoTextChanged() {
    console.log("onTruckNoTextChanged method called");
    this.validateRegistraionNoTextField(this.truckDriverFormControls.registrationNumber.value);
  }
  onRegistraionNoLostFocus() {
    console.log("onTruckNoLostFocus method called");
    this.validateRegistraionNoTextField(this.truckDriverFormControls.registrationNumber.value);
  }

  validateRegistraionNoTextField(truckNo: String) {
    if (this.removeWhitespacesFromString(truckNo).length > 0) {
      if (this.truckDriverFormControls.registrationNumber.errors &&  (this.truckDriverFormControls.registrationNumber.touched || this.truckDriverFormControls.registrationNumber.dirty)) {
        let truckTooltipMessage: String = " Registration Number is Invalid";
        if (this.truckDriverFormControls.registrationNumber.hasError('required')) {
          truckTooltipMessage = "Registration Number is mandatory";


        this.showTooltip('registrationNumberIcon', truckTooltipMessage);


        
        }
        else if (this.truckDriverFormControls.registrationNumber.hasError('pattern')) {
          // truckTooltipMessage = "Invalid container no";
        }
        this.showTooltip('registrationNumberIcon', truckTooltipMessage);
        
  //   setTimeout(function() {
  //  this.hideTooltip("registrationNumberIcon");
  //     },500);   
  

      }
      else  {
        this.hideTooltip("registrationNumberIcon");
       
      }
    }
    else {
      let truckTooltipMessage = "Invalid";
      this.showTooltip("registrationNumberIcon", truckTooltipMessage);
     
  //     setTimeout(function() {
  //  this.hideTooltip("registrationNumberIcon");
  //       },500);   
 
    }
  }

onBatNoLostFocus() {
  console.log("onTruckNoLostFocus method called");
  // this.validatebatNoTextField(this.truckDriverFormControls.batNo.value);
}

batNoTooltip:string;

onBatNoTextChanged(txtBatNo: string) {
  if (this.removeWhitespacesFromString(txtBatNo).length > 0) {
    console.log("disabling rfid tag field");
    
    this.validatebatNoTextField(this.truckDriverFormControls.batNo.value);
   
    this.f.rfidTagId.disable();
this.hideTooltip( 'rfidIcon' , ('Invalid' || " RFID Tag Id is Invalid"))
    $('#rfidIcon').hide();
    $('#rfidIcon').tooltip("dispose");

  }
  else {
    this.f.rfidTagId.enable();
    this.hideTooltip( 'batNoIcon', ('Invalid' ||'Bat number is Invalid'))

    this.f.batNo.enable();
      this.batNoTooltip = "Bat No is mandatory";
      $('#rfidIcon').show();
      $('#rfidIcon').tooltip({ title: this.batNoTooltip, trigger: "hover" });
      $('#rfidIcon').tooltip({ title: this.batNoTooltip});

  }



}

validatebatNoTextField(txtBatNo: String) {
  if (this.removeWhitespacesFromString(txtBatNo).length > 0) {
    if ( this.truckDriverFormControls.batNo.errors ) {
      // document.getElementById('batNoIcon').style.display = 'block'
      let truckTooltipMessage: String = "Bat number is Invalid";
      if (this.truckDriverFormControls.batNo.hasError('required')) {
        // truckTooltipMessage = "Container No code is mandatory";
      }
      else if (this.truckDriverFormControls.batNo.hasError('pattern')) {
        // truckTooltipMessage = "Invalid container no";
        this.showTooltip('batNoIcon', truckTooltipMessage);
      }
      // this.showTooltip('batNoIcon', truckTooltipMessage);
    }
    else {
      this.hideTooltip("batNoIcon");
    }
  }
  else {
    let truckTooltipMessage = "Invalid";
    this.showTooltip("batNoIcon", truckTooltipMessage);
  }
}


onRfidTagIdLostFocus() {
  console.log("onTruckNoLostFocus method called");
  this.validateRfidTagIdTextField(this.truckDriverFormControls.rfidTagId.value);
}

onRfidTagIdTextChanged(txtRfidTagId: string) {
  if (txtRfidTagId.replace(/\s*/g, "").length > 0) {
    console.log("disabling batNo field");
    
  this.validateRfidTagIdTextField(this.truckDriverFormControls.rfidTagId.value);
  this.f.batNo.disable();

  }
  else {
    this.f.batNo.enable();
  this.hideTooltip( 'batNoIcon', ('Invalid' ||'Bat number is Invalid'))


  }
}


validateRfidTagIdTextField(txtRfidTagId: String) {
  if (this.removeWhitespacesFromString(txtRfidTagId).length > 0) {
    if (this.truckDriverFormControls.rfidTagId.errors ) {
      let truckTooltipMessage: String = " RFID Tag Id is Invalid";
      // if (this.truckDriverFormControls.rfidTagId.hasError('required')) {
      //   // truckTooltipMessage = "Container No code is mandatory";
      // }
      // else if (this.truckDriverFormControls.rfidTagId.hasError('pattern')) {
      //   // truckTooltipMessage = "Invalid container no";
      // }
      this.showTooltip('rfidIcon', truckTooltipMessage);
    }
    else {
      this.hideTooltip("rfidIcon");
    }
  }
  else {
    let truckTooltipMessage = "Invalid";
    this.showTooltip("rfidIcon", truckTooltipMessage);
  }
}


  fillTruckStatusDropdown() {
    let truckStatusForActive = new TruckStatus();
    truckStatusForActive.statusId = TruckStatusEnum.Active;
    truckStatusForActive.status = TruckStatusEnum[truckStatusForActive.statusId];
    this.truckStatusList.push(truckStatusForActive);

    let truckStatusForInactive = new TruckStatus();
    truckStatusForInactive.statusId = TruckStatusEnum.Inactive;
    truckStatusForInactive.status = TruckStatusEnum[truckStatusForInactive.statusId];
    this.truckStatusList.push(truckStatusForInactive);

    let truckStatusForBlackListed = new TruckStatus();
    truckStatusForBlackListed.statusId = TruckStatusEnum.BlackListed;
    truckStatusForBlackListed.status = TruckStatusEnum[truckStatusForBlackListed.statusId];
    this.truckStatusList.push(truckStatusForBlackListed);
  }

 
  
 

  
 

  onNew() {
    let that = this;
    this.truckDetailsFormGroup.reset();
    this.truckModel = new Truck();
    //this.isRegistrationNumberToBeDisabled = false;
    this.f.registrationNumber.enable();
    this.f.batNo.enable();
    this.f.rfidTagId.enable();
    this.truckModel.status = "Active";
    // Change submitType to 'Save'.
    this.submitType = 'Save';
    // display Truck registration entry section.
    this.showNew = true;
    // that.truckDriverFormControls.registrationNumber.setValue("");
    // that.truckDriverFormControls.batNo.setValue("");
    //  that.truckDriverFormControls.rfidTagId.setValue("");
    // that.hideTooltip('registrationNumberIcon');
    // that.hideTooltip('batNoIcon');
    // that.hideTooltip('rfidIcon');
  }

  onSave() {
    if (this.submitType === 'Save') {
      let that = this;
      this.truckModel.active = true;
      this.truckMasterService.addTruck(this.truckModel).subscribe(response => {
        if (response.status == "CREATED") {
          let addedTruck = new Truck();
          addedTruck.truckId = response.truckUiDto.truckId;
          addedTruck.tagId = response.truckUiDto.tagId;
          addedTruck.status = response.truckUiDto.status;
          addedTruck.rfidTagId = response.truckUiDto.rfidTagId;
          addedTruck.registrationNumber = response.truckUiDto.registrationNumber;
          addedTruck.modifiedTime = response.truckUiDto.modifiedTime;
          addedTruck.modifiedBy = response.truckUiDto.modifiedBy;
          addedTruck.creationTime = response.truckUiDto.creationTime;
          addedTruck.createdBy = response.truckUiDto.createdBy;
          addedTruck.batNo = response.truckUiDto.batNo;
          addedTruck.active = response.truckUiDto.active;
          that.dataTable.draw();
          that.truckDriverFormControls.registrationNumber.setValue("");
          that.truckDriverFormControls.batNo.setValue("");
           that.truckDriverFormControls.rfidTagId.setValue("");

          that.hideTooltip('registrationNumberIcon');
      that.hideTooltip('batNoIcon');
      that.hideTooltip('rfidIcon');
        }
        else {
          alert("Error message: " + response.message)
        }
      });
    }
    else {
      let that = this;
      this.truckMasterService.updateTruck(this.truckModel).subscribe((response) => {
        if (response.status == "OK") {
          let addedTruck = new Truck();
          addedTruck.truckId = response.truckUiDto.truckId;
          addedTruck.tagId = response.truckUiDto.tagId;
          addedTruck.status = response.truckUiDto.status;
          addedTruck.rfidTagId = response.truckUiDto.rfidTagId;
          addedTruck.registrationNumber = response.truckUiDto.registrationNumber;
          addedTruck.modifiedTime = response.truckUiDto.modifiedTime;
          addedTruck.modifiedBy = response.truckUiDto.modifiedBy;
          addedTruck.creationTime = response.truckUiDto.creationTime;
          addedTruck.createdBy = response.truckUiDto.createdBy;
          addedTruck.batNo = response.truckUiDto.batNo;
          addedTruck.active = response.truckUiDto.active;
          that.dataTable.draw(false);
        }
        else {
          alert("Error message: " + response.message);
        }
      });
    }
    this.showNew = false;
  }

  onEdit(data) {
    // Initiate new registration.
    this.truckModel = new Truck();
    this.truckModel.truckId = data.truckId;
    this.truckModel.tagId = data.tagId;
    this.truckModel.status = data.status;
    this.truckModel.rfidTagId = data.rfidTagId;
    this.truckModel.registrationNumber = data.registrationNumber;
    this.truckModel.batNo = data.batNo;
    this.truckModel.active = data.active;
    this.truckModel.createdBy = data.createdBy;
    this.truckModel.creationTime = data.creationTime;
    this.truckModel.modifiedBy = data.modifiedBy;
    this.truckModel.modifiedTime = data.modifiedTime;
    this.f.registrationNumber.disable();
    // Change submitType to Update.
    this.submitType = 'Update';
    // Display registration entry section.
    this.showNew = true;
  }

  onDelete(data) {
    let that = this;
    if (confirm("this row record will be deleted permenantly ?")) {
      this.truckMasterService.deleteTruckById(data.truckId).subscribe((response) => {
        if (response.status == "OK") {
          that.dataTable.draw(false);
        }
        else {
          alert("Error message: " + response.message);
        }
      });
    }
  }

  onCancel() {
    // Hide registration entry section.
    this.showNew = false;
  //  onclick =  " $('#registrationNumberIcon').remove();"

  }

  deleteValidation(){
    this.hideTooltip( 'registrationNumberIcon',('Invalid' || 'Registration Number is Invalid' ))
this.hideTooltip( 'batNoIcon', ('Invalid' ||'Bat number is Invalid'))
this.hideTooltip( 'rfidIcon' , ('Invalid' || " RFID Tag Id is Invalid"))
  }

  hideTooltip(controlId: String,message?: String) {
    //$("#" + controlId).tooltip("hide");
    $("#" + controlId).tooltip("dispose");   
    $("#" + controlId).tooltip({ title: message});

    $("#" + controlId).hide();
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

  ngOnDestroy() {
    console.log("In ngOnDestroy method of Truck Management component");
    // this.hideTooltip('registrationNumberIcon');
    // this.hideTooltip('batNoIcon');
    // this.hideTooltip('rfidIcon');
  
    console.log("Truck Driver Mapping component destroyed");
    this.hideTooltip( 'registrationNumberIcon',('Invalid' || 'Registration Number is Invalid' ))
     this.hideTooltip( 'batNoIcon', ('Invalid' ||'Bat number is Invalid'))
     this.hideTooltip( 'rfidIcon' , ('Invalid' || " RFID Tag Id is Invalid"))
  }

  removeWhitespacesFromString(valueToCheck: String) {
    return valueToCheck.replace(/\s*/g, "");
  }

}
