import { LoginPageComponent } from "./login/login-page.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { Full_ROUTES } from "./shared/routes/full-layout.routes";

const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'home', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES },
    //, canActivate: [AuthGuard]
    //{ path: '', component: LoginPageComponent },
    // { path: 'login', component: LoginPageComponent }
   
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }