import { Injectable } from '@angular/core';
import { TicketRestService} from "@service/tickets-rest/tickets-rest.service";
import {map, Observable, Subject} from 'rxjs';
import {ICustomTicketData, INearestTour, ITour, ITourLocation, ITourTypeSelect} from "@models/tours";
import { ToastModule } from 'primeng/toast';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketSubject = new Subject<ITourTypeSelect>();
  readonly ticketType$ = this.ticketSubject.asObservable();

  constructor(private ticketServiceRest: TicketRestService) {
  }

  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets().pipe(map(
      (value) => {
        const singleTours = value.filter((el) => el.type === "single");
        return value.concat(singleTours);
      }
    ));
  }

  /*  getTicketTypeObservable(): Observable<ITourTypeSelect>{
      return this.ticketSubject.asObservable();
    }*/

  updateTour(type: ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }


  getError(): Observable<any> {
    return this.ticketServiceRest.getRestError()

  }

  getNearestTours(): Observable<INearestTour[]> {
    return this.ticketServiceRest.getNearestTickets();
  }

  getToursLocation(): Observable<ITourLocation[]> {
    return this.ticketServiceRest.getLocationList();

  }

  getRandomNearestEvent(type: number): Observable<INearestTour> {
    return this.ticketServiceRest.getRandomNearestEvent(type);
  }

  transformData(data: INearestTour[], regions: ITourLocation[]): ICustomTicketData[] {
    const newTicketData: ICustomTicketData[] = [];
    data.forEach((el: INearestTour) => {
      const newEl = <ICustomTicketData> {...el};
      newEl.region = <ICustomTicketData>regions.find((region : ITourLocation) => el.locationId === region.id) || {};
      newTicketData.push(newEl);
    });
    return  newTicketData;
  }

  sendTourData(data: any): Observable<any>{
    return this.ticketServiceRest.sendTourData(data);
  }

}
