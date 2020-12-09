import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageCaptureComponentComponent } from './image-capture-component.component';



const routes: Routes = [
  {
    path: '',
    component:ImageCaptureComponentComponent ,
    data: {
      title: ' Images Capture'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageCaptureRoutingModule { }
