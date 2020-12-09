import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
// import * as $ from 'jquery';
import { UtilityService } from "src/app/shared/utility/utility.service";
import { TruckUiDto } from "src/app/dto/truck-ui-dto";
import { DriverUiDto } from "src/app/dto/driver-ui-dto";
import { TruckDriverMappingPageService } from "./truck-driver-mapping-page.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
declare var $: any;

@Component({
  selector: "app-truck-driver-mapping-page",
  templateUrl: "./truck-driver-mapping-page.component.html",
  styleUrls: ["./truck-driver-mapping-page.component.scss"],
})
export class TruckDriverMappingPageComponent implements OnInit, OnDestroy {
  truckDriverFormGroup: FormGroup;
  isDriverLicenseSectionToBeDisabled = true;
  isTruckValidationSectionToBeDisabled = false;
  constructor(
    private changeRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private truckDriverMappingPageService: TruckDriverMappingPageService
  ) {
    this.utilityService.componentTitle = "TRUCK DRIVER MAPPING";
  }

  truckObject: TruckUiDto = new TruckUiDto();
  truckObjectToDisplay: TruckUiDto = new TruckUiDto();
  driverObject: DriverUiDto = new DriverUiDto();
  receivedLicenceNumber = "";

  ngOnInit() {
    let that = this;
    $(document).ready(function ($) {
      that.hideTooltip("truckNoIcon");
      that.hideTooltip("driverLicenseNoIcon");
    });

    let truckRegistrationNumberRegex = /^((AP)|(AR)|(AS)|(BR)|(CG)|(GA)|(GJ)|(HR)|(HP)|(JK)|(JH)|(KA)|(KL)|(MP)|(MH)|(MN)|(ML)|(MZ)|(NL)|(OR)|(PB)|(RJ)|(SK)|(TN)|(TR)|(UK)|(UP)|(WB)|(TN)|(TR)|(AN)|(CH)|(DH)|(DD)|(DL)|(LD)|(PY)){1,1}([0-9]){2,2}([a-zA-Z]){2,2}([0-9]){4,4}$/;
    let driverLicenseNumberRegex = /^((AP)|(AR)|(AS)|(BR)|(CG)|(GA)|(GJ)|(HR)|(HP)|(JK)|(JH)|(KA)|(KL)|(MP)|(MH)|(MN)|(ML)|(MZ)|(NL)|(OR)|(PB)|(RJ)|(SK)|(TN)|(TR)|(UK)|(UP)|(WB)|(TN)|(TR)|(AN)|(CH)|(DH)|(DD)|(DL)|(LD)|(PY)){1,1}([0-9]){13,13}$/;
    this.truckDriverFormGroup = this.formBuilder.group({
      truckNo: [
        "",
        [Validators.required, Validators.pattern(truckRegistrationNumberRegex)],
      ],
      driverLicenseNo: [
        "",
        [Validators.required, Validators.pattern(driverLicenseNumberRegex)],
      ],
    });
  }

  ngOnDestroy() {
    console.log("In ngOnDestroy method of Truck Driver Mapping component");
    this.hideTooltip("truckNoIcon");
    this.hideTooltip("driverLicenseNoIcon");
    // this.changeRef.detectChanges();
    console.log("Truck Driver Mapping component destroyed");
  }

  get truckDriverFormControls() {
    return this.truckDriverFormGroup.controls;
  }
  onTruckNoTextChanged() {
    console.log("onTruckNoTextChanged method called");
    this.validateTruckTextField(this.truckDriverFormControls.truckNo.value);
  }
  onTruckNoLostFocus() {
    console.log("onTruckNoLostFocus method called");
    this.validateTruckTextField(this.truckDriverFormControls.truckNo.value);
  }

  validateTruckTextField(truckNo: String) {
    if (this.removeWhitespacesFromString(truckNo).length > 0) {
      if (this.truckDriverFormControls.truckNo.errors) {
        let truckTooltipMessage: String = "Invalid";
        if (this.truckDriverFormControls.truckNo.hasError("required")) {
          // truckTooltipMessage = "Container No code is mandatory";
        } else if (this.truckDriverFormControls.truckNo.hasError("pattern")) {
          // truckTooltipMessage = "Invalid container no";
        }
        this.showTooltip("truckNoIcon", truckTooltipMessage);
      } else {
        this.hideTooltip("truckNoIcon");
      }
    } else {
      let truckTooltipMessage = "Invalid";
      this.showTooltip("truckNoIcon", truckTooltipMessage);
    }
  }

