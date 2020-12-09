import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/shared/utility/utility.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { TruckTransactionMappingService } from 'src/app/pages/in-survey-page/truck-transaction-mapping-page/truck-transaction-mapping.service';
import { Router } from '@angular/router';
import { InSurveyPageService } from '../in-survey-page.service';
import { TruckTransactionUiDto } from 'src/app/dto/truck-transaction-ui-dto';
import { EnvService } from 'src/app/env.service';
//import { stringify } from '@angular/core/src/render3/util';
//import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-in-survey-page',
  templateUrl: './truck-transaction-mapping-page.component.html',
  styleUrls: ['./truck-transaction-mapping-page.component.scss']
})
export class TruckTransactionMappingPageComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private truckTransactionMappingService: TruckTransactionMappingService, private utilityService: UtilityService, private chRef: ChangeDetectorRef, private router: Router,private inSurveyPageService:InSurveyPageService,public env: EnvService ) {
    this.utilityService.componentTitle = "TRUCK TRANSACTION MAPPING";
    console.log("in constructor");
  }
  truckFormGroup: FormGroup;
  // transactionFormGroup: FormGroup;
  batNoTooltip: String;
  truckNoTooltip: String;
  redirectToPage: boolean = true;
  ngOnInit() {

console.log(this.env.apiUrl)
    $(document).ready(function($) {
      $('#truckNoIcon').hide();
      $('#batNoIcon').hide();
      //$('[data-toggle="tooltip"]').tooltip();
      // $('#truckNoRequiredError').tooltip();
      // $('#truckNoPatternError').tooltip();
    });
    let truckRegistrationNumberRegex = /^((AP)|(AR)|(AS)|(BR)|(CG)|(GA)|(GJ)|(HR)|(HP)|(JK)|(JH)|(KA)|(KL)|(MP)|(MH)|(MN)|(ML)|(MZ)|(NL)|(OR)|(PB)|(RJ)|(SK)|(TN)|(TR)|(UK)|(UP)|(WB)|(TN)|(TR)|(AN)|(CH)|(DH)|(DD)|(DL)|(LD)|(PY)){1,1}([0-9]){2,2}([a-zA-Z]){2,2}([0-9]){4,4}$/;
    let batNumberRegex = /^[a-zA-Z0-9]{4,6}$/;
    this.truckFormGroup = this.formBuilder.group({
      truckNo: ['', [Validators.required, Validators.pattern(truckRegistrationNumberRegex)]],
      batNo: ['', [Validators.required, Validators.pattern(batNumberRegex)]],
      importTransactionCheckbox: [],
      exportTransactionCheckbox: []
    });
    // this.transactionFormGroup = this.formBuilder.group( 
    //   {

    //   }
    // );

    console.log("testing");
  }
  get f() { return this.truckFormGroup.controls; }

  onTruckNoTextChanged(txtTruckNo: string) {
    if (txtTruckNo.replace(/\s*/g, "").length > 0) {
      console.log("disabling batNo field");
      this.f.batNo.disable();
      $('#batNoIcon').hide();
      $('#batNoIcon').tooltip("dispose");
    }
    else {
      this.f.batNo.enable();
      this.batNoTooltip = "Bat No is mandatory";
      $('#batNoIcon').show();
      $('#batNoIcon').tooltip({ title: this.batNoTooltip, trigger: "hover" });
      $('#batNoIcon').tooltip({ title: this.batNoTooltip});

    }
    if (this.f.truckNo.errors) {
      if (this.f.truckNo.hasError('required')) {
        this.truckNoTooltip = "Truck No is mandatory";
      }
      else if (this.f.truckNo.hasError('pattern')) {
        this.truckNoTooltip = "Invalid Truck No";
      }
      console.log("tooltip initialized");
      let that = this;
      $(document).ready(($) => {
        $('#truckNoIcon').show();
        $('#truckNoIcon').tooltip("dispose");
        // $('#truckNoIcon').tooltip({ title: that.truckNoTooltip, trigger: "hover" });
        $('#truckNoIcon').tooltip({ title: that.truckNoTooltip});

        //this.chRef.detectChanges();
        // var $this = $(this);
        console.log("tooltip title: " + that.truckNoTooltip);
      });
      //this.chRef.detectChanges();
    }
    else {
      $(document).ready(($) => {
        // $('[data-toggle="tooltip"]').tooltip('hide');
        //var $this = $(this);
        //$('#truckNoIcon').tooltip('hide');
        $('#truckNoIcon').tooltip("dispose");
        $('#truckNoIcon').hide();
        console.log("tooltip title: " + this.truckNoTooltip);
      });
    }
  }

  onBatNoTextChanged(txtBatNo: string) {
    if (txtBatNo.replace(/\s*/g, "").length > 0) {
      console.log("disabling rfid tag field");
      this.f.truckNo.disable();
      $('#truckNoIcon').hide();
      $('#truckNoIcon').tooltip("dispose");
    }
    else {
      this.f.truckNo.enable();
      this.truckNoTooltip = "Truck No is mandatory";
      $('#truckNoIcon').show();
      // $('#truckNoIcon').tooltip({ title: this.truckNoTooltip, trigger: "hover" });
      $('#truckNoIcon').tooltip({ title: this.truckNoTooltip });

    }
    if (this.f.batNo.errors) {
      if (this.f.batNo.hasError('required')) {
        this.batNoTooltip = "Bat No is mandatory";
      }
      else if (this.f.batNo.hasError('pattern')) {
        this.batNoTooltip = "Invalid BatNo";
      }
      //this.chRef.detectChanges();
      let that = this;
      $(document).ready(function($) {
        //$('[data-toggle="tooltip"]').tooltip();
        // $('#batNoRequiredError').tooltip();
        // $('#truckNoPatternError').tooltip();
        $('#batNoIcon').show();
        $('#batNoIcon').tooltip("dispose");
        // $('#batNoIcon').tooltip({ title: that.batNoTooltip, trigger: "hover" });
        $('#batNoIcon').tooltip({ title: that.batNoTooltip });

        //this.chRef.detectChanges();
        // var $this = $(this);
        console.log("tooltip title: " + that.batNoTooltip);
      });

    }
    else {
      $(document).ready(($) => {
        // $('[data-toggle="tooltip"]').tooltip('hide');
        //var $this = $(this);
        //$('#truckNoIcon').tooltip('hide');
        $('#batNoIcon').tooltip("dispose");
        $('#batNoIcon').hide();
        console.log("tooltip title: " + this.truckNoTooltip);
      });
    }
  }

  onTruckNoLostFocus() {
    if (this.f.truckNo.errors) {
      if (this.f.truckNo.hasError('required')) {
        this.truckNoTooltip = "Truck No is mandatory";
      }
      else if (this.f.truckNo.hasError('pattern')) {
        this.truckNoTooltip = "Invalid Truck No";
      }
      console.log("tooltip initialized");
      $(document).ready(($) => {
        //displays icon
        $('#truckNoIcon').show();
        //disposes old tooltip instance, if any
        $('#truckNoIcon').tooltip("dispose");
        //intitalizes new tooltip
        // $('#truckNoIcon').tooltip({ title: this.truckNoTooltip, trigger: "hover" });
        $('#truckNoIcon').tooltip({ title: this.truckNoTooltip});

        // var $this = $(this);
        console.log("tooltip title: " + this.truckNoTooltip);
      });
      //this.chRef.detectChanges();
    }
    else {
      $(document).ready(($) => {
        // $('[data-toggle="tooltip"]').tooltip('hide');
        //var $this = $(this);
        $('#truckNoIcon').tooltip('hide');
        //$('#truckNoIcon').hide();
        $('#truckNoIcon').tooltip("dispose");
        console.log("tooltip title: " + this.truckNoTooltip);
      });
    }
  }
  onBatNoLostFocus() {
    if (this.f.batNo.errors) {
      if (this.f.batNo.hasError('required')) {
        this.batNoTooltip = "Bat No is mandatory";
      }
      else if (this.f.truckNo.hasError('pattern')) {
        this.batNoTooltip = "Invalid Bat No";
      }
      console.log("tooltip initialized");
      $(document).ready(($) => {
        $('#batNoIcon').show();
        $('#batNoIcon').tooltip("dispose");
        // $('#batNoIcon').tooltip({ title: this.batNoTooltip, trigger: "hover" });
        $('#batNoIcon').tooltip({ title: this.batNoTooltip});

        // var $this = $(this);
        console.log("batNo tooltip title: " + this.batNoTooltip);
      });
      //this.chRef.detectChanges();
    }
    else {
      $(document).ready(($) => {
        // $('[data-toggle="tooltip"]').tooltip('hide');
        //var $this = $(this);
        $('#batNoIcon').tooltip('hide');
        //$('#truckNoIcon').hide();
        $('#batNoIcon').tooltip("dispose");
        console.log("batNo tooltip title: " + this.batNoTooltip);
      });
    }
  }

  redirectToNextPage(){
       
    
    if (this.f.importTransactionCheckbox.value) {

      if (this.f.exportTransactionCheckbox.value === false || this.f.exportTransactionCheckbox.value === null) {

        this.router.navigate(['/home/in-survey/import-transaction-mapping'])

      }else if (this.f.exportTransactionCheckbox.value) {
        
        this.inSurveyPageService.componentToComponentRedirect = this.redirectToPage 
        this.router.navigate(['/home/in-survey/export-transaction-mapping'])
        
      }
    } else if (this.f.exportTransactionCheckbox.value) {

      if (this.f.importTransactionCheckbox.value === false || this.f.importTransactionCheckbox.value === null) {

        this.router.navigate(['/home/in-survey/export-transaction-mapping'])
      }

    }
  }

  OnSubmitButtonClick() {

   // this.redirectToNextPage();

    //MH04BJ2230
    this.inSurveyPageService.exportTransactionCheckbox = this.f.exportTransactionCheckbox.value
    this.inSurveyPageService.truckNumber = this.f.truckNo.value
    if (this.f.batNo.value != null && this.f.batNo.value.replace(/\s/g, "").length > 0) {
      this.truckTransactionMappingService.validateTruckByBatNoAndCreateTruckTransaction(this.f.batNo.value).subscribe( truckTransactionApiResponse => {

        if (truckTransactionApiResponse.status === "CREATED") {
          let truckTransactionUiDto: TruckTransactionUiDto = new TruckTransactionUiDto();
          this.inSurveyPageService.registrationNumber = this.f.batNo.value;
          this.inSurveyPageService.truckTransactionUiDto.truckId = truckTransactionApiResponse.truckTransactionUiDto.truckId;
          this.inSurveyPageService.truckTransactionId= truckTransactionApiResponse.truckTransactionUiDto.truckTransactionId;
          alert(truckTransactionApiResponse.message);
          this.redirectToNextPage();

        }else{
           
          alert("error : "+ truckTransactionApiResponse.message);
        }
      
      });
    }
    else if (this.f.truckNo.value != null && this.f.truckNo.value.replace(/\s/g, "").length > 0) {
      this.truckTransactionMappingService.validateTruckByTruckRegistrationNoAndCreateTruckTransaction(this.f.truckNo.value).subscribe((truckTransactionApiResponse) => {

        if (truckTransactionApiResponse.status === "CREATED") {
        
          this.inSurveyPageService.registrationNumber = this.f.truckNo.value;
          this.inSurveyPageService.truckId = truckTransactionApiResponse.truckTransactionUiDto.truckId;
          this.inSurveyPageService.truckTransactionId= truckTransactionApiResponse.truckTransactionUiDto.truckTransactionId;
        this.redirectToNextPage();
        alert(truckTransactionApiResponse.message);

        }else{
           
          alert("error : "+ truckTransactionApiResponse.message);
         
        }
   
       
      });
    }
  }
}
