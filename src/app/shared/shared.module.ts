import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UtilityService } from './utility/utility.service';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
// import { UtilityService } from './utility/utility.service';



@NgModule({
    exports: [
        CommonModule,
         FooterComponent,
         NavbarComponent,
         SidebarComponent,
        // ToggleFullscreenDirective,
        // NgbModule
    ],
    imports: [
        RouterModule,
        CommonModule,
        // NgbModule
    ],
    declarations: [
         FooterComponent,
         NavbarComponent,
        SidebarComponent,
        // ToggleFullscreenDirective
    ],
    providers:[UtilityService]
})
export class SharedModule { }