  onDriverLicenseNoLostFocus() {
    this.validateDriverTextField(
      this.truckDriverFormControls.driverLicenseNo.value
    );
  }

  onDriverLicenseNoTextChanged() {
    this.validateDriverTextField(
      this.truckDriverFormControls.driverLicenseNo.value
    );
  }
  validateDriverTextField(driverNo: String) {
    if (this.removeWhitespacesFromString(driverNo).length > 0) {
      if (this.truckDriverFormControls.driverLicenseNo.errors) {
        let driverTooltipMessage: String = "Invalid";
        if (this.truckDriverFormControls.driverLicenseNo.hasError("required")) {
          // driverTooltipMessage = "Driver License No is mandatory";
        } else if (
          this.truckDriverFormControls.driverLicenseNo.hasError("pattern")
        ) {
          // driverTooltipMessage = "Invalid Driver License No";
        }
        this.showTooltip("driverLicenseNoIcon", driverTooltipMessage);
      } else {
        this.hideTooltip("driverLicenseNoIcon");
      }
    } else {
      let driverTooltipMessage = "Emtpy";
      this.showTooltip("driverLicenseNoIcon", driverTooltipMessage);
    }
  }

  validateTruck() {
    let truckNo = this.truckDriverFormControls.truckNo.value;
    let that = this;
    this.truckDriverMappingPageService
      .validateTruckForDriverMapping(truckNo)
      .subscribe((response) => {
        if (response.truckUiDto) {
          that.truckObject = response.truckUiDto;
          if (that.truckObject.licenseNumber) {
            that.truckDriverFormControls.driverLicenseNo.setValue(
              that.truckObject.licenseNumber
            );
          }
          that.isDriverLicenseSectionToBeDisabled = false;
          that.isTruckValidationSectionToBeDisabled = true;
        } else {
          alert(response.message);
        }
      });
  }

  openModalAndDisplayMappedDetails() {
    $("#exampleModal").modal();
  }

  mapTruckAndDriver() {
    let that = this;
    this.truckObject.licenseNumber = this.truckDriverFormControls.driverLicenseNo.value;
    this.truckDriverMappingPageService
      .mapDriverToTruck(this.truckObject)
      .subscribe((response) => {
        if (response.truckUiDto) {
          that.truckObject = response.truckUiDto;
          that.isDriverLicenseSectionToBeDisabled = true;
          that.isTruckValidationSectionToBeDisabled = false;
          that.openModalAndDisplayMappedDetails();
          that.isDriverLicenseSectionToBeDisabled = true;
          that.isTruckValidationSectionToBeDisabled = false;
          that.truckDriverFormControls.truckNo.setValue("");
          that.truckDriverFormControls.driverLicenseNo.setValue("");
          that.hideTooltip("truckNoIcon");
          that.hideTooltip("driverLicenseNoIcon");
          //this.truckObject= null;
          // alert(response.message)
        } else {
          alert(response.message);
        }
      });
  }

  showTooltip(controlId: String, message: String) {
    $("#" + controlId).show();
    $("#" + controlId).tooltip("dispose");
    // $(controlId).tooltip({ title: message, trigger: "hover focus" });

    //for displaying tooltip continuously, it does not need any action to trigger tooltip
    // $("#" + controlId).tooltip({ title: message, trigger: "manual" });
    $("#" + controlId).tooltip({ title: message, trigger: "hover" });
    $("#" + controlId).tooltip("show");
  }

  hideTooltip(controlId: String) {
    //$("#" + controlId).tooltip("hide");
    $("#" + controlId).tooltip("dispose");
    $("#" + controlId).hide();
  }
  // hideTooltip(controlId: String,message?: String) {
  //   //$("#" + controlId).tooltip("hide");
  //   $("#" + controlId).tooltip("dispose");
  //   $("#" + controlId).tooltip({ title: message});

  //   $("#" + controlId).hide();
  // }

  removeWhitespacesFromString(valueToCheck: String) {
    return valueToCheck.replace(/\s*/g, "");
  }
}
