// import { Component, OnInit } from '@angular/core';
// import { CheckboxDto } from './dto/checkbox-dto';

// @Component({
//   selector: 'app-multiple-checkbox-test',
//   templateUrl: './multiple-checkbox-test.component.html',
 
// })
// export class MultipleCheckboxTestComponent implements OnInit {

//   constructor() { }

//   public checkboxList:CheckboxDto[];

//   ngOnInit() {
    
//     this.checkboxList = new Array();
//     this.checkboxList.push(new CheckboxDto(1,"Scratch",false));
//     this.checkboxList.push(new CheckboxDto(2,"Rusted",false));
//     this.checkboxList.push(new CheckboxDto(3,"Dent",false));
//     this.checkboxList.push(new CheckboxDto(4,"Broken",false));    
//     console.log(this.checkboxList);
//   }
//   onChange(isSelected:Boolean, checkboxDto: CheckboxDto, index:number)
//   {
//   console.log("******* OnChange event starts********") 
//   console.log(this.checkboxList[0].isSelected);
//   // console.log("Event: "+ isSelected);
//   // console.log("Checkbox Name: "+ checkboxDto.name);
//   // console.log("IsSelected: "+ checkboxDto.isSelected);
//   checkboxDto.isSelected = isSelected;
//   // let index = this.checkboxList.findIndex((cbDto)=>{return cbDto.id == checkboxDto.id});
//   this.checkboxList[index] = checkboxDto;
//   console.log(this.checkboxList);
//   console.log("########## OnChange event ends ###########") 
//   }
// }
