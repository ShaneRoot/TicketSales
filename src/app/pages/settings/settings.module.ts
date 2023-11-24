import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TabViewModule } from 'primeng/tabview';
import {InputTextModule} from "primeng/inputtext";
import {MessageService} from "primeng/api";
import {ChangePasswordComponent} from "./settings/change-password/change-password.component";
import {SettingsComponent} from "./settings/settings.component";



@NgModule({
  declarations: [ChangePasswordComponent

  ],


  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ChangePasswordComponent
  ],
  providers: [MessageService]
})
export class SettingsModule { }
