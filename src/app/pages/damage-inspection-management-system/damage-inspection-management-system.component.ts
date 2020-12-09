import { Component, OnInit } from '@angular/core';
import { DamageInspectionManagementSystemService } from './damage-inspection-management-system.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DamageUiDto } from 'src/app/dto/damagesDto/damage-ui-dto';
import { DamageImageUiDto } from 'src/app/dto/damagesDto/damage-image-ui-dto';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-damage-inspection-management-system',
  templateUrl: './damage-inspection-management-system.component.html',
  styleUrls: ['./damage-inspection-management-system.component.scss']
})
export class DamageInspectionManagementSystemComponent implements OnInit {

  public damageImageObjectList: DamageImageUiDto[] = [];
  comments: Comment[];
  damageInspectionFormGroup: FormGroup;

  constructor(private damageInspectionManagementSystemService: DamageInspectionManagementSystemService, private formBuilder: FormBuilder, private sharedServiceService: SharedServiceService, private routes: Router) {

    this.damageInspectionFormGroup = this.formBuilder.group
      ({
        damageCommentBox: ['', [Validators.required]],
      })

  }

  get damageInspectionFormControls() {
    return this.damageInspectionFormGroup.controls;
  }

  ngOnInit() {

    this.damageInspectionManagementSystemService.fetchDamageInspectionImagesData(this.sharedServiceService.truckNumberOfDamageImages).subscribe(data => {

      this.damageImageObjectList = data.damageImageDtos;
      console.log(this.damageImageObjectList);

    });

  }

  ngAfterViewChecked() {

    $('img').on('click', function() {
      var image = $(this).attr('src');
      //alert(image);
      $('#myModal').on('show.bs.modal', function() {
        $(".showimage").attr("src", image);
      });
    });
  }

  onClickSubmit() {

    this.damageInspectionManagementSystemService.toSendDamageImagesDetails(this.damageImageObjectList).subscribe(
      (response) => {
        console.log(JSON.stringify(this.damageImageObjectList));
        if (response.status == "OK") {
          alert(response.message);
          this.routes.navigate(["/home/in-gate"]);
         
        }
        else {
          alert("Error while submitting data: " + response.message);
        }

      }, error => {
        alert("Error while submitting data: ");
      });
  }

  onChange(isSelected: boolean, checkboxDto: DamageUiDto, mainIndex: number, checkBoxIndex: number) {

    checkboxDto.damage = isSelected;
    this.damageImageObjectList[mainIndex].damageDtos[checkBoxIndex] = checkboxDto;
    console.log(this.damageImageObjectList[mainIndex].damageDtos[checkBoxIndex]);
    console.log(JSON.stringify (this.damageImageObjectList));

    console.log("########## OnChange event ends ###########")
  }

  commentBoxChange(commentBoxValue: string, damageImageDto: DamageImageUiDto, mainIndex: number) {
    damageImageDto.comment = commentBoxValue;
    this.damageImageObjectList[mainIndex] = damageImageDto;
    console.log(this.damageImageObjectList[mainIndex]);
  }

}







