import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { DamageInspectionManagementSystem1Service } from './damage-inspection-management-system1.service';
import { DamageRequest } from 'src/app/request/damage-request';
import { DamageImageRequest } from 'src/app/request/damage-image-request';
import { DamageUiDto } from 'src/app/dto/damagesDto/damage-ui-dto';
import { DamageImageUiDto } from 'src/app/dto/damagesDto/damage-image-ui-dto';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-damage-inspection-management-system1',
  templateUrl: './damage-inspection-management-system1.component.html',
  styleUrls: ['./damage-inspection-management-system1.component.scss']
})
export class DamageInspectionManagementSystem1Component implements OnInit {

 public damageDto:DamageUiDto[];
 public damageImageUiDto:DamageImageUiDto[]
 public damageDtosTop: any = [];
 image1:any=[];
 damageDtosBack: any = [];
 damageImageDtos: any = [];
 
  constructor(private _sanitizer: DomSanitizer,private dimsServices: DamageInspectionManagementSystem1Service, private formBuilder: FormBuilder) {
    let CommentBoxpatternRegx = "^[a-zA-Z ]*$"
    this.damageInspectionFormGroup = this.formBuilder.group({
      checkArrayTop: this.formBuilder.array([]),//new check
      checkArrayBack: this.formBuilder.array([]),//new check
      damageCommentBoxTop: ['', [Validators.required, Validators.pattern(CommentBoxpatternRegx)]],
      damageCheckBoxTop: [''],
      damageCommentBoxBack: ['', [Validators.required, Validators.pattern(CommentBoxpatternRegx)]],
      damageCheckboxBack: [''],
    })
  }
  DamageImageUiDto: Observable<Array<any>>
  ngOnInit() {
    this.dimsServices.getData().subscribe(
      data => {
       // let damageImageData = data["damageImageDtos"];
        this.image1 = data.imageByteArray;
        this.image1 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
                 + data.imageByteArray)
      }
    );

     this.damageDto = new Array();
    this.damageDto.push(new DamageUiDto(1,"Scratch",false));
    this.damageDto.push(new DamageUiDto(2,"Rusted",false));
    this.damageDto.push(new DamageUiDto(3,"Dent",false));
    this.damageDto.push(new DamageUiDto(4,"Broken",false));

    // let topDamageImageUiDto = new DamageImageUiDto("Image1", "TOP");
    // let backDamageImageUiDto = new DamageImageUiDto("Image1", "BACK");
    // this.damageImageUiDto.push(topDamageImageUiDto);
    // this.damageImageUiDto.push(backDamageImageUiDto)


    //  this.dimsServices.fetchInfo().subscribe(data => {
    //    //this.dimsServices.fetchInfo().subscribe((data:any) => {
    //     this.damageDtos = data["damageDtos"];

    //     //this.gateInfoDto=data
    //    console.log(this.damageDtos)
    //   })
    
    // this.dimsServices.getData().subscribe(
    //   data => {
      //   this.damageImageUiDto=data;
      //   let damageImageData = data["damageImageDtos"];
      //    let resource1 = damageImageData[0];
      //   this.damageImageUiDto = data["damageImageDtos"];
      //   this.damageDto=resource1["damageDtos"];
        
      //   let resource2 = damageImageData[1];
      //   this.damageDtosTop = resource1["damageDtos"];
      //   this.damageDtosBack = resource2["damageDtos"];
      //   this.damageImageDtos = data["damageImageDtos"];
      // }
    // );

    //  this.damageDto = new Array();
    // this.damageDto.push(new DamageUiDto(1,"Scratch",false));
    // this.damageDto.push(new DamageUiDto(2,"Rusted",false));
    // this.damageDto.push(new DamageUiDto(3,"Dent",false));
    // this.damageDto.push(new DamageUiDto(4,"Broken",false));    
    console.log(this.damageDto);

  }
  damageInspectionFormGroup: FormGroup;
  get damageInspectionFormControls() { return this.damageInspectionFormGroup.controls; }

  onChange(damage:Boolean,  checkboxDto:DamageUiDto, index:number)//checkboxDto: CheckboxDto
  {
  console.log("******* OnChange event starts********") 

  // console.log(this.damageDto[0].damage);
  // console.log("Event: "+ isSelected);
  // console.log("Checkbox Name: "+ checkboxDto.name);
  // console.log("IsSelected: "+ checkboxDto.isSelected);
  //  checkboxDto.damage = damage;
  // let index = this.checkboxList.findIndex((cbDto)=>{return cbDto.id == checkboxDto.id});
  // this.damageDto[index] = checkboxDto;
  // console.log(this.damageDto);
  console.log("########## OnChange event ends ###########") 
  }

  onClickSubmit() {
    // console.log(this.damageInspectionFormGroup.value);
    let damageImageDtoTop = new DamageImageRequest();
    let damageDtoTop = new DamageRequest();

    damageDtoTop.damage = this.damageInspectionFormControls.damageCheckbox.value;
    damageDtoTop.name = this.damageInspectionFormControls.checkArrayTop.value;
    damageImageDtoTop.comment = this.damageInspectionFormControls.damageComment.value;
    let damageDtosBack = new DamageRequest();
    let damageImageDtoBack = new DamageImageRequest();

    let allFormValue = this.damageInspectionFormGroup.value
    console.log(allFormValue)
    //    let damageImageUiDto=new DamageImageUiDto();
    //   this.dimsServices.sendData1(damageImageDtoTop).subscribe(
    //    (response) => {


    // });

  }
  

  //new change method
  onCheckboxChangeTop(e) {
    const checkArrayTop: FormArray = this.damageInspectionFormGroup.get('checkArrayTop') as FormArray;
    if (e.target.checked) {
      checkArrayTop.push(new FormControl(e.target.value));
      // checkArrayTop.push(new FormControl(this.damageInspectionFormControls.damageCheckbox.value));
      checkArrayTop.push(new FormControl(e.target.checked));


    } else {
      let i: number = 0;
      checkArrayTop.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArrayTop.removeAt(i);

          return;
        }
        i++;
      });
    }

  }
  onCheckboxChangeBack(e) {
    const checkArrayBack: FormArray = this.damageInspectionFormGroup.get('checkArrayBack') as FormArray;
    if (e.target.checked) {
      checkArrayBack.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArrayBack.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArrayBack.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}

