import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthService} from "./services/auth/auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RestInterceptorsService} from "@service/interceptors/restInterceptors";
import {ConfigService} from "@service/config/config.service";
import {TabViewModule} from "primeng/tabview";
import {SettingsComponent} from "./pages/settings/settings/settings.component";

import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {SettingsModule} from "./pages/settings/settings.module";


function initializeApp(config: ConfigService) {
  return () => config.loadPromise().then(() => {
    console.log('---CONFIG LOADED--', ConfigService.config)
  });
}


@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TabViewModule,
    FormsModule,
    TableModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
    SettingsModule,

  ],



  providers: [

    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true
    },

    {provide: HTTP_INTERCEPTORS, useClass: RestInterceptorsService, multi: true}
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
