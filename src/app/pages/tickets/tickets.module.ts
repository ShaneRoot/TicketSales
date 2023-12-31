import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { MenubarModule } from 'primeng/menubar';
import { AsideComponent } from './aside/aside.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { BlocksStyleDirective} from "../../directive/blocks-style.directive";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {TabViewModule} from "primeng/tabview";
import { ReactiveFormsModule } from '@angular/forms';
import {SettingsModule} from "../settings/settings.module";

@NgModule({
  declarations: [
    TicketsComponent,
    HeaderComponent,
    FooterComponent,
    TicketListComponent,
    AsideComponent,
    BlocksStyleDirective,
  ],

  imports: [
    CommonModule,
    TicketsRoutingModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    NgOptimizedImage,
    CalendarModule,
    InputTextModule,
    TabViewModule,
    ReactiveFormsModule,
    SettingsModule,
  ]
})
export class TicketsModule { }
