import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { TokenStorage } from './token.storage';
import { AppRoutingModule } from './app-routing.module';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { EnvServiceProvider } from './env.service.provider';
import {ConnectionServiceModule} from 'ng-connection-service';




@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    FullLayoutComponent,
    

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    ConnectionServiceModule
    
  ],
  providers: [TokenStorage, { provide: LocationStrategy, useClass: HashLocationStrategy },EnvServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faExclamationCircle);
  }
}
