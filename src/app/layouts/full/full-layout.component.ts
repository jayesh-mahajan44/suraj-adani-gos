import { Component, OnInit } from '@angular/core';
import { InSurveyPageService } from 'src/app/pages/in-survey-page/in-survey-page.service';
declare var $: any;

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})

export class FullLayoutComponent implements OnInit {

  constructor( private inSurveyPageService: InSurveyPageService){}

  ngOnInit() {
     let that = this;  
    $(document).ready(function ($) {
      that.hideTooltip('registrationNumberIcon');
      that.hideTooltip('batNoIcon');
      that.hideTooltip('rfidIcon');
      $('#registrationNumberIcon').hide();
      $('#batNoIcon').hide();
      $('#rfidIcon').hide();
      
    });
  }
  openNav() {
    // document.getElementById("mySidenav").style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("mySidenav").style.width = "16em";
    // document.getElementById("openNav").style.display="none";
    // document.getElementById("main").hidden=true;
    // document.getElementById("appNavbar").hidden=true;
  }

  closeNav() {
    // document.getElementById("mySidenav").style.width = "0";
    // document.getElementById("main").style.marginLeft = "0";
    document.getElementById("mySidenav").style.width = "0";
    // document.getElementById("openNav").style.display="initial";
    // document.getElementById("main").hidden=false;
    // document.getElementById("appNavbar").hidden=false;
    this.inSurveyPageService.editMode = false;
    this.inSurveyPageService.importTransactionValidationUiDto.isBestPickTransactionType = null;
    this.inSurveyPageService.exportTransactionUiCommonDto.container1 = null;
    this.inSurveyPageService.exportTransactionUiCommonDto.container2 = null;
    this.inSurveyPageService.exportTransactionUiCommonDto.noOfContainer = null;
    this.inSurveyPageService.exportButtonEnableDisable = false;
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

}
