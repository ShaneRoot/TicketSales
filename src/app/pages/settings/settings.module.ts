import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TabViewModule } from 'primeng/tabview';
import {InputTextModule} from "primeng/inputtext";
import {MessageService} from "primeng/api";
import {ChangePasswordComponent} from "./settings/change-password/change-password.component";
import {SettingsComponent} from "./settings/settings.component";
import { StatisticComponent } from './statistic/statistic.component';
import {TableModule} from "primeng/table";



@NgModule({
  declarations: [ChangePasswordComponent, StatisticComponent

  ],


  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule
  ],
  exports: [
    ChangePasswordComponent,
    StatisticComponent
  ],
  providers: [MessageService]
})
export class SettingsModule { }
