import { Component, OnInit } from '@angular/core';
import { InGateService } from './in-gate.service';
import { SurveyImagesUiDto } from 'src/app/dto/inGateDto/survey-images-ui-dto';
import { DamageInspectionImagesUiDto } from 'src/app/dto/inGateDto/damage-inspection-images-ui-dto';
import { TruckTransactionUiDtos } from 'src/app/dto/inGateDto/truck-transaction-ui-dtos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApproveTransactionDto } from 'src/app/dto/inGateDto/approve-transaction-dto';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
declare var $: any;
@Component({
  selector: 'app-in-gate',
  templateUrl: './in-gate.component.html',
  styleUrls: ['./in-gate.component.scss']
})

export class InGateComponent implements OnInit {

  truckTransactionsFormGroup: FormGroup;
  truckTransactionList: TruckTransactionUiDtos;
  surveyImagesList: SurveyImagesUiDto[];
  approveTransactionDto: ApproveTransactionDto;
  damageInspectionImagesList: DamageInspectionImagesUiDto[];
  slideIndex = 1
  disableBUtton: boolean;
  LaneDataDto = [
    {
      name: "Lane1"
    },
    { name: "Lane2" },
    { name: "Lane3" },
    { name: "Lane4" }
  ]
  public show = true;
  loading: boolean;

  constructor(private ingateservice: InGateService, private formBuilder: FormBuilder, private sharedServiceService: SharedServiceService) {
    let registrationNumberRegex = /^((AP)|(AR)|(AS)|(BR)|(CG)|(GA)|(GJ)|(HR)|(HP)|(JK)|(JH)|(KA)|(KL)|(MP)|(MH)|(MN)|(ML)|(MZ)|(NL)|(OR)|(PB)|(RJ)|(SK)|(TN)|(TR)|(UK)|(UP)|(WB)|(TN)|(TR)|(AN)|(CH)|(DH)|(DD)|(DL)|(LD)|(PY)){1,1}([0-9]){2,2}([a-zA-Z]){2,2}([0-9]){4,4}$/;
    this.truckTransactionsFormGroup = this.formBuilder.group({

      truckNumber: ['', [Validators.required, , Validators.pattern(registrationNumberRegex)]]
      //   ,Validators.pattern(registrationNumberRegex)
    })
  }

  TtruckDetail:any;
  ContainerImage:any;
  containerViewImage:any;

  ngOnInit() {

    this.TtruckDetail  = [
      {
        containerNumber: "ABS23458GWQ554",
        isoCode : '22G1',
        status:'Loaded',
        seal1 : 'J1wer4R3',
        seal2 : 'Aw3434DF3',
        operationType :'Export',
        location:'AD12'
  
      },
      {
        containerNumber: "JGS23458GDR554",
        isoCode : '22G1',
        status:'Loaded',
        seal1 : 'A1wer4R3',
        seal2 : 'Zw3434DF3',
        operationType :'Export',
        location:'AD12'
  
      },
      {
        containerNumber: "HNS23458GDR554",
        isoCode : '22G1',
        status:'Loaded',
        seal1 : 'ZAwer4R3',
        seal2 : 'XD3434DF3',
        operationType :'Import',
        location:'AD12'
  
      },
      {
        containerNumber: "HG34355QW12NE",
        isoCode : '22G1',
        status:'Loaded',
        seal1 : 'DE34F4545',
        seal2 : 'PLO233A2',
        operationType :'Import',
        location:'AD12'
  
      },
    ]
  
  this.ContainerImage = [
    {containerSrc: 'container1.jpg',
    container1: 'ABS23458GWQ554',
  seal1Src:'seal1.jpg',
  seal1:'345612',
  seal2Src:'seal2.jpg',
  seal2:'32323232',
  seal3Src:'seal3.jpg',
  seal3:'234555',
  },
  {containerSrc: 'container2.jpg',
  container2: 'AS34553GHT34',
  seal1Src:'seal1.jpg',
  seal1:'345612',
  seal2Src:'seal2.jpg',
  seal2:'123345',
  seal3Src:'seal3.jpg',
  seal3:'987653',
  },
  
  ]
  this.containerViewImage =[
    {
  src :   'frontview.jpg',
  lable : 'Front'
    },
  
    {
      src :   'backview.jpg',
      lable : 'Back'
        },
        {
          src :   'left.jpg',
          lable : 'Left'
            },
            {
              src :   'right.jpg',
              lable : 'Right'
                },
                {
                  src :   'top.jpg',
                  lable : 'Top'
                    }
  
  ]
  


  }

