import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserManagementPageRoutingModule } from "./user-management-page-routing.module";

import { UserManagementPageComponent } from './user-management-page.component';
import { UserMasterService } from './user-master.service';

@NgModule({
    imports: [
        CommonModule,
        UserManagementPageRoutingModule,
        FormsModule,
        NgxSpinnerModule
    ],
    declarations: [       
        UserManagementPageComponent
    ],
    providers:[UserMasterService]
})
export class UserManagementPageModule { }
