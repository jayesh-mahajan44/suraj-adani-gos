import { Routes, RouterModule } from "@angular/router";
import { ImageCapturingScreenComponent } from "./image-capturing-screen.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
      path: '',
      component: ImageCapturingScreenComponent,
      data: {
        title: 'Capture Images'
      },
    },
    // {
    //   path: 'capture',
    //   component: ImageCapturingScreenComponent,
    //   data: {
    //     title: 'Image Capturing Screen'
    //   },
    // }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ImageCapturingScreenRoutingModule {
  }