  get inGateControls() {
    return this.truckTransactionsFormGroup.controls;
  }

  onClickSubmit() {


    //this.ingateservice.truckNumber = this.truckTransactionsFormGroup.controls.truckNumber.value


    this.ingateservice.fetchTableInfo(this.inGateControls.truckNumber.value).subscribe(data => {

      if (data.status === "OK") {

        this.show = true;
        this.truckTransactionList = data.truckTransactionResponseDto;
        this.approveTransactionDto = data.truckTransactionResponseDto.truckTransactionRequestDto
        console.log(data.truckTransactionResponseDto.truckTransactionRequestDto);

      } else {

        alert(data.message)
      }

    });

    this.ingateservice.fetchSurveyImages(this.inGateControls.truckNumber.value).subscribe(data => {

      if (data.status === "OK") {
        this.show = true;
        this.surveyImagesList = data.surveyImagesDtos;
      }

    })

    this.ingateservice.fetchDamageInspectionImages(this.inGateControls.truckNumber.value).subscribe(data => {
      if (data.status === "OK") {

        this.show = true;
        this.damageInspectionImagesList = data.damageInspectionImageDtos;
        this.sharedServiceService.ingateTruckNumber = this.inGateControls.truckNumber.value
      }

    })

  }

  approveTransaction() {
    this.loading = true
    this.ingateservice.sendApproveTransactionDetails(this.approveTransactionDto).subscribe(
      (response) => {
        console.log(this.approveTransactionDto);
        if (response.status == "OK") {
          this.loading = false
          alert("Data has been Approve successfully");
          this.disableBUtton = true;
        }
        else {
          alert("Error while submitting data: " + response.message);
          this.loading = false
        }

      }, error => {
        if (this.approveTransactionDto === undefined) {
          this.loading = false
        }

      });
  }

  onRejectData() {

    this.ingateservice.sendDataOnReject(this.approveTransactionDto).subscribe(response => {

      console.log(this.approveTransactionDto)
      if (response.status == "OK") {
        this.loading = false
        alert("Data has been Rejected ");
      }
      else {
        alert("Error while submitting data: " + response.message);
        this.loading = false
      }
    })
  }
  onPrintData() {

    console.log(" print call")
  }

  onHoldData() {
    this.ingateservice.sendDataOnHold(this.approveTransactionDto).subscribe(response => {
      console.log(this.approveTransactionDto)
      if (response.status == "OK") {
        this.loading = false
        alert("Data is On Hold");
      }
      else {
        alert("Error while submitting data: " + response.message);
        this.loading = false
      }
    })
  }

  redirectToInspectPage() {

    this.sharedServiceService.truckNumberOfDamageImages = this.inGateControls.truckNumber.value
    console.log(this.sharedServiceService.truckNumberOfDamageImages)

  }
  openModal() {
    document.getElementById("myModal").style.display = "block";
  }

  closeModal() {

    document.getElementById("myModal").style.display = "none";

  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {

      this.slideIndex = 1
    }
    if (n < 1) {
      this.slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {

      const slide = slides[i] as HTMLElement;
      slide.style.display = "none";

    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    const slide = slides[this.slideIndex - 1] as HTMLElement;
    slide.style.display = "block";
    dots[this.slideIndex - 1].className += " active";

  }

}
