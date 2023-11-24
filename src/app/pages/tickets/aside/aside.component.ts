import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IMenuType} from "@models/menuType";
import {ITourTypeSelect} from "@models/tours";
import {TicketService} from "@service/tickets/tickets.service";
import {SettingsService} from "@service/settings/settings.service";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()


  menuTypes: IMenuType[];
  selectedMenuType: IMenuType


  constructor(private ticketService: TicketService,
              private  settingService: SettingsService) { }

  changeType(ev: {ev: Event, value: IMenuType}): void {
    console.log('ev', ev)
    this.updateMenuType.emit(ev.value);
  }

  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]


  ngOnInit(): void {

    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ]
  }

  changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
    this.ticketService.updateTour(ev.value)
  }

  selectDate(ev: string) {
    console.log('ev', ev)
    this.ticketService.updateTour({date:ev})
  }

  initRestError(): void {
    this.ticketService.getError().subscribe({
      next:(data) =>{},
      error: (err) =>{
        console.log("err", err)
      },
      complete: () => {}
    });
  }

  initSettingsData(): void{
    this.settingService.loadUserSettingsSubject({
      saveToken:false
    });
  }

}
